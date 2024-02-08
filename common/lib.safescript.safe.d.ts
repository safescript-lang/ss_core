/// <reference no-default-lib="true"/>
/// <reference path="./lib.safescript.convert.safe.d.ts" />
/// <reference path="./lib.safescript.eh.safe.d.ts" />
/// <reference path="./lib.safescript.fmt.safe.d.ts" />
/// <reference path="./lib.safescript.mem.safe.d.ts" />
/// <reference path="./lib.safescript.ops.safe.d.ts" />
/// <reference path="./lib.safescript.primitives.safe.d.ts" />

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    /**
     * The SafeScript standard library.
     * 
     * Abides by the [specification](README.md)
     * 
     * This does not include any of the implementation details.
    */
    export namespace sscore {
        /** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
        export namespace __safescript_internals__ {
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is used to help TypeScript easier infer the type of the value.
            */
            type Primitives = 'bool' | 'num' | 'str' | 'char' | 'void' |
            'u8' | 'u16' | 'u32' | 'u64' | 'usize' |
            'i8' | 'i16' | 'i32' | 'i64' | 'isize' |
            'f32' | 'f64';
            /**
            * ## THIS IS NOT PART OF THE STANDARD LIBRARY
            * This is used to help TypeScript easier infer the type of the value.
            */
            interface Primitive<P extends Primitives> {
                /**
                 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                 * This is used to help TypeScript easier infer the type of the value.
                */
                readonly __type__: P;
            }
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is for hinting that the type can be converted to a reference type.
            */
            interface CanRef<T> {
                /**
                 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                 * This is for taking a reference to the value.
                */
                ref(): mem.ref<T>;
            }
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is for hinting that the type can be converted to a mutable reference type.
            */
            interface CanRefMut<T> {
                /**
                 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                 * This is for taking a mutable reference to the value.
                */
                refmut(): mem.refmut<T>;
            }
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is for hinting TypeScript what type of value the holder is holding.
            */
            type HolderType = 'ref' | 'refmut' | 'owned' | 'ownedmut';
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is for hinting TypeScript what type of value the holder is holding.
            */
            interface Holder<Type extends HolderType> {
                /**
                 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                 * This is for hinting TypeScript what type of value the holder is holding.
                */
                readonly __holder__: Type;
            }
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is for hinting TypeScript what type of value the holder is holding.
            */
            type BaseHolder<Type extends HolderType, T> = T & {
                'ref': sscore.ops.Deref<T> & Holder<'ref'> & CanRef<T>;
                'refmut': sscore.ops.Deref<T> & sscore.ops.DerefMut<T> & Holder<'ref' | 'refmut'> & CanRef<T>;
                'owned': Holder<'ref' | 'owned'> & CanRef<T>;
                'ownedmut': Holder<'owned' | 'ownedmut'> & CanRef<T> & CanRefMut<T>;
            }[Type];
        }
    }

    export type bool = sscore.primitives.bool;
    export type num = sscore.primitives.num;
    export type str = sscore.primitives.str;
    export type char = sscore.primitives.char;

    export type Vec<T> = sscore.mem.Vec<T>;
    export const Vec: typeof sscore.mem.Vec;

    export type  Option<T> = sscore.eh.Option<T>;
    export const Option: typeof sscore.eh.Option;
    export type Some<T> = typeof sscore.eh.Option.Some<T>;
    export const Some: typeof sscore.eh.Option.Some;
    export const None: typeof sscore.eh.Option.None;

    export type  Result<O, E> = sscore.eh.Result<O, E>;
    export const Result: typeof sscore.eh.Result;
    export type  Ok<O, E> = typeof sscore.eh.Result.Ok<O, E>;
    export const Ok: typeof sscore.eh.Result.Ok;
    export type  Err<O, E> = typeof sscore.eh.Result.Err<O, E>;
    export const Err: typeof sscore.eh.Result.Err;

    export type  Void = void;
    export const Void: Void;


    /**
     * ## THIS IS NOT PART OF THE STANDARD LIBRARY
     * 
     * Transforms a js-native object to a SafeScript object.
     * 
     * @param i js input
     * @returns SafeScript output
    */
    function $<const P extends SSPrimitive>(i: JS2SS<P>): sscore.mem.owned<P>;
}

/**
 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
 * This is to help {@link $} function to transform js-native object to SafeScript object.
*/
type SSPrimitive = bool | num | str | char | Void |
    sscore.mem.u8 | sscore.mem.u16 | sscore.mem.u32 | sscore.mem.u64 | sscore.mem.usize |
    sscore.mem.i8 | sscore.mem.i16 | sscore.mem.i32 | sscore.mem.i64 | sscore.mem.isize |
    sscore.mem.f32 | sscore.mem.f64;

/**
 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
 * This is to help {@link $} function to transform js-native object to SafeScript object.
*/
type JS2SS<P extends SSPrimitive> =
    P extends Void ? void :
    P extends bool ? boolean :
    P extends num ? number :
    P extends str ? string :
    P extends char ? string :
    P extends sscore.mem.u8 ? number :
    P extends sscore.mem.u16 ? number :
    P extends sscore.mem.u32 ? number :
    P extends sscore.mem.u64 ? number :
    P extends sscore.mem.usize ? number :
    P extends sscore.mem.i8 ? number :
    P extends sscore.mem.i16 ? number :
    P extends sscore.mem.i32 ? number :
    P extends sscore.mem.i64 ? number :
    P extends sscore.mem.isize ? number :
    P extends sscore.mem.f32 ? number :
    P extends sscore.mem.f64 ? number :
    never;
