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
  | CenterAlign of { children : ast }
  | LeftAlign of { children : ast }
  | RightAlign of { children : ast }
  | Quote of { children : ast }
  | QuoteNamed of
      { children : ast
      ; quote : string
      }
  | Spoiler of { children : ast }
  | SpoilerNamed of
      { children : ast
      ; name : string
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

let ast_to_array (a : ast) : ast_item array = Belt.List.toArray a [@@genType]

let item_from_tag children tag =
  match { tag with name = Js.String.toLowerCase tag.name } with
  | { name = "b"; value = None; attrib = [||] } -> Bold { children }
  | { name = "i"; value = None; attrib = [||] } -> Italic { children }
  | { name = "u"; value = None; attrib = [||] } -> Underline { children }
  | { name = "s"; value = None; attrib = [||] } -> Strikethrough { children }
  | { name = "size"; value = Some number; attrib = [||] }
  | { name = "style"; value = None; attrib = [| ("size", number) |] } ->
    FontSize { children; size = number |. Belt.Int.fromString |. Belt.Option.getExn }
  | { name = "color"; value = Some color; attrib = [||] }
  | { name = "style"; value = None; attrib = [| ("color", color) |] } ->
    FontColor { children; color }
  | { name = "center"; value = None; attrib = [||] } -> CenterAlign { children }
  | { name = "left"; value = None; attrib = [||] } -> LeftAlign { children }
  | { name = "right"; value = None; attrib = [||] } -> RightAlign { children }
  | { name = "quote"; value = None; attrib = [||] } -> Quote { children }
  | { name = "quote"; value = Some name; attrib = [||] } ->
    QuoteNamed { children; quote = name }
  | { name = "spoiler"; value = None; attrib = [||] } -> Spoiler { children }
  | { name = "spoiler"; value = Some name; attrib = [||] } ->
    SpoilerNamed { children; name }
  | { name = "url"; value = None; attrib = [||] } ->
    (match children with
    | [ Text url ] -> Link { url }
    | _ -> failwith "Text must be inside url")
  | { name = "url"; value = Some url; attrib = [||] } -> LinkNamed { children; url }
  | { name = "img"; value = None; attrib = [||] } ->
    (match children with
    | [ Text url ] -> Image { url }
    | _ -> failwith "Text must be inside img")
  | { name = "img"; value = None; attrib = [| ("width", width); ("height", height) |] } ->
    (match children with
    | [ Text url ] ->
      ImageResized
        { width = width |. Belt.Int.fromString |. Belt.Option.getExn
        ; height = height |. Belt.Int.fromString |. Belt.Option.getExn
        ; url
        }
    | _ -> failwith "Text must be inside img")
  | { name = "ul"; value = None; attrib = [||] }
  | { name = "ol"; value = None; attrib = [||] }
  | { name = "list"; value = None; attrib = [||] } ->
    List
      { items =
          children
          |. Belt.List.map (fun li ->
                 match li with
                 | Other { children; tag = { name = "li"; value = None; attrib = [||] } }
                   -> ListItem { children }
                 | _ -> failwith "List item must be inside list")
          |> Belt.List.toArray
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
          |. Belt.List.map (function
                 | Other { children; tag = { name = "tr"; value = None; attrib = [||] } }
                   ->
                   TableRow
                     { cells =
                         children
                         |. Belt.List.map (function
                                | Other
                                    { children
                                    ; tag = { name = "th"; value = None; attrib = [||] }
                                    } -> TableCell { children; variant = `Heading }
                                | Other
                                    { children
                                    ; tag = { name = "td"; value = None; attrib = [||] }
                                    } -> TableCell { children; variant = `Content }
                                | _ -> failwith "Table cell must be inside row")
                         |> Belt.List.toArray
                     }
                 | _ -> failwith "Table row must be inside table")
          |> Belt.List.toArray
      }
  | tag -> Other { children; tag }
;;

let rec traverse f ast =
  let fix_ast a = a |> f |> traverse f in
  Belt.List.map (f ast) (function
      | Text txt -> Text txt
      | Bold { children } -> Bold { children = fix_ast children }
      | Italic { children } -> Italic { children = fix_ast children }
      | Underline { children } -> Underline { children = fix_ast children }
      | Strikethrough { children } -> Strikethrough { children = fix_ast children }
      | FontSize { children; size } -> FontSize { children = fix_ast children; size }
      | FontColor { children; color } -> FontColor { children = fix_ast children; color }
      | CenterAlign { children } -> CenterAlign { children = fix_ast children }
      | LeftAlign { children } -> LeftAlign { children = fix_ast children }
      | RightAlign { children } -> RightAlign { children = fix_ast children }
      | Quote { children } -> Quote { children = fix_ast children }
      | QuoteNamed { children; quote } ->
        QuoteNamed { children = fix_ast children; quote }
      | Spoiler { children } -> Spoiler { children = fix_ast children }
      | SpoilerNamed { children; name } ->
        SpoilerNamed { children = fix_ast children; name }
      | Link { url } -> Link { url }
      | LinkNamed { children; url } -> LinkNamed { children = fix_ast children; url }
      | Image { url } -> Image { url }
      | ImageResized { width; height; url } -> ImageResized { width; height; url }
      | List { items; variant } ->
        List
          { items =
              items
              |. Belt.Array.map (fun (ListItem { children }) ->
                     ListItem { children = fix_ast children })
          ; variant
          }
      | Code { children } -> Code { children = fix_ast children }
      | CodeLanguageSpecific { children; language } ->
        CodeLanguageSpecific { children = fix_ast children; language }
      | Preformatted { children } -> Preformatted { children = fix_ast children }
      | Table { rows } ->
        let rows =
          rows
          |. Belt.Array.map (fun (TableRow { cells }) ->
                 TableRow
                   { cells =
                       cells
                       |. Belt.Array.map (fun (TableCell { children; variant }) ->
                              TableCell { children = fix_ast children; variant })
                   })
        in
        Table { rows }
      | Other { children; tag = { name; value; attrib } } ->
        Other { children = fix_ast children; tag = { name; value; attrib } }
      | YouTube { id } -> YouTube { id })
;;

let fix_ast ast =
  Belt.List.reduce ast [] (fun state el ->
      match state, el with
      | Text t1 :: o, Text t2 -> Text (t1 ^ t2) :: o
      | o, Text t2 -> Text t2 :: o
      | _ -> el :: state)
  |> Belt.List.reverse
;;

module Parse = struct
  open Opal

  let rec many' c x =
    match c with
    | -1 -> mzero
    | _ -> option [] (x >>= fun r -> many' (c - 1) x >>= fun rs -> return (r :: rs))
  ;;

  let many1' c x = x <~> many' (c - 1) x
  let rsb = exactly ']'
  let lsb = exactly '['
  let eql = exactly '='
  let slash = exactly '/'
  let attr_value = many1' 200 (none_of [ ' '; '\t'; '\r'; '\n'; ']'; '[' ]) => implode

  let attrib =
    many1' 50 (letter <|> digit)
    => implode
    >>= fun attr_name ->
    eql >> attr_value >>= fun attr_value -> return (attr_name, attr_value)
  ;;

  let attributes = spaces >> many' 10 (attrib << spaces)

  let tag =
    lsb
    >> many1' 50 letter
    => implode
    >>= (fun name ->
          eql
          >> attr_value
          => (fun it -> Some it)
          <|> return None
          >>= (fun value -> attributes => fun attrib -> value, attrib)
          >>= fun (value, attrib) -> return (name, value, attrib |> Belt.List.toArray))
    << rsb
    => fun (name, value, attrib) -> { name; value; attrib }
  ;;

  let closedtag = lsb >> (slash >> (many1 letter => implode)) << rsb
  let text_parser = many1' 10 (none_of [ '[' ]) => implode => fun it -> Text it
  let lsb_text = lsb => (fun _ -> "[") => fun it -> Text it

  let rec bbcode_parser () =
    tag
    >>= (fun tg -> ast_parser true >>= fun it -> return (tg, it))
    >>= (fun (tg, ai) -> closedtag >>= fun ctg -> return (tg, ctg, ai))
    >>= fun (tg, ctg, ai) -> if tg.name = ctg then return (item_from_tag ai tg) else mzero

  and ast_parser is_open =
    many
      (text_parser
      <|> bbcode_parser ()
      <|> if is_open then closedtag >>= fun _ -> mzero else lsb_text)
  ;;

  let run str parser = str |> Opal.LazyStream.of_string |> Opal.parse parser
end

let parse text : ast option =
  Parse.run text (Parse.ast_parser false) |. Belt.Option.map (traverse fix_ast)
  [@@genType]
;;
