type tag =
  { name : string
  ; value : string option
  ; attrib : (string * string) list
  }

type ast_item =
  | Text of string
  | Bold of ast
  | LinkNamed of string * ast
  | Other of tag * ast

and ast = ast_item list

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

  let item_from_tag children = function
    | { name = "b"; value = None; attrib = [] } -> Bold children
    | { name = "url"; value = Some url; attrib = [] } -> LinkNamed (url, children)
    | tag -> Other (tag, children)
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
