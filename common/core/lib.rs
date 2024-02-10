//! Core Common SafeScript Functionality

#![no_std]
#![deny(missing_docs, missing_debug_implementations, unused)]

mod safe_floats;

pub use safe_floats::{sf32, sf64};
