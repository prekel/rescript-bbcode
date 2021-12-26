type tag =
  { name : string
  ; value : string option
  ; attrib : (string * string) array
  }
[@@genType]

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
    >> many1 letter
    => implode
    >>= (fun name ->
          eql
          >> attr_value
          => (fun it -> Some it)
          <|> return None
          >>= (fun value -> attributes => fun attrib -> value, attrib)
          >>= fun (value, attrib) -> return (name, value, attrib |> Array.of_list))
    << rsb
    => fun (name, value, attrib) -> { name; value; attrib }
  ;;

  let bbcodetag = lsb >> many1 letter => implode << rsb
  let closedtag = lsb >> (slash >> (many1 letter => implode)) << rsb

  let item_from_tag children tag =
    match { tag with name = Js.String.toLowerCase tag.name } with
    | { name = "b"; value = None; attrib = [||] } -> Bold { children }
    | { name = "i"; value = None; attrib = [||] } -> Italic { children }
    | { name = "u"; value = None; attrib = [||] } -> Underline { children }
    | { name = "s"; value = None; attrib = [||] } -> Strikethrough { children }
    | { name = "size"; value = Some number; attrib = [||] }
    | { name = "style"; value = None; attrib = [| ("size", number) |] } ->
      FontSize { children; size = int_of_string number }
    | { name = "color"; value = Some color; attrib = [||] }
    | { name = "style"; value = None; attrib = [| ("color", color) |] } ->
      FontColor { children; color }
    | { name = "center"; value = None; attrib = [||] } -> CenterText { children }
    | { name = "left"; value = None; attrib = [||] } -> LeftAlignText { children }
    | { name = "right"; value = None; attrib = [||] } -> RightAlignText { children }
    | { name = "quote"; value = None; attrib = [||] } -> Quote { children }
    | { name = "quote"; value = Some name; attrib = [||] } ->
      QuoteNamed { children; quote = name }
    | { name = "spoiler"; value = None; attrib = [||] } -> Spoiler { children }
    | { name = "spoiler"; value = Some name; attrib = [||] } ->
      SpoilerNamed { children; spoiler = name }
    | { name = "url"; value = None; attrib = [||] } ->
      (match children with
      | [ Text url ] -> Link { url }
      | _ -> failwith "Text must be inside url")
    | { name = "url"; value = Some url; attrib = [||] } -> LinkNamed { children; url }
    | { name = "img"; value = None; attrib = [||] } ->
      (match children with
      | [ Text url ] -> Image { url }
      | _ -> failwith "Text must be inside img")
    | { name = "img"; value = None; attrib = [| ("width", width); ("height", height) |] }
      ->
      (match children with
      | [ Text url ] ->
        ImageResized { width = int_of_string width; height = int_of_string height; url }
      | _ -> failwith "Text must be inside img")
    | { name = "ul"; value = None; attrib = [||] }
    | { name = "ol"; value = None; attrib = [||] }
    | { name = "list"; value = None; attrib = [||] } ->
      List
        { items =
            children
            |> List.map (fun li ->
                   match li with
                   | Other
                       { children; tag = { name = "li"; value = None; attrib = [||] } } ->
                     ListItem { children }
                   | _ -> failwith "List item must be inside list")
            |> Array.of_list
        ; variant =
            (match tag.name with
            | "ul" -> `Unordered
            | "ol" -> `Ordered
            | "list" | _ -> `Another)
        }
    | { name = "code"; value = None; attrib = [||] } -> Code { children }
    | { name = "code"; value = Some language; attrib = [||] } ->
      CodeLanguageSpecific { children; language }
    | { name = "pre"; value = None; attrib = [||] } -> Preformatted { children }
    | { name = "table"; value = None; attrib = [||] } ->
      Table
        { rows =
            children
            |> List.map (function
                   | Other
                       { children; tag = { name = "tr"; value = None; attrib = [||] } } ->
                     TableRow
                       { cells =
                           children
                           |> List.map (function
                                  | Other
                                      { children
                                      ; tag = { name = "th"; value = None; attrib = [||] }
                                      } -> TableCell { children; variant = `Heading }
                                  | Other
                                      { children
                                      ; tag = { name = "td"; value = None; attrib = [||] }
                                      } -> TableCell { children; variant = `Content }
                                  | _ -> failwith "Table cell must be inside row")
                           |> Array.of_list
                       }
                   | _ -> failwith "Table row must be inside table")
            |> Array.of_list
        }
    | tag -> Other { children; tag }
  ;;

  let parse_bbcode loop stck =
    tag
    >>= (fun tg -> loop (tg :: stck) >>= fun it -> return (tg, it))
    >>= (fun (tg, ai) -> closedtag >>= fun ctg -> return (tg, ctg, ai))
    >>= fun (tg, ctg, ai) ->
    if tg.name = ctg then return [ item_from_tag ai tg ] else mzero
  ;;

  let bbcode_parser loop =
    tag
    >>= (fun tg -> loop true >>= fun it -> return (tg, it))
    >>= (fun (tg, ai) -> closedtag >>= fun ctg -> return (tg, ctg, ai))
    >>= fun (tg, ctg, ai) ->
    if tg.name = ctg then return (item_from_tag ai tg) else return (Text "WWW")
  ;;

  let text_parser = many1 (none_of [ '[' ]) => implode => fun it -> Text it
  let lsb_text = lsb => (fun _ -> "[") => fun it -> Text it

  let rec ast_parer is_open =
    many
      (text_parser
      <|> bbcode_parser ast_parer
      <|> if is_open then closedtag >>= (fun _ -> mzero) <|> lsb_text else lsb_text)
  ;;

  let bbcodeparsermock = bbcode_parser (fun _ -> many letter >> return [ Text "QQQ" ])
  let parseone = text_parser <|> bbcodeparsermock <|> lsb_text

  let fix_ast ast =
    List.fold_left
      (fun state el ->
        match state, el with
        | Text t1 :: o, Text t2 -> Text (t1 ^ t2) :: o
        | _ -> el :: state)
      []
      ast
    |> List.rev
  ;;

  let rec pqwf ?(inq = None) stck : (char, ast_item list) parser =
    parse_bbcode pqwf stck
    <|> (match inq with
        | None ->
          many1 (none_of [ '[' ])
          => implode
          => (fun it -> Text it)
          >>= (fun it -> pqwf ~inq:(Some it) stck >>= fun it2 -> return (it, it2))
          >>= fun (it, ot) -> return (it :: ot)
        | Some _ -> return [])
    <|> (lsb
        => (fun _ -> "[")
        => (fun it -> Text it)
        >>= (fun it -> pqwf ~inq:(Some it) stck >>= fun it2 -> return (it, it2))
        >>= fun (it, ot) -> return (it :: ot))
  ;;

  let run str parser = str |> Opal.LazyStream.of_string |> Opal.parse parser

  let run1 str parser =
    str |> Opal.LazyStream.of_string |> Opal.parse parser |. Belt.Option.map fix_ast
  ;;
end

let parse a = Parse.run a (Parse.pqwf []) [@@genType]
