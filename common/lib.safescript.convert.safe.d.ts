/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    export namespace sscore {
        export namespace convert {
            /**
             * @TRAIT
             * @SIGNATURE
             * ```rs
             * pub trait From<T>: Sized {
             *     fn from(value: T) -> Self;
             * }
             * ```
            */
            // deno-lint-ignore no-empty-interface
            export interface From<T> extends mem.markers.Sized { }
            // If A implements From<B>, then B automatically implements Into<A>
            /**
             * @TRAIT
             * @SIGNATURE
             * ```rs
             * pub trait TryFrom<T>: Sized {
             *     type Error;
             *     fn tryFrom(value: T) -> Result<Self, Self::Error>;
             * }
             * ```
            */
            //deno-lint-ignore no-empty-interface
            export interface TryFrom<T, Error> extends mem.markers.Sized { }
            /**
             * @TRAIT
             * @SIGNATURE
             * ```rs
             * pub trait Into<T>: Sized {
             *     fn into(self) -> T;
             * }
             * ```
            */
            export interface Into<Posibilities> extends mem.markers.Sized {
                into<T extends Posibilities>(this: mem.ownedLike<this>): T;
            }
            /**
             * @TRAIT
            */
            export interface TryInto<T, Error> extends mem.markers.Sized {
                tryInto(this: mem.ownedLike<this>): Result<T, Error>;
            }
        }
    }
}
