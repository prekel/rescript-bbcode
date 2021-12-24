type tag =
  { name : string
  ; value : string option
  ; attrib : (string * string) list
  }

type ast_item =
  | Text of string
  | Bold of { children : ast }
  | Italic of { children : ast }
  | Underline of { children : ast }
  | Strikethrough of { children : ast }
  | FontSize of
      { children : ast
      ; size : int
      }
  | FontColor of
      { children : ast
      ; color : string
      }
  | CenterText of { children : ast }
  | LeftAlignText of { children : ast }
  | RightAlignText of { children : ast }
  | Quote of { children : ast }
  | QuoteNamed of
      { children : ast
      ; quote : string
      }
  | Spoiler of { children : ast }
  | SpoilerNamed of
      { children : ast
      ; spoiler : string
      }
  | Link of { url : string }
  | LinkNamed of
      { children : ast
      ; url : string
      }
  | Image of { url : string }
  | ImageResized of
      { width : int
      ; height : int
      ; url : string
      }
  | List of
      { items : list_item array
      ; variant : [ `Unordered | `Ordered | `Another ]
      }
  | Code of { children : ast }
  | CodeLanguageSpecific of
      { children : ast
      ; language : string
      }
  | Preformatted of { children : ast }
  | Table of { rows : table_row array }
  | Other of
      { children : ast
      ; tag : tag
      }
  | YouTube of { id : string }
[@@genType]

and ast = ast_item list [@@genType]

and list_item = ListItem of { children : ast } [@@genType]

and table_row = TableRow of { cells : table_cell array } [@@genType]

and table_cell =
  | TableCell of
      { children : ast
      ; variant : [ `Heading | `Content ]
      }
[@@genType]

let ast_to_array (a : ast) : ast_item array = Array.of_list a [@@genType]

module Parse = struct
  open Opal

  let rsb = exactly ']'
  let lsb = exactly '['
  let eql = exactly '='
  let slash = exactly '/'
  let attr_value = many1 (none_of [ ' '; '\t'; '\r'; '\n'; ']'; '[' ]) => implode

  let attrib =
    many1 (letter <|> digit)
    => implode
    >>= fun attr_name ->
    eql >> attr_value >>= fun attr_value -> return (attr_name, attr_value)
  ;;

  let attributes = spaces >> many (attrib << spaces)

  let tag =
    lsb
    >> many letter
    => implode
    >>= (fun name ->
          eql
          >> attr_value
          => (fun it -> Some it)
          <|> return None
          >>= (fun value -> attributes => fun attrib -> value, attrib)
          >>= fun (value, attrib) -> return (name, value, attrib))
    << rsb
    => fun (name, value, attrib) -> { name; value; attrib }
  ;;

  let bbcodetag = lsb >> many letter => implode << rsb
  let closedtag = lsb >> slash >> many letter => implode << rsb

  let item_from_tag children tag =
    match { tag with name = Js.String.toLowerCase tag.name } with
    | { name = "b"; value = None; attrib = [] } -> Bold { children }
    | { name = "i"; value = None; attrib = [] } -> Italic { children }
    | { name = "u"; value = None; attrib = [] } -> Underline { children }
    | { name = "s"; value = None; attrib = [] } -> Strikethrough { children }
    | { name = "size"; value = Some number; attrib = [] }
    | { name = "style"; value = None; attrib = [ ("size", number) ] } ->
      FontSize { children; size = int_of_string number }
    | { name = "color"; value = Some color; attrib = [] }
    | { name = "style"; value = None; attrib = [ ("color", color) ] } ->
      FontColor { children; color }
    | { name = "url"; value = Some url; attrib = [] } -> LinkNamed { children; url }
    | tag -> Other { children; tag }
  ;;

  let rec pqwf ?(inq = None) stck : (char, ast_item list) parser =
    tag
    >>= (fun tg -> pqwf (tg :: stck) >>= fun it -> return (tg, it))
    >>= (fun (tg, ai) -> closedtag >>= fun ctg -> return (tg, ctg, ai))
    >>= (fun (tg, ctg, ai) ->
          if tg.name = ctg then return [ item_from_tag ai tg ] else mzero)
    <|>
    match inq with
    | None ->
      many letter
      => implode
      => (fun it -> Text it)
      >>= (fun it -> pqwf ~inq:(Some it) stck >>= fun it2 -> return (it, it2))
      >>= fun (it, ot) -> return (it :: ot)
    | Some _ -> return []
  ;;

  let run str parser = str |> Opal.LazyStream.of_string |> Opal.parse parser
end
