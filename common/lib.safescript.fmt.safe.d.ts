/// <reference no-default-lib="true"/>

/** ## THIS IS NOT PART OF THE STANDARD LIBRARY */
export interface __safescript_internals__ {
    /** SafeScript version */
    readonly __version__: 'v0.0.1-dev';
}

declare global {
    export namespace sscore {
        export namespace fmt {
            export interface Formatter {

            }
            export interface Display {
                dsp(this: mem.refLike<this>, f: mem.refmutLike<Formatter>): void;
            }
            export interface Debug {
                dbg(this: mem.refLike<this>, f: mem.refmutLike<Formatter>): void;
            }
            export function log(value: Display): void;
        }
    }
}
