type ast_item =
  | Text of string
  | Bold of ast_item list
  | LinkNamed of string * ast_item list

module Parse = struct
  open Opal

  let rsb = exactly ']'
  let lsb = exactly '['
  let eql = exactly '='
  let slash = exactly '/'
  let bbcodetag = lsb >> many letter => implode << rsb
  let closedtag = lsb >> slash >> many letter => implode << rsb

  let rec pqwf ?(inq = None) stck : (char, ast_item list) parser =
    Js.Console.log (stck |> Array.of_list);
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
    | Some _ -> return [ ]
  ;;

  let run str parser = str |> Opal.LazyStream.of_string |> Opal.parse parser
end
