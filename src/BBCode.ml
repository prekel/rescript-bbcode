include BBCodeInternal.BBCode

let parse text : ast option = BBCodeInternal.parse text [@@genType]
