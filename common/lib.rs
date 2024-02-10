#![cfg_attr(not(feature = "std"), no_std)]

use ::core::{fmt, result::Result as R};

pub type Result<T = ()> = R<T, Error>;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    ParserError(parser::Error),
}

impl From<parser::Error> for Error {
    fn from(e: parser::Error) -> Self {
        Self::ParserError(e)
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::ParserError(e) => write!(f, "{}", e),
        }
    }
}

#[cfg(all(feature = "nightly", not(feature = "std")))]
impl ::core::error::Error for Error {}
#[cfg(all(not(feature = "nightly"), feature = "std"))]
impl ::std::error::Error for Error {}

pub use parser;
