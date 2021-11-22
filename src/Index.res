@genType
let a = () => Js.Console.log("hello")

a()

type lexer_ast_item =
  | LText({text: string})
  | LLeftBracket
  | LRightBracket

let lexing = s =>
  s
  ->Js.String2.castToArrayLike
  ->Js.Array2.from
  ->Belt.Array.reduce(list{}, (st, el) =>
    switch el {
    | "[" => list{LLeftBracket, ...st}
    | "]" => list{LRightBracket, ...st}
    | other =>
      switch st {
      | list{LText({text}), ...tail} => list{LText({text: text ++ other}), ...tail}
      | list{LLeftBracket, ..._} => list{LText({text: other}), ...st}
      | list{LRightBracket, ..._} => list{LText({text: other}), ...st}
      | list{} => list{LText({text: other})}
      }
    }
  )

Js.Console.log(
  lexing("rstar[atrsaon[url]aorsinit[/url][]]rasta")->Belt.List.toArray->Belt.Array.reverse,
)

type rec parser_weak_ast_item =
  | PText({text: string})
  | PBlock({text: string, inner: string})

type parse_state =
  | OpenBracket(string, string)
  | NotOpenBracket(string)

let rec parsing_weak = (l, state, acc) =>
  switch (l, state) {
  | (list{LText({text}), ...nxt}, OpenBracket(curr, inn)) =>
    parsing_weak(nxt, OpenBracket(curr ++ text, ""), acc)
  | (list{LText({text}), ...nxt}, NotOpenBracket(curr)) =>
    parsing_weak(nxt, NotOpenBracket(curr ++ text), acc)
  | (list{LLeftBracket, ...nxt}, OpenBracket(curr, inn)) =>
    parsing_weak(nxt, OpenBracket(curr ++ "[", ""), acc)
  | (list{LLeftBracket, ...nxt}, NotOpenBracket(curr)) =>
    parsing_weak(nxt, OpenBracket(curr ++ "[", ""), acc)
  | (list{LRightBracket, ...nxt}, OpenBracket(curr, inn)) => assert false
  | (list{LRightBracket, ...nxt}, NotOpenBracket(curr)) => assert false
  | (list{}, OpenBracket(curr, inn)) => assert false
  | (list{}, NotOpenBracket(curr)) => assert false
  }

@genType
type bb_item =
  | Text({text: string})
  | Url({url: string, text: option<string>})

let mapBBaux = (a: list<bb_item>, f) => {
  Belt.List.map(a, f)
}

@genType
let mapBB = (a, f) => mapBBaux(a->Belt.List.fromArray, f)->Belt.List.toArray->Belt.Array.reverse
