/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /**
     * ## THIS IS NOT PART OF THE STANDARD LIBRARY
     * SafeScript version
    */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    export namespace sscore {
        export namespace cmp {
            export interface PartialEq<Rhs> {
                eq(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
                neq(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
            }
            export interface PartialOrd<Rhs> extends PartialEq<Rhs> {
                lt(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
                le(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
                gt(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
                ge(
                    this: mem.refLike<this>,
                    other: mem.refLike<Rhs>
                ): mem.owned<bool>;
            }
            export interface Eq<This> extends PartialEq<This> {
                /**
                 * ## THIS IS NOT PART OF THE STANDARD LIBRARY
                 * Ensures that the `this` and `That` are totally equal.
                 * 
                 * The implementation of this method should be as such:
                 * ```ts
                 * assert_total_equality(this: mem.ref<this>): mem.ref<This> {
                 *     return this;
                 * }
                 * ```
                */
                assert_total_equality(this: mem.ref<this>): mem.ref<This>;
            }
        }
    }
}
