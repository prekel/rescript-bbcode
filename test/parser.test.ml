open Zora
open BBCode

let () =
  zoraBlock "Parse 1" (fun t ->
      let a = Parse.run "[tag]ars[b]art[/b][/tag]" (Parse.pqwf []) in
      let e =
        [ Other
            { children = [ Text "ars"; Bold { children = [ Text "art" ] } ]
            ; tag = { name = "tag"; value = None; attrib = [||] }
            }
        ]
      in
      t |. equal a (Some e) "pqwf")
;;

let () =
  zoraBlock "Parse tag [tag=val]" (fun t ->
      let a = Parse.run "[tag=val]" Parse.tag in
      let e = { name = "tag"; value = Some "val"; attrib = [||] } in
      t |. equal a (Some e) "tag")
;;

let () =
  zoraBlock "Parse tag [tag]" (fun t ->
      let a = Parse.run "[tag]" Parse.tag in
      let e = { name = "tag"; value = None; attrib = [||] } in
      t |. equal a (Some e) "tag")
;;

let () =
  zoraBlock "Parse tag [tag=val attr=attrval1 attr2=attrval2]" (fun t ->
      let a = Parse.run "[tag=val attr=attrval1 attr2=attrval2]" Parse.tag in
      let e =
        { name = "tag"
        ; value = Some "val"
        ; attrib = [| "attr", "attrval1"; "attr2", "attrval2" |]
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

let () =
  zoraBlock "Parse big " (fun t ->
      let a =
        parse
          {|In near future science becomes dominant eroding ethic and moral values. Main character is a scientist conducting cloning experiments for an illegal company. Women from "Valkure" government special affairs agency storm this facility to put an end to this organization, but fall prey to set traps just as previous invaders. With such excellent new "material" experiments get much bolder.

[From [url=https://vndbreview.blogspot.com/2020/08/vn-of-month-july-2008-kara-no-shoujo.html]vndbreview[/url]]|}
      in
      ())
;;

let () =
  zoraBlock "Parse big " (fun t ->
      let a =
        parse
          {|In near future science becomes dominant eroding ethic and moral values. Main character is a scientist conducting cloning experiments for an illegal company. Women from "Valkure" government special affairs agency storm this facility to put an end to this organization, but fall prey to set traps just as previous invaders. With such excellent new "material" experiments get much bolder.

From [url=https://vndbreview.blogspot.com/2020/08/vn-of-month-july-2008-kara-no-shoujo.html]vndbreview[/url]|}
      in
      ())
;;

let () =
  zoraBlock "Parse [From .." (fun t ->
      let a =
        Parse.run
          {|RStarst [Frsato [url=https://example.com/]urlcontent[/url]]|}
          (Parse.ast_parer ())
      in
      Js.Console.log (Js.Json.stringifyAny a);
      t |. equal None a "")
;;

let () =
  zoraBlock "Fix ast" (fun t ->
      let s = [ Text "["; Text "qwf" ] in
      let a = Parse.fix_ast s in
      let e = [ Text "[qwf" ] in
      t |. equal a e "")
;;
