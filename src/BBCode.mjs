// Generated by ReScript, PLEASE EDIT WITH CARE

import * as List from "rescript/lib/es6/list.js";
import * as Opal from "./vendor/opal/opal.mjs";
import * as $$Array from "rescript/lib/es6/array.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Pervasives from "rescript/lib/es6/pervasives.js";
import * as Caml_format from "rescript/lib/es6/caml_format.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var ast_to_array = $$Array.of_list;

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
                                          var partial_arg_2 = $$Array.of_list(param[1]);
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
  var tag_name = tag.name.toLowerCase();
  var tag_value = tag.value;
  var tag_attrib = tag.attrib;
  var tag$1 = {
    name: tag_name,
    value: tag_value,
    attrib: tag_attrib
  };
  switch (tag_name) {
    case "b" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Bold */1,
                  children: children
                };
        }
    case "center" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* CenterText */7,
                  children: children
                };
        }
    case "code" :
        var language = tag_value;
        if (language !== undefined) {
          if (tag_attrib.length !== 0) {
            return {
                    TAG: /* Other */23,
                    children: children,
                    tag: tag$1
                  };
          } else {
            return {
                    TAG: /* CodeLanguageSpecific */20,
                    children: children,
                    language: language
                  };
          }
        } else if (tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Code */19,
                  children: children
                };
        }
    case "color" :
        var color = tag_value;
        if (color !== undefined && tag_attrib.length === 0) {
          return {
                  TAG: /* FontColor */6,
                  children: children,
                  color: color
                };
        } else {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
    case "i" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Italic */2,
                  children: children
                };
        }
    case "img" :
        if (tag_value !== undefined) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
        var match = tag_attrib;
        var len = match.length;
        if (len >= 3) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
        switch (len) {
          case 0 :
              if (!children) {
                return Pervasives.failwith("Text must be inside img");
              }
              var url = children.hd;
              if (url.TAG === /* Text */0 && !children.tl) {
                return {
                        TAG: /* Image */16,
                        url: url._0
                      };
              } else {
                return Pervasives.failwith("Text must be inside img");
              }
          case 1 :
              return {
                      TAG: /* Other */23,
                      children: children,
                      tag: tag$1
                    };
          case 2 :
              var match$1 = match[0];
              if (match$1[0] !== "width") {
                return {
                        TAG: /* Other */23,
                        children: children,
                        tag: tag$1
                      };
              }
              var match$2 = match[1];
              if (match$2[0] !== "height") {
                return {
                        TAG: /* Other */23,
                        children: children,
                        tag: tag$1
                      };
              }
              if (!children) {
                return Pervasives.failwith("Text must be inside img");
              }
              var url$1 = children.hd;
              if (url$1.TAG === /* Text */0 && !children.tl) {
                return {
                        TAG: /* ImageResized */17,
                        width: Caml_format.caml_int_of_string(match$1[1]),
                        height: Caml_format.caml_int_of_string(match$2[1]),
                        url: url$1._0
                      };
              } else {
                return Pervasives.failwith("Text must be inside img");
              }
          
        }
    case "left" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* LeftAlignText */8,
                  children: children
                };
        }
    case "pre" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Preformatted */21,
                  children: children
                };
        }
    case "quote" :
        var name = tag_value;
        if (name !== undefined) {
          if (tag_attrib.length !== 0) {
            return {
                    TAG: /* Other */23,
                    children: children,
                    tag: tag$1
                  };
          } else {
            return {
                    TAG: /* QuoteNamed */11,
                    children: children,
                    quote: name
                  };
          }
        } else if (tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Quote */10,
                  children: children
                };
        }
    case "right" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* RightAlignText */9,
                  children: children
                };
        }
    case "s" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Strikethrough */4,
                  children: children
                };
        }
    case "size" :
        var number = tag_value;
        if (number !== undefined && tag_attrib.length === 0) {
          return {
                  TAG: /* FontSize */5,
                  children: children,
                  size: Caml_format.caml_int_of_string(number)
                };
        } else {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
    case "spoiler" :
        var name$1 = tag_value;
        if (name$1 !== undefined) {
          if (tag_attrib.length !== 0) {
            return {
                    TAG: /* Other */23,
                    children: children,
                    tag: tag$1
                  };
          } else {
            return {
                    TAG: /* SpoilerNamed */13,
                    children: children,
                    spoiler: name$1
                  };
          }
        } else if (tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Spoiler */12,
                  children: children
                };
        }
    case "style" :
        if (tag_value !== undefined) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
        var match$3 = tag_attrib;
        if (match$3.length !== 1) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
        var match$4 = match$3[0];
        switch (match$4[0]) {
          case "color" :
              return {
                      TAG: /* FontColor */6,
                      children: children,
                      color: match$4[1]
                    };
          case "size" :
              return {
                      TAG: /* FontSize */5,
                      children: children,
                      size: Caml_format.caml_int_of_string(match$4[1])
                    };
          default:
            return {
                    TAG: /* Other */23,
                    children: children,
                    tag: tag$1
                  };
        }
    case "table" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Table */22,
                  rows: $$Array.of_list(List.map((function (param) {
                              if (param.TAG !== /* Other */23) {
                                return Pervasives.failwith("Table row must be inside table");
                              }
                              var match = param.tag;
                              if (match.name === "tr" && !(match.value !== undefined || match.attrib.length !== 0)) {
                                return /* TableRow */{
                                        cells: $$Array.of_list(List.map((function (param) {
                                                    if (param.TAG !== /* Other */23) {
                                                      return Pervasives.failwith("Table cell must be inside row");
                                                    }
                                                    var match = param.tag;
                                                    var children = param.children;
                                                    switch (match.name) {
                                                      case "td" :
                                                          if (match.value !== undefined || match.attrib.length !== 0) {
                                                            return Pervasives.failwith("Table cell must be inside row");
                                                          } else {
                                                            return /* TableCell */{
                                                                    children: children,
                                                                    variant: "Content"
                                                                  };
                                                          }
                                                      case "th" :
                                                          if (match.value !== undefined || match.attrib.length !== 0) {
                                                            return Pervasives.failwith("Table cell must be inside row");
                                                          } else {
                                                            return /* TableCell */{
                                                                    children: children,
                                                                    variant: "Heading"
                                                                  };
                                                          }
                                                      default:
                                                        return Pervasives.failwith("Table cell must be inside row");
                                                    }
                                                  }), param.children))
                                      };
                              } else {
                                return Pervasives.failwith("Table row must be inside table");
                              }
                            }), children))
                };
        }
    case "u" :
        if (tag_value !== undefined || tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        } else {
          return {
                  TAG: /* Underline */3,
                  children: children
                };
        }
    case "list" :
    case "ol" :
    case "ul" :
        break;
    case "url" :
        var url$2 = tag_value;
        if (url$2 !== undefined) {
          if (tag_attrib.length !== 0) {
            return {
                    TAG: /* Other */23,
                    children: children,
                    tag: tag$1
                  };
          } else {
            return {
                    TAG: /* LinkNamed */15,
                    children: children,
                    url: url$2
                  };
          }
        }
        if (tag_attrib.length !== 0) {
          return {
                  TAG: /* Other */23,
                  children: children,
                  tag: tag$1
                };
        }
        if (!children) {
          return Pervasives.failwith("Text must be inside url");
        }
        var url$3 = children.hd;
        if (url$3.TAG === /* Text */0 && !children.tl) {
          return {
                  TAG: /* Link */14,
                  url: url$3._0
                };
        } else {
          return Pervasives.failwith("Text must be inside url");
        }
    default:
      return {
              TAG: /* Other */23,
              children: children,
              tag: tag$1
            };
  }
  if (tag_value !== undefined) {
    return {
            TAG: /* Other */23,
            children: children,
            tag: tag$1
          };
  }
  if (tag_attrib.length !== 0) {
    return {
            TAG: /* Other */23,
            children: children,
            tag: tag$1
          };
  }
  var match$5 = tag.name;
  var tmp;
  switch (match$5) {
    case "list" :
        tmp = "Another";
        break;
    case "ol" :
        tmp = "Ordered";
        break;
    case "ul" :
        tmp = "Unordered";
        break;
    default:
      tmp = "Another";
  }
  return {
          TAG: /* List */18,
          items: $$Array.of_list(List.map((function (li) {
                      if (li.TAG !== /* Other */23) {
                        return Pervasives.failwith("List item must be inside list");
                      }
                      var match = li.tag;
                      if (match.name === "li" && !(match.value !== undefined || match.attrib.length !== 0)) {
                        return /* ListItem */{
                                children: li.children
                              };
                      } else {
                        return Pervasives.failwith("List item must be inside list");
                      }
                    }), children)),
          variant: tmp
        };
}

