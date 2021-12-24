// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Zora from "zora";
import * as BBCode from "../src/BBCode.mjs";

Zora.test("Parse 1", (function (t) {
        var a = BBCode.Parse.run("[tag]ars[b]art[/b][/tag]", BBCode.Parse.pqwf(undefined, /* [] */0));
        t.equal(a, {
              hd: {
                TAG: /* Other */23,
                children: {
                  hd: {
                    TAG: /* Text */0,
                    _0: "ars"
                  },
                  tl: {
                    hd: {
                      TAG: /* Bold */1,
                      children: {
                        hd: {
                          TAG: /* Text */0,
                          _0: "art"
                        },
                        tl: /* [] */0
                      }
                    },
                    tl: /* [] */0
                  }
                },
                tag: {
                  name: "tag",
                  value: undefined,
                  attrib: /* [] */0
                }
              },
              tl: /* [] */0
            }, "pqwf");
        
      }));

Zora.test("Parse tag [tag=val]", (function (t) {
        var a = BBCode.Parse.run("[tag=val]", BBCode.Parse.tag);
        t.equal(a, {
              name: "tag",
              value: "val",
              attrib: /* [] */0
            }, "tag");
        
      }));

Zora.test("Parse tag [tag]", (function (t) {
        var a = BBCode.Parse.run("[tag]", BBCode.Parse.tag);
        t.equal(a, {
              name: "tag",
              value: undefined,
              attrib: /* [] */0
            }, "tag");
        
      }));

Zora.test("Parse tag [tag=val attr=attrval1 attr2=attrval2]", (function (t) {
        var a = BBCode.Parse.run("[tag=val attr=attrval1 attr2=attrval2]", BBCode.Parse.tag);
        t.equal(a, {
              name: "tag",
              value: "val",
              attrib: {
                hd: [
                  "attr",
                  "attrval1"
                ],
                tl: {
                  hd: [
                    "attr2",
                    "attrval2"
                  ],
                  tl: /* [] */0
                }
              }
            }, "tag");
        
      }));

Zora.test("Parse tag subparsers", (function (t) {
        var a = BBCode.Parse.run("tag", BBCode.Parse.attr_value);
        t.equal(a, "tag", "attr_value");
        var a$1 = BBCode.Parse.run("tag=tag1", BBCode.Parse.attrib);
        t.equal(a$1, [
              "tag",
              "tag1"
            ], "attrib");
        var a$2 = BBCode.Parse.run("tag=tag1 tag1=tag2", BBCode.Parse.attributes);
        t.equal(a$2, {
              hd: [
                "tag",
                "tag1"
              ],
              tl: {
                hd: [
                  "tag1",
                  "tag2"
                ],
                tl: /* [] */0
              }
            }, "attrib");
        
      }));

export {
  
}
/*  Not a pure module */
