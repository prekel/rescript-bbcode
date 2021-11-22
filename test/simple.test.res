open Zora

zoraBlock("should run a test synchronously", t => {
  let answer = 3.14
  t->equal(answer, 3.14, "Should be a tasty dessert")
})

zoraBlock("", t => {
  let a = Index.lexing("rstar[atrsaon[url]aorsinit[/url][]]rasta")
  Js.Console.log(a)
  t->equal(1, 1, "")
})
