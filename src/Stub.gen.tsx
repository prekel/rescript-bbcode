/* TypeScript file generated from Stub.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as StubBS__Es6Import from './Stub.mjs';
const StubBS: any = StubBS__Es6Import;

import type {ast as BBCode_ast} from './BBCode.gen';

import type {ast_item as BBCode_ast_item} from './BBCode.gen';

// tslint:disable-next-line:interface-over-type-literal
export type Props = { readonly a: BBCode_ast_item; readonly f: (_1:BBCode_ast) => JSX.Element };

export const make: React.ComponentType<{ readonly a: BBCode_ast_item; readonly f: (_1:BBCode_ast) => JSX.Element }> = function Stub(Arg1: any) {
  const $props = {a:Arg1.a.tag==="Text"
    ? {TAG: 0, _0:Arg1.a.value} as any
    : Arg1.a.tag==="Bold"
    ? Object.assign({TAG: 1}, Arg1.a.value)
    : Arg1.a.tag==="Italic"
    ? Object.assign({TAG: 2}, Arg1.a.value)
    : Arg1.a.tag==="Underline"
    ? Object.assign({TAG: 3}, Arg1.a.value)
    : Arg1.a.tag==="Strikethrough"
    ? Object.assign({TAG: 4}, Arg1.a.value)
    : Arg1.a.tag==="FontSize"
    ? Object.assign({TAG: 5}, Arg1.a.value)
    : Arg1.a.tag==="FontColor"
    ? Object.assign({TAG: 6}, Arg1.a.value)
    : Arg1.a.tag==="CenterText"
    ? Object.assign({TAG: 7}, Arg1.a.value)
    : Arg1.a.tag==="LeftAlignText"
    ? Object.assign({TAG: 8}, Arg1.a.value)
    : Arg1.a.tag==="RightAlignText"
    ? Object.assign({TAG: 9}, Arg1.a.value)
    : Arg1.a.tag==="Quote"
    ? Object.assign({TAG: 10}, Arg1.a.value)
    : Arg1.a.tag==="QuoteNamed"
    ? Object.assign({TAG: 11}, Arg1.a.value)
    : Arg1.a.tag==="Spoiler"
    ? Object.assign({TAG: 12}, Arg1.a.value)
    : Arg1.a.tag==="SpoilerNamed"
    ? Object.assign({TAG: 13}, Arg1.a.value)
    : Arg1.a.tag==="Link"
    ? Object.assign({TAG: 14}, Arg1.a.value)
    : Arg1.a.tag==="LinkNamed"
    ? Object.assign({TAG: 15}, Arg1.a.value)
    : Arg1.a.tag==="Image"
    ? Object.assign({TAG: 16}, Arg1.a.value)
    : Arg1.a.tag==="ImageResized"
    ? Object.assign({TAG: 17}, Arg1.a.value)
    : Arg1.a.tag==="List"
    ? Object.assign({TAG: 18}, {items:Arg1.a.value.items.map(function _element(ArrayItem: any) { return Object.assign({TAG: 0}, ArrayItem)}), variant:Arg1.a.value.variant})
    : Arg1.a.tag==="Code"
    ? Object.assign({TAG: 19}, Arg1.a.value)
    : Arg1.a.tag==="CodeLanguageSpecific"
    ? Object.assign({TAG: 20}, Arg1.a.value)
    : Arg1.a.tag==="Preformatted"
    ? Object.assign({TAG: 21}, Arg1.a.value)
    : Arg1.a.tag==="Table"
    ? Object.assign({TAG: 22}, {rows:Arg1.a.value.rows.map(function _element(ArrayItem1: any) { return Object.assign({TAG: 0}, {cells:ArrayItem1.cells.map(function _element(ArrayItem2: any) { return Object.assign({TAG: 0}, ArrayItem2)})})})})
    : Arg1.a.tag==="Other"
    ? Object.assign({TAG: 23}, Arg1.a.value)
    : Object.assign({TAG: 24}, Arg1.a.value), f:Arg1.f};
  const result = React.createElement(StubBS.make, $props);
  return result
};
