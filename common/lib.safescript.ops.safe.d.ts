/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    export namespace sscore {
        export namespace ops {
            export interface Add<Rhs, Output> {
                add(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface AddAssign<Rhs> {
                addAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface BitAnd<Rhs, Output> {
                bitAnd(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface BitAndAssign<Rhs> {
                bitAndAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface BitOr<Rhs, Output> {
                bitOr(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface BitOrAssign<Rhs> {
                bitOrAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface BitXor<Rhs, Output> {
                bitXor(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface BitXorAssign<Rhs> {
                bitXorAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Deref<Target> {
                deref(
                    this: mem.refLike<this>
                ): mem.ref<Target>;
            }
            export interface DerefMut<Target> {
                derefMut(
                    this: mem.refmutLike<this>
                ): mem.refmut<Target>;
            }
            export interface Div<Rhs, Output> {
                div(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface DivAssign<Rhs> {
                divAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Index<Idx, Output> {
                index(
                    this: mem.refLike<this>,
                    idx: mem.ownedLike<Idx>
                ): mem.ref<Output>;
            }
            export interface IndexMut<Idx, Output> {
                indexMut(
                    this: mem.refmutLike<this>,
                    idx: mem.ownedLike<Idx>
                ): mem.refmut<Output>;
            }
            export interface Mul<Rhs, Output> {
                mul(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface MulAssign<Rhs> {
                mulAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Neg<Output> {
                neg(
                    this: mem.ownedLike<this>
                ): mem.owned<Output>;
            }
            export interface Not<Output> {
                not(
                    this: mem.ownedLike<this>
                ): mem.owned<Output>;
            }
            export interface Rem<Rhs, Output> {
                rem(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface RemAssign<Rhs> {
                remAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Shl<Rhs, Output> {
                shl(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface ShlAssign<Rhs> {
                shlAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Shr<Rhs, Output> {
                shr(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface ShrAssign<Rhs> {
                shrAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Sub<Rhs, Output> {
                sub(
                    this: mem.ownedLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): mem.owned<Output>;
            }
            export interface SubAssign<Rhs> {
                subAssign(
                    this: mem.refmutLike<this>,
                    rhs: mem.ownedLike<Rhs>
                ): void;
            }
            export interface Fn<Args, Output> {
                call(
                    this: mem.refLike<this>,
                    args: mem.ownedLike<Args>
                ): mem.owned<Output>;
            }
        }
    }
}
