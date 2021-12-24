// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Opal from "./vendor/opal/opal.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var rsb = Opal.exactly(/* ']' */93);

var lsb = Opal.exactly(/* '[' */91);

var eql = Opal.exactly(/* '=' */61);

var slash = Opal.exactly(/* '/' */47);

var attr_value = Opal.$eq$great(Opal.many1(Opal.none_of({
              hd: /* ' ' */32,
              tl: {
                hd: /* '\t' */9,
                tl: {
                  hd: /* '\r' */13,
                  tl: {
                    hd: /* '\n' */10,
                    tl: {
                      hd: /* ']' */93,
                      tl: {
                        hd: /* '[' */91,
                        tl: /* [] */0
                      }
                    }
                  }
                }
              }
            })), Opal.implode);

var partial_arg = Opal.$eq$great(Opal.many1(function (param) {
          return Opal.$less$pipe$great(Opal.letter, Opal.digit, param);
        }), Opal.implode);

function attrib(param) {
  return Opal.$great$great$eq(partial_arg, (function (attr_name) {
                var partial_arg = Opal.$great$great(eql, attr_value);
                return function (param) {
                  return Opal.$great$great$eq(partial_arg, (function (attr_value) {
                                var partial_arg = [
                                  attr_name,
                                  attr_value
                                ];
                                return function (param) {
                                  return Opal.$$return(partial_arg, param);
                                };
                              }), param);
                };
              }), param);
}

var attributes = Opal.$great$great(Opal.spaces, Opal.many(Opal.$less$less(attrib, Opal.spaces)));

var partial_arg$1 = Opal.$eq$great(Opal.$great$great(lsb, Opal.many(Opal.letter)), Opal.implode);

var tag = Opal.$eq$great(Opal.$less$less((function (param) {
            return Opal.$great$great$eq(partial_arg$1, (function (name) {
                          var partial_arg = Opal.$eq$great(Opal.$great$great(eql, attr_value), (function (it) {
                                  return it;
                                }));
                          var partial_arg$1 = function (param) {
                            return Opal.$less$pipe$great(partial_arg, (function (param) {
                                          return Opal.$$return(undefined, param);
                                        }), param);
                          };
                          var partial_arg$2 = function (param) {
                            return Opal.$great$great$eq(partial_arg$1, (function (value) {
                                          return Opal.$eq$great(attributes, (function (attrib) {
                                                        return [
                                                                value,
                                                                attrib
                                                              ];
                                                      }));
                                        }), param);
                          };
                          return function (param) {
                            return Opal.$great$great$eq(partial_arg$2, (function (param) {
                                          var partial_arg_1 = param[0];
                                          var partial_arg_2 = param[1];
                                          var partial_arg = [
                                            name,
                                            partial_arg_1,
                                            partial_arg_2
                                          ];
                                          return function (param) {
                                            return Opal.$$return(partial_arg, param);
                                          };
                                        }), param);
                          };
                        }), param);
          }), rsb), (function (param) {
        return {
                name: param[0],
                value: param[1],
                attrib: param[2]
              };
      }));

var bbcodetag = Opal.$less$less(Opal.$eq$great(Opal.$great$great(lsb, Opal.many(Opal.letter)), Opal.implode), rsb);

var closedtag = Opal.$less$less(Opal.$eq$great(Opal.$great$great(Opal.$great$great(lsb, slash), Opal.many(Opal.letter)), Opal.implode), rsb);

function item_from_tag(children, tag) {
  switch (tag.name) {
    case "b" :
        if (tag.value !== undefined || tag.attrib) {
          return {
                  TAG: /* Other */3,
                  _0: tag,
                  _1: children
                };
        } else {
          return {
                  TAG: /* Bold */1,
                  _0: children
                };
        }
    case "url" :
        var url = tag.value;
        if (url !== undefined && !tag.attrib) {
          return {
                  TAG: /* LinkNamed */2,
                  _0: url,
                  _1: children
                };
        } else {
          return {
                  TAG: /* Other */3,
                  _0: tag,
                  _1: children
                };
        }
    default:
      return {
              TAG: /* Other */3,
              _0: tag,
              _1: children
            };
  }
}

