open BBCode

@genType @react.component
let make = (~a: BBCode.ast, ~f) => {
  let art =
    a
    ->Belt.List.toArray
    ->Belt.Array.map(b => {
      switch b {
      | Text(t) => <span className="bbcode"> {React.string(t)} </span>
      | Bold({children: t})
      | Italic({children: t})
      | Underline({children: t})
      | Strikethrough({children: t})
      | FontSize({children: t})
      | FontColor({children: t})
      | CenterText({children: t})
      | LeftAlignText({children: t})
      | RightAlignText({children: t})
      | Quote({children: t})
      | QuoteNamed({children: t})
      | Spoiler({children: t})
      | SpoilerNamed({children: t})
      | LinkNamed({children: t})
      | Code({children: t})
      | CodeLanguageSpecific({children: t})
      | Preformatted({children: t})
      | Other({children: t}) =>
        <div className="bbcode"> {f(t)} </div>
      | Table(_)
      | YouTube(_)
      | List(_)
      | Image(_)
      | ImageResized(_)
      | Link(_) =>
        <div className="bbcode" />
      }
    })

  <> {React.array(art)} </>
}
