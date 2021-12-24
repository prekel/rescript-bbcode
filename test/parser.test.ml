open Zora
open Bbcode

let () =
  zoraBlock "par1" (fun t ->
      let a = Parse.run "[tag]ars[b]art[/b][/tag]" (Parse.pqwf []) in
      Js.Console.log (Js.Json.stringifyAny a);
      let e = [ Bold [ Text "ars"; Bold [ Text "art" ] ] ] in
      t |. equal a (Some e) "qwf")
;;
