type ast_item =
  | Text of string
  | Bold of ast_item list
  | LinkNamed of string * ast_item list

module Parse = struct
  open Opal

  type tag =
    { name : string
    ; value : string option
    ; attrib : (string * string) list
    }

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

  let rec pqwf ?(inq = None) stck : (char, ast_item list) parser =
    bbcodetag
    >>= (fun tg -> pqwf (tg :: stck) >>= fun it -> return (tg, it))
    >>= (fun (tg, ai) -> closedtag >>= fun ctg -> return (tg, ctg, ai))
    >>= (fun (tg, ctg, ai) -> if tg = ctg then return [ Bold ai ] else mzero)
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
