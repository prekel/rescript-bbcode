/* TypeScript file generated from Index.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as IndexBS__Es6Import from './Index.mjs';
const IndexBS: any = IndexBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type bb_item = 
    { tag: "Text"; value: { readonly text: string } }
  | { tag: "Url"; value: { readonly url: string; readonly text?: string } };

export const a: () => void = IndexBS.a;

export const mapBB: <T1>(a:bb_item[], f:((_1:bb_item) => T1)) => T1[] = function <T1>(Arg1: any, Arg2: any) {
  const result = Curry._2(IndexBS.mapBB, Arg1.map(function _element(ArrayItem: any) { return ArrayItem.tag==="Text"
    ? Object.assign({TAG: 0}, ArrayItem.value)
    : Object.assign({TAG: 1}, ArrayItem.value)}), function (Arg11: any) {
      const result1 = Arg2(Arg11.TAG===0
        ? {tag:"Text", value:Arg11}
        : {tag:"Url", value:Arg11});
      return result1
    });
  return result
};
