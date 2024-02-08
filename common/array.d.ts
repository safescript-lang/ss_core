/// <reference no-default-lib="true"/>

//deno-lint-ignore-file no-empty-interface

/**
 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
 * 
 * This is here because otherwise the TypeScript compiler will complain about the
 * `Array` type missing.
 * 
 * If you want to use an array, you should use the `[]` syntax.
*/
//@ts-ignore: This is a hack to make the TypeScript compiler happy
interface Array<T> { }
