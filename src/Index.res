@genType
let a = () => Js.Console.log("hello")

a()

type rec lexer_ast =
  | LText({text: string, prev: lexer_ast})
  | LLeftBracket({prev: lexer_ast})
  | LRightBracket({prev: lexer_ast})
  | LNil

let lexing = s =>
  s
  ->Js.String2.castToArrayLike
  ->Js.Array2.from
  ->Belt.Array.reduce(LNil, (st, el) =>
    switch el {
    | "[" => LLeftBracket({prev: st})
    | "]" => LRightBracket({prev: st})
    | other =>
      switch st {
      | LText({text: txt, prev: nxt}) => LText({text: txt ++ other, prev: nxt})
      | LLeftBracket(_) => LText({text: other, prev: st})
      | LRightBracket(_) => LText({text: other, prev: st})
      | LNil => LText({text: other, prev: st})
      }
    }
  )

Js.Console.log(lexing("rstar[atrsaon[url]aorsinit[/url][]]rasta")->Js.Json.stringifyAny)

type rec parser_weak_ast =
  | PText({text: string, next: parser_weak_ast})
  | PBlock({inner: string, next: parser_weak_ast})
  | PNil

@genType
type bb_item =
  | Text({text: string})
  | Url({url: string, text: option<string>})

let mapBBaux = (a: list<bb_item>, f) => {
  Belt.List.map(a, f)
}

@genType
let mapBB = (a, f) => mapBBaux(a->Belt.List.fromArray, f)->Belt.List.toArray->Belt.Array.reverse