function pqwf(inqOpt, stck) {
  var inq = inqOpt !== undefined ? Caml_option.valFromOption(inqOpt) : undefined;
  var partial_arg;
  if (inq !== undefined) {
    partial_arg = (function (param) {
        return Opal.$$return(/* [] */0, param);
      });
  } else {
    var partial_arg$1 = Opal.$eq$great(Opal.$eq$great(Opal.many(Opal.letter), Opal.implode), (function (it) {
            return {
                    TAG: /* Text */0,
                    _0: it
                  };
          }));
    var partial_arg$2 = function (param) {
      return Opal.$great$great$eq(partial_arg$1, (function (it) {
                    var partial_arg = pqwf(Caml_option.some(it), stck);
                    return function (param) {
                      return Opal.$great$great$eq(partial_arg, (function (it2) {
                                    var partial_arg = [
                                      it,
                                      it2
                                    ];
                                    return function (param) {
                                      return Opal.$$return(partial_arg, param);
                                    };
                                  }), param);
                    };
                  }), param);
    };
    partial_arg = (function (param) {
        return Opal.$great$great$eq(partial_arg$2, (function (param) {
                      var partial_arg_0 = param[0];
                      var partial_arg_1 = param[1];
                      var partial_arg = {
                        hd: partial_arg_0,
                        tl: partial_arg_1
                      };
                      return function (param) {
                        return Opal.$$return(partial_arg, param);
                      };
                    }), param);
      });
  }
  return function (param) {
    return Opal.$less$pipe$great((function (param) {
                  return Opal.$great$great$eq((function (param) {
                                return Opal.$great$great$eq((function (param) {
                                              return Opal.$great$great$eq(tag, (function (tg) {
                                                            var partial_arg = pqwf(undefined, {
                                                                  hd: tg,
                                                                  tl: stck
                                                                });
                                                            return function (param) {
                                                              return Opal.$great$great$eq(partial_arg, (function (it) {
                                                                            var partial_arg = [
                                                                              tg,
                                                                              it
                                                                            ];
                                                                            return function (param) {
                                                                              return Opal.$$return(partial_arg, param);
                                                                            };
                                                                          }), param);
                                                            };
                                                          }), param);
                                            }), (function (param) {
                                              var ai = param[1];
                                              var tg = param[0];
                                              return function (param) {
                                                return Opal.$great$great$eq(closedtag, (function (ctg) {
                                                              var partial_arg = [
                                                                tg,
                                                                ctg,
                                                                ai
                                                              ];
                                                              return function (param) {
                                                                return Opal.$$return(partial_arg, param);
                                                              };
                                                            }), param);
                                              };
                                            }), param);
                              }), (function (param) {
                                var tg = param[0];
                                if (tg.name !== param[1]) {
                                  return Opal.mzero;
                                }
                                var partial_arg_0 = item_from_tag(param[2], tg);
                                var partial_arg = {
                                  hd: partial_arg_0,
                                  tl: /* [] */0
                                };
                                return function (param) {
                                  return Opal.$$return(partial_arg, param);
                                };
                              }), param);
                }), partial_arg, param);
  };
}

function run(str, parser) {
  return Opal.parse(parser, Opal.LazyStream.of_string(str));
}

var Parse = {
  rsb: rsb,
  lsb: lsb,
  eql: eql,
  slash: slash,
  attr_value: attr_value,
  attrib: attrib,
  attributes: attributes,
  tag: tag,
  bbcodetag: bbcodetag,
  closedtag: closedtag,
  item_from_tag: item_from_tag,
  pqwf: pqwf,
  run: run
};

export {
  Parse ,
  
}
/* rsb Not a pure module */
