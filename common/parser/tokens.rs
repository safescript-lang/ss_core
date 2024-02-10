use crate::String;

#[path = "safe_floats.rs"]
mod safe_floats;
pub use safe_floats::{Safe32, Safe64};

pub use rubbernum::rubbernum;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TokenType {
    KeyWord(KeyWord),
    Identifier(String),
    Literal(Literal),
    Symbol(Symbol),

    /// This is a special token that represents a non-defined token.
    Undefined,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum KeyWord {
    Let,
    Const,
    If,
    Else,
    While,
    For,
    Loop,
    Break,
    Continue,
    Return,
    Function,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Symbol {
    /// `(`
    OpenParen,
    /// `)`
    CloseParen,
    /// `{`
    OpenBrace,
    /// `}`
    CloseBrace,
    /// `[`
    OpenBracket,
    /// `]`
    CloseBracket,
    /// `,`
    Comma,
    /// `.`
    Dot,
    /// `;`
    Semicolon,
    /// `:`
    Colon,
    /// `=`
    Equal,
    /// `>`
    LeftToRightArrow,
    /// `<`
    RightToLeftArrow,
    /// `+`
    Plus,
    /// `-`
    Minus,
    /// `*`
    Star,
    /// `/`
    Slash,
    /// `%`
    Percent,
    /// `&`
    Ampersand,
    /// `|`
    Pipe,
    /// `!`
    Bang,
    /// `?`
    Question,
    /// `~`
    Tilde,
    /// `'`
    Quote,
    /// `"`
    DoubleQuote,
    /// `\n`
    /// 
    /// This is a special symbol that represents a new line.
    /// It is used to help parsing comments and strings.
    NewLine,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Literal {
    String(String),
    Number(NumberLiteral),
    Boolean(bool),
    Character(char),
    Void,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum NumberLiteral {
    Standard(rubbernum),
    U8(u8),
    U16(u16),
    U32(u32),
    U64(u64),
    U128(u128),
    Usize(usize),
    I8(i8),
    I16(i16),
    I32(i32),
    I64(i64),
    I128(i128),
    Isize(isize),
    F32(Safe32),
    F64(Safe64),
    Infinity,
    NaN,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Token<'a> {
    pub(crate) token_type: TokenType,
    pub(crate) file_name: &'a str,
    pub(crate) line_number: u32,
}

#[macro_export(local_inner_macros)]
macro_rules! Token {
    () => ($crate::tokens::TokenType::Undefined);
    [,] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Comma));
    [.] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Dot));
    [;] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Semicolon));
    [:] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Colon));
    [=] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Equal));
    [>] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::LeftToRightArrow));
    [<] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::RightToLeftArrow));
    [+] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Plus));
    [-] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Minus));
    [*] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Star));
    [/] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Slash));
    [%] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Percent));
    [&] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Ampersand));
    [|] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Pipe));
    [!] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Bang));
    [?] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Question));
    [~] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Tilde));
    // Comma,
    // /// `.`
    // Dot,
    // /// `;`
    // Semicolon,
    // /// `:`
    // Colon,
    // /// `=`
    // Equal,
    // /// `>`
    // LeftToRightArrow,
    // /// `<`
    // RightToLeftArrow,
    // /// `+`
    // Plus,
    // /// `-`
    // Minus,
    // /// `*`
    // Star,
    // /// `/`
    // Slash,
    // /// `%`
    // Percent,
    // /// `&`
    // Ampersand,
    // /// `|`
    // Pipe,
    // /// `!`
    // Bang,
    // /// `?`
    // Question,
    // /// `~`
    // Tilde,
    // /// `'`
    // Quote,
    // /// `"`
    // DoubleQuote,
}
