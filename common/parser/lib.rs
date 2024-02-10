#![cfg_attr(not(feature = "std"), no_std)]

extern crate alloc;
use alloc::{
    string::String,
    vec::Vec,
};
use ::core::iter::Peekable;
use ::core::str::FromStr;
use ::core::str::Chars;

use ::core::result::Result as R;
pub type Result<T = (), E = Error> = R<T, E>;

mod parser;
mod tokens;
mod impls;

pub use impls::ToParseParams;
pub use tokens::*;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    SyntaxError(String),
    UnexpectedCharacter(char),
    LongCharLiteral,
    EndOfFile,
    FailedToParseNumber,
    FailedToParseKeyword,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TokenStream<'a>(Vec<Token<'a>>);

pub struct ParseParams<'a> {
    code: &'a str,
    file_name: &'a str
}

pub(crate) struct Parser<'a> {
    pub(crate) tokens: Vec<Token<'a>>,
    pub(crate) file_name: &'a str,
    pub(crate) line_number: u32,
    pub(crate) in_comment: u8,
}

pub fn parse<'a, T: ToParseParams<'a>>(input: T) -> Result<TokenStream<'a>> {
    let params = input.to_parse_params();
    let mut parser = Parser {
        file_name: params.file_name,
        tokens: Vec::new(),
        line_number: 1,
        in_comment: 0,
    };
    for line in params.code.lines().peekable() {
        parser.line_number += 1;
        parser.in_comment = 0;
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        parser.parse(line.chars().peekable())?;
    }
    Ok(TokenStream(parser.tokens))
}

#[cfg(all(feature = "nightly", not(feature = "std")))]
impl ::core::error::Error for Error {}
#[cfg(all(not(feature = "nightly"), feature = "std"))]
impl ::std::error::Error for Error {}
