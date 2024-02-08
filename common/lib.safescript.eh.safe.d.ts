/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    export namespace sscore {
        export namespace eh {
            /**
             * The {@link Result} type is a type that represents a value that may or may not be an error.
             * This is used all over the place in SafeScript.
             * Especially in IO operations.
             * This is one of the ways that SafeScript can guarantee safety.
             * 
             * @template O the type of the Ok value
             * @template E the type of the Err value
            */
            export interface Result<O, E> {
                /**
                 * Returns true if the result is a Ok value.
                 * 
                 * @returns {mem.owned<bool>}
                */
                isOk(this: mem.refLike<this>): mem.owned<bool>;
                /**
                 * Returns true if the result is a Err value.
                 * 
                 * @returns {mem.owned<bool>}
                */
                isErr(this: mem.refLike<this>): mem.owned<bool>;
                /**
                 * If the result is a Ok value, returns a Some value with the inner value.
                 * If the result is a Err value, returns a None value.
                 * 
                 * @returns {mem.owned<Option<O>>}
                */
                ok(this: mem.ownedLike<this>): mem.owned<Option<O>>;
                /**
                 * If the result is a Ok value, returns a None value.
                 * If the result is a Err value, returns a Some value with the inner value.
                 * 
                 * @returns {mem.owned<Option<E>>}
                */
                err(this: mem.ownedLike<this>): mem.owned<Option<E>>;
                /**
                 * Returns the inner value of the result.
                 * Panics with {@link msg} if the result is a Err value.
                 * 
                 * @panics
                 * @param {mem.owned<str>} msg
                 * @returns {mem.owned<O> | never}
                */
                expect(
                    this: mem.ownedLike<this>,
                    msg: mem.ownedLike<str>
                ): mem.owned<O> | never;
                /**
                 * Returns the inner error of the result.
                 * Panics with {@link msg} if the result is a Ok value.
                 * 
                 * @panics
                 * @param {mem.owned<str>} msg
                 * @returns {mem.owned<E> | never}
                */
                expectErr(
                    this: mem.ownedLike<this>,
                    msg: mem.ownedLike<str>
                ): mem.owned<E> | never;
                /**
                 * Returns the inner value of the result.
                 * Panics if the result is a Err value.
                 * 
                 * @panics
                 * @returns {mem.owned<O> | never}
                */
                unwrap(this: mem.ownedLike<this>): mem.owned<O> | never;
                /**
                 * Returns the inner value of the result if it is a Ok value.
                 * If the result is a Err value, returns {@link backup}.
                 * 
                 * @param {mem.owned<O>} backup
                 * @returns {mem.owned<O>}
                */
                unwrapOr(
                    this: mem.ownedLike<this>,
                    backup: mem.ownedLike<O>
                ): mem.owned<O>;
                /**
                 * Returns the inner value of the result if it is a Ok value.
                 * If the result is a Err value, invokes {@link f} with the inner value and returns the result of the invocation.
                 * 
                 * @param {() => mem.owned<O>} f
                 * @returns {mem.owned<O>}
                */
                unwrapOrElse(
                    this: mem.ownedLike<this>,
                    f: () => mem.owned<O>
                ): mem.owned<O>;
                /**
                 * If the result is a Ok value,
                 * returns a Ok value with the result of invoking {@link f} on the inner value.
                 * If the result is a Err value, returns a Err value with the inner value.
                 *
                 * @param {(ok: O) => U} f
                 * @returns {Result<U, E>}
                 * @template U the type of the new success value.
                */
                map<U>(
                    this: mem.ownedLike<this>,
                    f: (value: mem.owned<O>) => mem.owned<U>
                ): mem.owned<Result<U, E>>;
                /**
                 * If the result is a Ok value,
                 * returns a Ok value with the inner value.
                 * If the result is a Err value,
                 * returns a Err value with the result of invoking {@link f} on the inner value.
                 * 
                 * @param {(err: mem.owned<E>) => mem.owned<F>} f
                 * @returns {mem.owned<Result<O, F>>}
                 * @template F the type of the new error
                */
                mapErr<F>(
                    this: mem.ownedLike<this>,
                    f: (err: mem.owned<E>) => mem.owned<F>
                ): mem.owned<Result<O, F>>;
                /**
                 * If the result is a Ok value,
                 * returns the result of invoking {@link f} on the inner value.
                 * If the result is a Err value, returns {@link backup}.
                 * 
                 * @param {mem.owned<U>} backup
                 * @param {(ok: mem.owned<O>) => mem.owned<U>} f
                 * @returns {mem.owned<U>}
                 * @template U the type of the new success value.
                */
                mapOr<U>(
                    this: mem.ownedLike<this>,
                    backup: mem.ownedLike<U>,
                    f: (ok: mem.owned<O>) => mem.owned<U>
                ): mem.owned<U>;
                /**
                 * If the result is a Ok value,
                 * returns the result of invoking {@link f} on the inner value.
                 * If the result is a Err value, returns the result of invoking {@link backup} on the inner value.
                 * 
                 * @param {(err: mem.owned<E>) => mem.owned<U>} backup 
                 * @param {(ok: mem.owned<O>) => mem.owned<U> } f
                 * @returns {mem.owned<U>}
                 * @template U the type of the new success value.
                */
                mapOrElse<U>(
                    this: mem.ownedLike<this>,
                    backup: (err: mem.owned<E>) => mem.owned<U>,
                    f: (ok: mem.owned<O>) => mem.owned<U>
                ): mem.owned<U>;
                /**
                 * If the result is a Ok value, returns {@link other}.
                 * If the result is a Err value, returns an Err value with the inner value.
                 * 
                 * @param {mem.owned<Result<U, E>>} other
                 * @returns {mem.owned<Result<U, E>>}
                 * @template U the type of the new success value.
                */
                and<U>(
                    this: mem.ownedLike<this>,
                    other: mem.ownedLike<Result<U, E>>
                ): mem.owned<Result<U, E>>;
                /**
                 * If the result is a Ok value, returns the result of invoking {@link f} on the inner value.
                 * If the result is a Err value, returns a Err value with the inner value.
                 * 
                 * @param {(ok: mem.owned<O>) => mem.owned<Result<U, E>>} f
                 * @template U the type of the new success value.
                */
                andThen<U>(
                    this: mem.ownedLike<this>,
                    f: (ok: mem.owned<O>) => mem.owned<Result<U, E>>
                ): mem.owned<Result<U, E>>;
                /**
                 * If the result is a Ok value, returns the result.
                 * If the result is a Err value, returns {@link other}.
                 * 
                 * @param {mem.owned<Result<O, F>>} other
                 * @returns {mem.owned<Result<O, F>>}
                */
                or<F>(
                    this: mem.ownedLike<this>,
                    other: mem.ownedLike<Result<O, F>>
                ): mem.owned<Result<O, F>>;
                /**
                 * If the result is a Ok value, returns the result.
                 * If the result is a Err value,
                 * returns the result of invoking {@link f} on the inner value.
                 * 
                 * @param {(err: mem.owned<E>) => mem.owned<Result<O, F>>} f
                */
                orElse<F>(
                    this: mem.ownedLike<this>,
                    f: (err: mem.owned<E>) => mem.owned<Result<O, F>>
                ): mem.owned<Result<O, F>>;
            }
            export namespace Result {
                /**
                 * A simple wrapper to create a new {@link Result}
                 * 
                 * @param {O} value successful value
                 * @returns {Result<O,E>} the result
                */
                export function Ok<O, E>(
                    value: mem.ownedLike<O>
                ): mem.owned<Result<O, E>>;
        
                /**
                 * A simple wrapper to create a new {@link Result}
                 * 
                 * @param {E} err error value
                 * @returns {Result<O,E>} the result
                */
                export function Err<O, E>(
                    err: mem.ownedLike<E>
                ): mem.owned<Result<O, E>>;
            }
            export interface Option<T> extends
                fmt.Debug, fmt.Display
            {
                /**
                 * Returns true if the option is a Some value.
                 * 
                 * @returns {mem.owned<bool>}
                */
                isSome(this: mem.refLike<this>): mem.owned<bool>;
                /**
                 * Returns true if the option is a None value.
                 * 
                 * @returns {mem.owned<booo>}
                */
                isNone(this: mem.refLike<this>): mem.owned<bool>;
                /**
                 * Returns the inner value of the option.
                 * Panics with `msg` if the option is a None value.
                 * 
                 * @panics
                 * @param {mem.owned<str>} msg
                 * @returns {mem.owned<T> | never}
                */
                expect(
                    this: mem.ownedLike<this>,
                    msg: mem.ownedLike<str>
                ): mem.owned<T> | never;
                /**
                 * Returns the inner value of the option.
                 * Panics if the option is a None value.
                 * 
                 * @panics
                 * @returns {mem.owned<T> | never}
                */
                unwrap(this: mem.ownedLike<this>): mem.owned<T> | never;
                /**
                 * Returns the inner value of the option.
                 * If the option is a None value, returns `backup`.
                 * 
                 * @param {mem.owned<T>} backup
                 * @returns {mem.owned<T>}
                */
                unwrapOr(
                    this: mem.ownedLike<this>,
                    backup: mem.ownedLike<T>
                ): mem.owned<T>;
                /**
                 * Returns the inner value of the option.
                 * If the option is a None value,
                 * invokes {@link f} and returns the result of the invocation.
                 * 
                 * @param {() => mem.owned<T>} f
                 * @returns {mem.owned<T>}
                */
                unwrapOrElse(
                    this: mem.ownedLike<this>,
                    f: () => mem.owned<T>
                ): mem.owned<T>;
                /**
                 * If the option is a Some value,
                 * returns a Some value with the result of invoking {@link f} on the inner value.
                 * If the option is a None value, returns a None value.
                 * 
                 * @param {(value: mem.owned<T>) => mem.owned<U>} f
                 * @returns {mem.owned<Option<U>>}
                 * @template U the type of the new value.
                */
                map<U>(
                    this: mem.ownedLike<this>,
                    f: (value: mem.owned<T>) => mem.owned<U>
                ): mem.owned<Option<U>>;
                /**
                 * If the option is a Some value,
                 * returns the result of invoking {@link f} on the inner value.
                 * If the option is a None value, returns {@link backup}.
                 * 
                 * @param {mem.owned<U>} backup
                 * @param {(value: mem.owned<T>) => mem.owned<U>} f
                 * @returns {mem.owned<U>}
                 * @template U the type of the new value.
                */
                mapOr<U>(
                    this: mem.ownedLike<this>,
                    backup: mem.ownedLike<U>,
                    f: (value: mem.owned<T>) => mem.owned<U>
                ): mem.owned<U>;
                /**
                 * If the option is a Some value,
                 * returns the result of invoking {@link f} on the inner value.
                 * If the option is a None value,
                 * returns the result of invoking {@link backup}.
                 *  
                 * @param {() => mem.owned<U>} backup
                 * @param {(value: mem.owned<T>) => mem.owned<U>} f
                 * @returns {mem.owned<U>}
                 * @template U the type of the new value.
                */
                mapOrElse<U>(
                    this: mem.ownedLike<this>,
                    backup: () => mem.owned<U>,
                    f: (value: mem.owned<T>) => mem.owned<U>
                ): mem.owned<U>;
                /**
                 * If the option is a Some value,
                 * returns a Ok value with the inner value.
                 * If the option is a None value, returns a Err value with {@link err}.
                 * 
                 * @param {mem.owned<E>} err
                 * @returns {mem.owned<Result<T, E>>} 
                 * @template E the type of the new error.
                */
                okOr<E>(
                    this: mem.ownedLike<this>,
                    err: mem.ownedLike<E>
                ): mem.owned<Result<T, E>>;
                /**
                 * If the option is a Some value,
                 * returns an Ok value with the inner value.
                 * If the option is a None value,
                 * returns a Err value with the result of invoking {@link f}.
                 *
                 * @param {() => mem.owned<E>} f
                 * @returns {mem.owned<Result<T, E>>}
                 * @template E the type of the new error.
                */
                okOrElse<E>(
                    this: mem.ownedLike<this>,
                    err: () => mem.owned<E>
                ): mem.owned<Result<T, E>>;
                /**
                 * If the option is a Some value, returns {@link other}.
                 * If the option is a None value, returns a None value.
                 * 
                 * @param {mem.owned<Option<U>>} other
                 * @returns {mem.owned<Option<U>>}
                 * @template U the type of the new value.
                */
                and<U>(
                    this: mem.ownedLike<this>,
                    other: mem.ownedLike<Option<U>>
                ): mem.owned<Option<U>>;
                /**
                 * If the option is a Some value,
                 * returns the result of invoking {@link f} on the inner value.
                 * If the option is a None value, returns a None value.
                 * 
                 * @param {(value: mem.owned<T>) => mem.owned<Option<U>>} f
                 * @returns {mem.owned<Option<U>>}
                 * @template U the type of the new value.
                */
                andThen<U>(
                    this: mem.ownedLike<this>,
                    f: (value: mem.owned<T>) => mem.owned<Option<U>>
                ): mem.owned<Option<U>>;
                /**
                 * If the option is a Some value, returns the option.
                 * If the option is a None value, returns {@link other}.
                 * 
                 * @param {mem.owned<Option<T>>} other
                 * @returns {mem.owned<Option<T>>}
                */
                or(
                    this: mem.ownedLike<this>,
                    other: mem.ownedLike<Option<T>>
                ): mem.owned<Option<T>>;
                /**
                 * If the option is a Some value, returns the option.
                 * If the option is a None value,returns the result of invoking {@link f}.
                 * 
                 * @param {() => mem.owned<Option<T>>} f
                 * @returns {mem.owned<Option<T>>}
                */
                orElse(
                    this: mem.ownedLike<this>,
                    f: () => mem.ownedLike<Option<T>>
                ): mem.owned<Option<T>>;
                /**
                 * If the option is a Some value, returns a None value.
                 * If the option is a None value, returns {@link other}.
                 * 
                 * @param {mem.owned<Option<T>>} other
                 * @returns {mem.owned<Option<T>>}
                */
                xor(
                    this: mem.ownedLike<this>,
                    other: mem.ownedLike<Option<T>>
                ): mem.owned<Option<T>>;
                /**
                 * If the option is a Some value,
                 * and invoking {@link f} on the inner value returns true, returns the option.
                 * Otherwise, returns a None value.
                 * 
                 * @param {(value: mem.owned<T>) => mem.owned<bool>} f
                 * @returns {mem.owned<Option<T>>}
                */
                filter(
                    this: mem.ownedLike<this>,
                    f: (value: mem.owned<T>) => mem.owned<bool>
                ): mem.owned<Option<T>>;
            }
            export namespace Option {
                export function Some<T>(
                    value: mem.ownedLike<T>
                ): mem.owned<Option<T>>;

                //deno-lint-ignore no-explicit-any
                export const None: mem.owned<Option<any>>;
            }
            /**
             * The {@link Error} is a trait that all error types should implement.
             * Implementing this trait allows for better error handling and interoperability.
             * And allows for the use of short-circuiting early returns.
             * 
             * Example:
             * 
             * ```rust
             * function read_file(path: str) -> Result<str, FileError> {
             *     // Code here...
             * }
             * 

             * function main() -> Result<(), dyn Error> {
             * let contents = read_file("file.txt")?;
             * // With the Error trait, we can use the ? operator to short-circuit early returns.
             * // Otherwise, we would have to do this:
             * // let contents = match read_file("file.txt") {
             * //     Ok(contents) => contents,
             * //     Err(err) => return Err(err),
             * // };
             * }
             * ```
            */
            export interface Error extends fmt.Debug, fmt.Display {
                /**
                 * Returns the underlying cause of this error, if any.
                 * (If the error is a wrapper around another error, this method should return the underlying error.)
                 * Should default to `None`.
                 * 
                 * @returns {mem.owned<Option<mem.ref<Error>>>}
                */
                source(): mem.owned<Option<mem.ref<Error>>>;
            }

            export function panic(msg: mem.ownedLike<str>): never;
        }
    }
}
