/* TypeScript file generated from BBCode.ml by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as BBCodeBS__Es6Import from './BBCode.mjs';
const BBCodeBS: any = BBCodeBS__Es6Import;

import type {List_t as Belt_List_t} from './Belt.gen';

// tslint:disable-next-line:interface-over-type-literal
export type list<a> = Belt_List_t<a>;

// tslint:disable-next-line:interface-over-type-literal
export type tag = {
  readonly name: string; 
  readonly value?: string; 
  readonly attrib: list<[string, string]>
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
  | { tag: "CenterText"; value: { readonly children: ast } }
  | { tag: "LeftAlignText"; value: { readonly children: ast } }
  | { tag: "RightAlignText"; value: { readonly children: ast } }
  | { tag: "Quote"; value: { readonly children: ast } }
  | { tag: "QuoteNamed"; value: { readonly children: ast; readonly quote: string } }
  | { tag: "Spoiler"; value: { readonly children: ast } }
  | { tag: "SpoilerNamed"; value: { readonly children: ast; readonly spoiler: string } }
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

export const ast_to_array: (a:ast) => ast_item[] = function (Arg1: any) {
  const result = BBCodeBS.ast_to_array(Arg1);
  return result.map(function _element(ArrayItem: any) { return ArrayItem.TAG===0
    ? {tag:"Text", value:ArrayItem._0}
    : ArrayItem.TAG===1
    ? {tag:"Bold", value:ArrayItem}
    : ArrayItem.TAG===2
    ? {tag:"Italic", value:ArrayItem}
    : ArrayItem.TAG===3
    ? {tag:"Underline", value:ArrayItem}
    : ArrayItem.TAG===4
    ? {tag:"Strikethrough", value:ArrayItem}
    : ArrayItem.TAG===5
    ? {tag:"FontSize", value:ArrayItem}
    : ArrayItem.TAG===6
    ? {tag:"FontColor", value:ArrayItem}
    : ArrayItem.TAG===7
    ? {tag:"CenterText", value:ArrayItem}
    : ArrayItem.TAG===8
    ? {tag:"LeftAlignText", value:ArrayItem}
    : ArrayItem.TAG===9
    ? {tag:"RightAlignText", value:ArrayItem}
    : ArrayItem.TAG===10
    ? {tag:"Quote", value:ArrayItem}
    : ArrayItem.TAG===11
    ? {tag:"QuoteNamed", value:ArrayItem}
    : ArrayItem.TAG===12
    ? {tag:"Spoiler", value:ArrayItem}
    : ArrayItem.TAG===13
    ? {tag:"SpoilerNamed", value:ArrayItem}
    : ArrayItem.TAG===14
    ? {tag:"Link", value:ArrayItem}
    : ArrayItem.TAG===15
    ? {tag:"LinkNamed", value:ArrayItem}
    : ArrayItem.TAG===16
    ? {tag:"Image", value:ArrayItem}
    : ArrayItem.TAG===17
    ? {tag:"ImageResized", value:ArrayItem}
    : ArrayItem.TAG===18
    ? {tag:"List", value:{items:ArrayItem.items.map(function _element(ArrayItem1: any) { return ArrayItem1}), variant:ArrayItem.variant}}
    : ArrayItem.TAG===19
    ? {tag:"Code", value:ArrayItem}
    : ArrayItem.TAG===20
    ? {tag:"CodeLanguageSpecific", value:ArrayItem}
    : ArrayItem.TAG===21
    ? {tag:"Preformatted", value:ArrayItem}
    : ArrayItem.TAG===22
    ? {tag:"Table", value:{rows:ArrayItem.rows.map(function _element(ArrayItem2: any) { return {cells:ArrayItem2.cells.map(function _element(ArrayItem3: any) { return ArrayItem3})}})}}
    : ArrayItem.TAG===23
    ? {tag:"Other", value:ArrayItem}
    : {tag:"YouTube", value:ArrayItem}})
};
