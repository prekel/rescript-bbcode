// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Belt_List from "rescript/lib/es6/belt_List.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";

function a(param) {
  console.log("hello");
  
}

console.log("hello");

function lexing(s) {
  return Belt_Array.reduce(Array.from(s), /* LNil */0, (function (st, el) {
                switch (el) {
                  case "[" :
                      return {
                              TAG: /* LLeftBracket */1,
                              prev: st
                            };
                  case "]" :
                      return {
                              TAG: /* LRightBracket */2,
                              prev: st
                            };
                  default:
                    if (typeof st === "number" || st.TAG !== /* LText */0) {
                      return {
                              TAG: /* LText */0,
                              text: el,
                              prev: st
                            };
                    } else {
                      return {
                              TAG: /* LText */0,
                              text: st.text + el,
                              prev: st.prev
                            };
                    }
                }
              }));
}

console.log(JSON.stringify(lexing("rstar[atrsaon[url]aorsinit[/url][]]rasta")));

var mapBBaux = Belt_List.map;

function mapBB(a, f) {
  return Belt_Array.reverse(Belt_List.toArray(Belt_List.map(Belt_List.fromArray(a), f)));
}

export {
  a ,
  lexing ,
  mapBBaux ,
  mapBB ,
  
}
/*  Not a pure module */
