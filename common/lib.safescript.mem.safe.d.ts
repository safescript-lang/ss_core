/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

type NumConverter = 
    sscore.mem.u8 | sscore.mem.u16 | sscore.mem.u32 | sscore.mem.u64 | sscore.mem.usize |
    sscore.mem.i8 | sscore.mem.i16 | sscore.mem.i32 | sscore.mem.i64 | sscore.mem.isize |
    sscore.mem.f32 | sscore.mem.f64 | num;

type BitSize = 1 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 'auto';

declare global {
    export namespace sscore {
        export namespace mem {
            export namespace markers {
                export interface Sized {
                    readonly __marker_sized__: true;
                }
                export interface Send {
                    /**
                     * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                     * This is for hinting TypeScript that the value can be sent to another thread.
                    */
                    readonly __marker_send__: true;
                }
                export interface Sync {
                    /**
                     * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                     * This is for hinting TypeScript that the value can be shared between threads.
                    */
                    readonly __marker_sync__: true;
                }
            }

            export namespace Error {
                export type  OutOfMemory = 'OutOfMemory';
                export const OutOfMemory: OutOfMemory;
                export type  InvalidPointer = 'InvalidPointer';
                export const InvalidPointer: InvalidPointer;
                export type  InvalidSize = 'InvalidSize';
                export const InvalidSize: InvalidSize;
                export type  InvalidAlignment = 'InvalidAlignment';
                export const InvalidAlignment: InvalidAlignment;
                export type  BitConversionError = 'BitConversionError';
                export const BitConversionError: BitConversionError;
            }
            export type Error = eh.Error & (
                Error.OutOfMemory | Error.InvalidPointer |
                Error.InvalidSize | Error.InvalidAlignment | Error.BitConversionError
            )
            
            export type Result<T> = sscore.eh.Result<T, sscore.mem.Error>;

            export type ref<T> = __safescript_internals__.BaseHolder<'ref', T>;
            export type refmut<T> = __safescript_internals__.BaseHolder<'refmut', T>;
            export type owned<T> = __safescript_internals__.BaseHolder<'owned', T>;
            export type ownedmut<T> = __safescript_internals__.BaseHolder<'ownedmut', T>;

            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is used to help TypeScript easier cast the value to a reference type.
            */
            type refLike<T> = mem.ref<T> | mem.refmut<T> | mem.owned<T> | mem.ownedmut<T>;
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is used to help TypeScript easier cast the value to a mutable reference type.
            */
            type refmutLike<T> = mem.refmut<T> | mem.ownedmut<T>;
            /**
             * ## THIS IS NOT PART OF THE STANDARD LIBRARY
             * This is used to help TypeScript easier cast the value to an owned type.
            */
            type ownedLike<T> = mem.owned<T> | mem.ownedmut<T>;

            /** The 8-bit unsigned integer type. */
            export interface u8 extends __safescript_internals__.Primitive<'u8'>,
                ops.Add<u8, u8>, ops.AddAssign<u8>,
                ops.BitAnd<u8, u8>, ops.BitAndAssign<u8>,
                ops.BitOr<u8, u8>, ops.BitOrAssign<u8>,
                ops.BitXor<u8, u8>, ops.BitXorAssign<u8>,
                ops.Deref<u8>, ops.DerefMut<u8>,
                ops.Div<u8, u8>, ops.DivAssign<u8>,
                ops.Mul<u8, u8>, ops.MulAssign<u8>,
                ops.Neg<i8>,
                ops.Not<u8>,
                ops.Rem<u8, u8>, ops.RemAssign<u8>,
                ops.Shl<u8, u8>, ops.ShlAssign<u8>,
                ops.Shr<u8, u8>, ops.ShrAssign<u8>,
                ops.Sub<u8, u8>, ops.SubAssign<u8>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<u16, Error>,
                convert.TryFrom<u32, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i8, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,
                convert.From<u8>,
                convert.From<char>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export namespace u8 {
                export function tryFrom(value: num): Result<u8>;
                export function tryFrom(value: u16): Result<u8>;
                export function tryFrom(value: u32): Result<u8>;
                export function tryFrom(value: u64): Result<u8>;
                export function tryFrom(value: usize): Result<u8>;
                export function tryFrom(value: i8): Result<u8>;
                export function tryFrom(value: i16): Result<u8>;
                export function tryFrom(value: i32): Result<u8>;
                export function tryFrom(value: i64): Result<u8>;
                export function tryFrom(value: isize): Result<u8>;
                export function tryFrom(value: f32): Result<u8>;
                export function tryFrom(value: f64): Result<u8>;
                export function from(value: u8): u8;
                export function from(value: char): u8;
                export const MAX: u8;
                export const MIN: u8;
                export const BITS: u16;
            }
            export interface u16 extends __safescript_internals__.Primitive<'u16'>,
                ops.Add<u8 | u16, u16>, ops.AddAssign<u8 | u16>,
                ops.BitAnd<u8 | u16, u16>, ops.BitAndAssign<u8 | u16>,
                ops.BitOr<u8 | u16, u16>, ops.BitOrAssign<u8 | u16>,
                ops.BitXor<u8 | u16, u16>, ops.BitXorAssign<u16>,
                ops.Deref<u16>, ops.DerefMut<u16>,
                ops.Div<u8 | u16, u16>, ops.DivAssign<u8 | u16>,
                ops.Mul<u8 | u16, u16>, ops.MulAssign<u8 | u16>,
                ops.Neg<i16>,
                ops.Not<u16>,
                ops.Rem<u8 | u16, u16>, ops.RemAssign<u8 | u16>,
                ops.Shl<u8 | u16, u16>, ops.ShlAssign<u8 | u16>,
                ops.Shr<u8 | u16, u16>, ops.ShrAssign<u8 | u16>,
                ops.Sub<u8 | u16, u16>, ops.SubAssign<u8 | u16>,

                convert.From<u8>,
                convert.From<u16>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<u32, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i8, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export namespace u16 {
                export const MAX: u16;
                export const MIN: u16;
                export const BITS: u16;
                export const EIGHT: u16;
                export const SIXTEEN: u16;
                export const THIRTY_TWO: u16;
                export const SIXTY_FOUR: u16;
            }
            export interface u32 extends __safescript_internals__.Primitive<'u32'>,
                ops.Add<u8 | u16 | u32, u32>, ops.AddAssign<u8 | u16 | u32>,
                ops.BitAnd<u8 | u16 | u32, u32>, ops.BitAndAssign<u8 | u16 | u32>,
                ops.BitOr<u8 | u16 | u32, u32>, ops.BitOrAssign<u8 | u16 | u32>,
                ops.BitXor<u8 | u16 | u32, u32>, ops.BitXorAssign<u32>,
                ops.Deref<u32>, ops.DerefMut<u32>,
                ops.Div<u8 | u16 | u32, u32>, ops.DivAssign<u8 | u16 | u32>,
                ops.Mul<u8 | u16 | u32, u32>, ops.MulAssign<u8 | u16 | u32>,
                ops.Neg<i32>,
                ops.Not<u32>,
                ops.Rem<u8 | u16 | u32, u32>, ops.RemAssign<u8 | u16 | u32>,
                ops.Shl<u8 | u16 | u32, u32>, ops.ShlAssign<u8 | u16 | u32>,
                ops.Shr<u8 | u16 | u32, u32>, ops.ShrAssign<u8 | u16 | u32>,
                ops.Sub<u8 | u16 | u32, u32>, ops.SubAssign<u8 | u16 | u32>,

                convert.From<u8>,
                convert.From<u16>,
                convert.From<u32>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i8, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface u64 extends __safescript_internals__.Primitive<'u64'>,
                ops.Add<u8 | u16 | u32 | u64, u64>, ops.AddAssign<u8 | u16 | u32 | u64>,
                ops.BitAnd<u8 | u16 | u32 | u64, u64>, ops.BitAndAssign<u8 | u16 | u32 | u64>,
                ops.BitOr<u8 | u16 | u32 | u64, u64>, ops.BitOrAssign<u8 | u16 | u32 | u64>,
                ops.BitXor<u8 | u16 | u32 | u64, u64>, ops.BitXorAssign<u64>,
                ops.Deref<u64>, ops.DerefMut<u64>,
                ops.Div<u8 | u16 | u32 | u64, u64>, ops.DivAssign<u8 | u16 | u32 | u64>,
                ops.Mul<u8 | u16 | u32 | u64, u64>, ops.MulAssign<u8 | u16 | u32 | u64>,
                ops.Neg<i64>,
                ops.Not<u64>,
                ops.Rem<u8 | u16 | u32 | u64, u64>, ops.RemAssign<u8 | u16 | u32 | u64>,
                ops.Shl<u8 | u16 | u32 | u64, u64>, ops.ShlAssign<u8 | u16 | u32 | u64>,
                ops.Shr<u8 | u16 | u32 | u64, u64>, ops.ShrAssign<u8 | u16 | u32 | u64>,
                ops.Sub<u8 | u16 | u32 | u64, u64>, ops.SubAssign<u8 | u16 | u32 | u64>,

                convert.From<u8>,
                convert.From<u16>,
                convert.From<u32>,
                convert.From<u64>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i8, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,
                
                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface usize extends __safescript_internals__.Primitive<'usize'>,
                ops.Add<u8 | u16 | u32 | u64 | usize, usize>, ops.AddAssign<u8 | u16 | u32 | u64 | usize>,
                ops.BitAnd<u8 | u16 | u32 | u64 | usize, usize>, ops.BitAndAssign<u8 | u16 | u32 | u64 | usize>,
                ops.BitOr<u8 | u16 | u32 | u64 | usize, usize>, ops.BitOrAssign<u8 | u16 | u32 | u64 | usize>,
                ops.BitXor<u8 | u16 | u32 | u64 | usize, usize>, ops.BitXorAssign<usize>,
                ops.Deref<usize>, ops.DerefMut<usize>,
                ops.Div<u8 | u16 | u32 | u64 | usize, usize>, ops.DivAssign<u8 | u16 | u32 | u64 | usize>,
                ops.Mul<u8 | u16 | u32 | u64 | usize, usize>, ops.MulAssign<u8 | u16 | u32 | u64 | usize>,
                ops.Neg<isize>,
                ops.Not<usize>,
                ops.Rem<u8 | u16 | u32 | u64 | usize, usize>, ops.RemAssign<u8 | u16 | u32 | u64 | usize>,
                ops.Shl<u8 | u16 | u32 | u64 | usize, usize>, ops.ShlAssign<u8 | u16 | u32 | u64 | usize>,
                ops.Shr<u8 | u16 | u32 | u64 | usize, usize>, ops.ShrAssign<u8 | u16 | u32 | u64 | usize>,
                ops.Sub<u8 | u16 | u32 | u64 | usize, usize>, ops.SubAssign<u8 | u16 | u32 | u64 | usize>,

                convert.From<u8>,
                convert.From<u16>,
                convert.From<u32>,
                convert.From<u64>,
                convert.From<usize>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<i8, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface i8 extends __safescript_internals__.Primitive<'i8'>,
                ops.Add<u8 | i8, i8>, ops.AddAssign<u8 | i8>,
                ops.BitAnd<u8 | i8, i8>, ops.BitAndAssign<u8 | i8>,
                ops.BitOr<u8 | i8, i8>, ops.BitOrAssign<u8 | i8>,
                ops.BitXor<u8 | i8, i8>, ops.BitXorAssign<i8>,
                ops.Deref<i8>, ops.DerefMut<i8>,
                ops.Div<u8 | i8, i8>, ops.DivAssign<u8 | i8>,
                ops.Mul<u8 | i8, i8>, ops.MulAssign<u8 | i8>,
                ops.Neg<i8>,
                ops.Not<i8>,
                ops.Rem<u8 | i8, i8>, ops.RemAssign<u8 | i8>,
                ops.Shl<u8 | i8, i8>, ops.ShlAssign<u8 | i8>,
                ops.Shr<u8 | i8, i8>, ops.ShrAssign<u8 | i8>,
                ops.Sub<u8 | i8, i8>, ops.SubAssign<u8 | i8>,

                convert.From<i8>,

                convert.TryFrom<num, Error>,
                convert.TryFrom<u8, Error>,
                convert.TryFrom<u16, Error>,
                convert.TryFrom<u32, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i16, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface i16 extends __safescript_internals__.Primitive<'i16'>,
                ops.Add<u8 | i8 | u16 | i16, i16>, ops.AddAssign<u8 | i8 | u16 | i16>,
                ops.BitAnd<u8 | i8 | u16 | i16, i16>, ops.BitAndAssign<u8 | i8 | u16 | i16>,
                ops.BitOr<u8 | i8 | u16 | i16, i16>, ops.BitOrAssign<u8 | i8 | u16 | i16>,
                ops.BitXor<u8 | i8 | u16 | i16, i16>, ops.BitXorAssign<i16>,
                ops.Deref<i16>, ops.DerefMut<i16>,
                ops.Div<u8 | i8 | u16 | i16, i16>, ops.DivAssign<u8 | i8 | u16 | i16>,
                ops.Mul<u8 | i8 | u16 | i16, i16>, ops.MulAssign<u8 | i8 | u16 | i16>,
                ops.Neg<i16>,
                ops.Not<i16>,
                ops.Rem<u8 | i8 | u16 | i16, i16>, ops.RemAssign<u8 | i8 | u16 | i16>,
                ops.Shl<u8 | i8 | u16 | i16, i16>, ops.ShlAssign<u8 | i8 | u16 | i16>,
                ops.Shr<u8 | i8 | u16 | i16, i16>, ops.ShrAssign<u8 | i8 | u16 | i16>,
                ops.Sub<u8 | i8 | u16 | i16, i16>, ops.SubAssign<u8 | i8 | u16 | i16>,

                convert.From<i8>,
                convert.From<i16>,
                convert.From<u8>, // We can guarantee that the value is within the range of i16

                convert.TryFrom<num, Error>,
                convert.TryFrom<u32, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i32, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,
                
                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface i32 extends __safescript_internals__.Primitive<'i32'>,
                ops.Add<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.AddAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.BitAnd<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.BitAndAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.BitOr<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.BitOrAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.BitXor<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.BitXorAssign<i32>,
                ops.Deref<i32>, ops.DerefMut<i32>,
                ops.Div<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.DivAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.Mul<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.MulAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.Neg<i32>,
                ops.Not<i32>,
                ops.Rem<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.RemAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.Shl<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.ShlAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.Shr<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.ShrAssign<u8 | i8 | u16 | i16 | u32 | i32>,
                ops.Sub<u8 | i8 | u16 | i16 | u32 | i32, i32>, ops.SubAssign<u8 | i8 | u16 | i16 | u32 | i32>,

                convert.From<i8>,
                convert.From<i16>,
                convert.From<i32>,
                convert.From<u8>, // We can guarantee that the value is within the range of i32
                convert.From<u16>, // We can guarantee that the value is within the range of i32

                convert.TryFrom<num, Error>,
                convert.TryFrom<u64, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<i64, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface i64 extends __safescript_internals__.Primitive<'i64'>,
                ops.Add<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.AddAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.BitAnd<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.BitAndAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.BitOr<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.BitOrAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.BitXor<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.BitXorAssign<i64>,
                ops.Deref<i64>, ops.DerefMut<i64>,
                ops.Div<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.DivAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.Mul<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.MulAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.Neg<i64>,
                ops.Not<i64>,
                ops.Rem<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.RemAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.Shl<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.ShlAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.Shr<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.ShrAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,
                ops.Sub<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64, i64>, ops.SubAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64>,

                convert.From<i8>,
                convert.From<i16>,
                convert.From<i32>,
                convert.From<i64>,
                convert.From<u8>, // We can guarantee that the value is within the range of i64
                convert.From<u16>, // We can guarantee that the value is within the range of i64
                convert.From<u32>, // We can guarantee that the value is within the range of i64

                convert.TryFrom<num, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<isize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,
                
                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface isize extends __safescript_internals__.Primitive<'isize'>,
                ops.Add<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.AddAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.BitAnd<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.BitAndAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.BitOr<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.BitOrAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.BitXor<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.BitXorAssign<isize>,
                ops.Deref<isize>, ops.DerefMut<isize>,
                ops.Div<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.DivAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.Mul<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.MulAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.Neg<isize>,
                ops.Not<isize>,
                ops.Rem<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.RemAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.Shl<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.ShlAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.Shr<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.ShrAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,
                ops.Sub<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize, isize>, ops.SubAssign<u8 | i8 | u16 | i16 | u32 | i32 | u64 | i64 | usize | isize>,

                convert.From<i8>,
                convert.From<i16>,
                convert.From<i32>,
                convert.From<i64>,
                convert.From<isize>,
                convert.From<u8>, // We can guarantee that the value is within the range of isize
                convert.From<u16>, // We can guarantee that the value is within the range of isize
                convert.From<u32>, // We can guarantee that the value is within the range of isize
                convert.From<u64>, // We can guarantee that the value is within the range of isize
                
                convert.TryFrom<num, Error>,
                convert.TryFrom<usize, Error>,
                convert.TryFrom<f32, Error>,
                convert.TryFrom<f64, Error>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export type BitPrecisionLossError = 'BitPrecisionLossError';
            export interface f32 extends __safescript_internals__.Primitive<'f32'>,
                ops.Add<f32, f32>, ops.AddAssign<f32>,
                ops.Deref<f32>, ops.DerefMut<f32>,
                ops.Div<f32, f32>, ops.DivAssign<f32>,
                ops.Mul<f32, f32>, ops.MulAssign<f32>,
                ops.Neg<f32>,
                ops.Rem<f32, f32>, ops.RemAssign<f32>,
                ops.Sub<f32, f32>, ops.SubAssign<f32>,

                convert.From<u8>, // We can guarantee that the value is within the range of f32
                convert.From<u16>, // We can guarantee that the value is within the range of f32
                convert.From<u32>, // We can guarantee that the value is within the range of f32
                convert.From<u64>, // We can guarantee that the value is within the range of f32
                convert.From<usize>, // We can guarantee that the value is within the range of f32
                convert.From<i8>, // We can guarantee that the value is within the range of f32
                convert.From<i16>, // We can guarantee that the value is within the range of f32
                convert.From<i32>, // We can guarantee that the value is within the range of f32
                convert.From<i64>, // We can guarantee that the value is within the range of f32
                convert.From<isize>, // We can guarantee that the value is within the range of f32
                convert.From<f32>,
                convert.TryFrom<f64, BitPrecisionLossError>,

                convert.Into<NumConverter>,

                markers.Send, markers.Sync,
                markers.Sized
            { }
            export interface f64 extends __safescript_internals__.Primitive<'f64'> {
                // readonly __type__: 'f64';
            }
            export interface Drop {
                drop(this: ownedLike<this>): void;
            }
            /**
             * The Typescript representation of SafeScript's `Vec` struct.
             * 
             * It is similar to Rust's `Vec` struct.
             * 
             * It is a growable array type, represented as a pointer to a heap-allocated array.
             * @template T the type of the elements
            */
            export interface Vec<T> extends
                ops.Index<usize, T>,
                ops.IndexMut<usize, T>,
                fmt.Debug
            {
                push(this: refLike<this>, value: ownedLike<T>): void;
                pop(this: refmutLike<this>): owned<Option<T>>;
                remove(this: refmutLike<this>, index: ownedLike<num>): owned<Option<T>>;
                get(this: refLike<this>, index: ownedLike<num>): owned<Option<ref<T>>>;
            }
            export namespace Vec {
                export function empty<T>(): Vec<T>;
                export function with_capacity<T>(capacity: num): Vec<T>;
            }

            export function drop<T>(value: ownedLike<T>): void;
        }
    }
}
