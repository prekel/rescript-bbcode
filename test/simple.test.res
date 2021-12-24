open Zora

zoraBlock("digit parser", t => {
  let a = Bbcode.Parse.run("[tag]", Bbcode.Parse.bbcodetag)
  t->equal(a, Some("tag"), "")
})
