open Zora
open Bbcode

let () =
  zoraBlock "Parse 1" (fun t ->
      let a = Parse.run "[tag]ars[b]art[/b][/tag]" (Parse.pqwf []) in
      let e =
        [ Other
            { children = [ Text "ars"; Bold { children = [ Text "art" ] } ]
            ; tag = Parse.{ name = "tag"; value = None; attrib = [] }
            }
        ]
      in
      t |. equal a (Some e) "pqwf")
;;

let () =
  zoraBlock "Parse tag [tag=val]" (fun t ->
      let a = Parse.run "[tag=val]" Parse.tag in
      let e = Parse.{ name = "tag"; value = Some "val"; attrib = [] } in
      t |. equal a (Some e) "tag")
;;

let () =
  zoraBlock "Parse tag [tag]" (fun t ->
      let a = Parse.run "[tag]" Parse.tag in
      let e = Parse.{ name = "tag"; value = None; attrib = [] } in
      t |. equal a (Some e) "tag")
;;

let () =
  zoraBlock "Parse tag [tag=val attr=attrval1 attr2=attrval2]" (fun t ->
      let a = Parse.run "[tag=val attr=attrval1 attr2=attrval2]" Parse.tag in
      let e =
        Parse.
          { name = "tag"
          ; value = Some "val"
          ; attrib = [ "attr", "attrval1"; "attr2", "attrval2" ]
          }
      in
      t |. equal a (Some e) "tag")
;;

let () =
  zoraBlock "Parse tag subparsers" (fun t ->
      let a = Parse.run "tag" Parse.attr_value in
      let e = "tag" in
      t |. equal a (Some e) "attr_value";
      let a = Parse.run "tag=tag1" Parse.attrib in
      let e = "tag", "tag1" in
      t |. equal a (Some e) "attrib";
      let a = Parse.run "tag=tag1 tag1=tag2" Parse.attributes in
      let e = [ "tag", "tag1"; "tag1", "tag2" ] in
      t |. equal a (Some e) "attrib")
;;
