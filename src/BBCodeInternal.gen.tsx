/* TypeScript file generated from BBCodeInternal.ml by genType. */
/* eslint-disable import/first */


import type {list} from '../src/ shims /ReasonPervasives.shim';

// tslint:disable-next-line:interface-over-type-literal
export type tag = {
  readonly name: string; 
  readonly value?: string; 
  readonly attrib: Array<[string, string]>
};

// tslint:disable-next-line:interface-over-type-literal
export type ast_item = 
    { tag: "Text"; value: string }
  | { tag: "Bold"; value: { readonly children: ast } }
  | { tag: "Italic"; value: { readonly children: ast } }
  | { tag: "Underline"; value: { readonly children: ast } }
  | { tag: "Strikethrough"; value: { readonly children: ast } }
  | { tag: "FontSize"; value: { readonly children: ast; readonly size: number } }
  | { tag: "FontColor"; value: { readonly children: ast; readonly color: string } }
  | { tag: "CenterAlign"; value: { readonly children: ast } }
  | { tag: "LeftAlign"; value: { readonly children: ast } }
  | { tag: "RightAlign"; value: { readonly children: ast } }
  | { tag: "Quote"; value: { readonly children: ast } }
  | { tag: "QuoteNamed"; value: { readonly children: ast; readonly quote: string } }
  | { tag: "Spoiler"; value: { readonly children: ast } }
  | { tag: "SpoilerNamed"; value: { readonly children: ast; readonly name: string } }
  | { tag: "Link"; value: { readonly url: string } }
  | { tag: "LinkNamed"; value: { readonly children: ast; readonly url: string } }
  | { tag: "Image"; value: { readonly url: string } }
  | { tag: "ImageResized"; value: {
  readonly width: number; 
  readonly height: number; 
  readonly url: string
} }
  | { tag: "List"; value: { readonly items: list_item[]; readonly variant: "Ordered" | "Unordered" | "Another" } }
  | { tag: "Code"; value: { readonly children: ast } }
  | { tag: "CodeLanguageSpecific"; value: { readonly children: ast; readonly language: string } }
  | { tag: "Preformatted"; value: { readonly children: ast } }
  | { tag: "Table"; value: { readonly rows: table_row[] } }
  | { tag: "Other"; value: { readonly children: ast; readonly tag: tag } }
  | { tag: "YouTube"; value: { readonly id: string } };

// tslint:disable-next-line:interface-over-type-literal
export type ast = list<ast_item>;

// tslint:disable-next-line:interface-over-type-literal
export type list_item = { readonly children: ast };

// tslint:disable-next-line:interface-over-type-literal
export type table_row = { readonly cells: table_cell[] };

// tslint:disable-next-line:interface-over-type-literal
export type table_cell = 
    { readonly children: ast; readonly variant: "Heading" | "Content" };

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_tag = {
  readonly name: string; 
  readonly value?: string; 
  readonly attrib: Array<[string, string]>
};

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_ast_item = 
    { tag: "Text"; value: string }
  | { tag: "Bold"; value: { readonly children: ast } }
  | { tag: "Italic"; value: { readonly children: ast } }
  | { tag: "Underline"; value: { readonly children: ast } }
  | { tag: "Strikethrough"; value: { readonly children: ast } }
  | { tag: "FontSize"; value: { readonly children: ast; readonly size: number } }
  | { tag: "FontColor"; value: { readonly children: ast; readonly color: string } }
  | { tag: "CenterAlign"; value: { readonly children: ast } }
  | { tag: "LeftAlign"; value: { readonly children: ast } }
  | { tag: "RightAlign"; value: { readonly children: ast } }
  | { tag: "Quote"; value: { readonly children: ast } }
  | { tag: "QuoteNamed"; value: { readonly children: ast; readonly quote: string } }
  | { tag: "Spoiler"; value: { readonly children: ast } }
  | { tag: "SpoilerNamed"; value: { readonly children: ast; readonly name: string } }
  | { tag: "Link"; value: { readonly url: string } }
  | { tag: "LinkNamed"; value: { readonly children: ast; readonly url: string } }
  | { tag: "Image"; value: { readonly url: string } }
  | { tag: "ImageResized"; value: {
  readonly width: number; 
  readonly height: number; 
  readonly url: string
} }
  | { tag: "List"; value: { readonly items: list_item[]; readonly variant: "Ordered" | "Unordered" | "Another" } }
  | { tag: "Code"; value: { readonly children: ast } }
  | { tag: "CodeLanguageSpecific"; value: { readonly children: ast; readonly language: string } }
  | { tag: "Preformatted"; value: { readonly children: ast } }
  | { tag: "Table"; value: { readonly rows: table_row[] } }
  | { tag: "Other"; value: { readonly children: ast; readonly tag: BBCode_tag } }
  | { tag: "YouTube"; value: { readonly id: string } };

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_ast = BBCode_ast_item[];

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_list_item = { readonly children: BBCode_ast };

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_table_row = { readonly cells: table_cell[] };

// tslint:disable-next-line:interface-over-type-literal
export type BBCode_table_cell = 
    { readonly children: BBCode_ast; readonly variant: "Heading" | "Content" };