function parse_bbcode(loop, stck) {
  return function (param) {
    return Opal.$great$great$eq((function (param) {
                  return Opal.$great$great$eq((function (param) {
                                return Opal.$great$great$eq(tag, (function (tg) {
                                              var partial_arg = Curry._1(loop, {
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
  };
}

function pqwf(inqOpt, stck) {
  var inq = inqOpt !== undefined ? Caml_option.valFromOption(inqOpt) : undefined;
  var partial_arg = Opal.$eq$great(lsb, (function (param) {
          return {
                  hd: {
                    TAG: /* Text */0,
                    _0: "["
                  },
                  tl: /* [] */0
                };
        }));
  var partial_arg$1;
  if (inq !== undefined) {
    partial_arg$1 = (function (param) {
        return Opal.$$return(/* [] */0, param);
      });
  } else {
    var partial_arg$2 = Opal.$eq$great(Opal.$eq$great(Opal.many(Opal.none_of(/* [] */0)), Opal.implode), (function (it) {
            return {
                    TAG: /* Text */0,
                    _0: it
                  };
          }));
    var partial_arg$3 = function (param) {
      return Opal.$great$great$eq(partial_arg$2, (function (it) {
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
    partial_arg$1 = (function (param) {
        return Opal.$great$great$eq(partial_arg$3, (function (param) {
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
  var partial_arg$4 = parse_bbcode((function (eta) {
          return pqwf(undefined, eta);
        }), stck);
  var partial_arg$5 = function (param) {
    return Opal.$less$pipe$great(partial_arg$4, partial_arg$1, param);
  };
  return function (param) {
    return Opal.$less$pipe$great(partial_arg$5, partial_arg, param);
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
  parse_bbcode: parse_bbcode,
  pqwf: pqwf,
  run: run
};

function parse(a) {
  return run(a, pqwf(undefined, /* [] */0));
}

export {
  ast_to_array ,
  Parse ,
  parse ,
  
}
/* rsb Not a pure module */
