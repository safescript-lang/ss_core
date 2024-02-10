use crate::String;

pub use commoncore::{sf32, sf64};
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
    Break,
    Class,
    Const,
    Continue,
    Else,
    Enum,
    Export,
    For,
    Function,
    If,
    Import,
    Let,
    Return,
    Type,
    While,
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
    F32(sf32),
    F64(sf64),
    Infinity,
    NaN,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Token<'a> {
    pub(crate) token: TokenType,
    pub(crate) file_name: &'a str,
    pub(crate) line_number: u32,
}

#[macro_export(local_inner_macros)]
macro_rules! Token {
    // Symbols
    (  )  => ($crate::tokens::TokenType::Undefined);
    [, ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Comma));
    [. ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Dot));
    [; ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Semicolon));
    [: ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Colon));
    [= ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Equal));
    [> ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::LeftToRightArrow));
    [< ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::RightToLeftArrow));
    [+ ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Plus));
    [- ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Minus));
    [* ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Star));
    [/ ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Slash));
    [% ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Percent));
    [& ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Ampersand));
    [| ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Pipe));
    [! ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Bang));
    [? ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Question));
    [~ ]  => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Tilde));
    ["'"] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::Quote));
    ["" ] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::DoubleQuote));
    ['('] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::OpenParen));
    [')'] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::CloseParen));
    ['{'] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::OpenBrace));
    ['}'] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::CloseBrace));
    ['['] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::OpenBracket));
    [']'] => ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::CloseBracket));
    ['\n']=> ($crate::tokens::TokenType::Symbol($crate::tokens::Symbol::NewLine));

    // Keywords
    [break   ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Break));
    [class   ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Class));
    [const   ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Const));
    [continue] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Continue));
    [else    ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Else));
    [enum    ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Enum));
    [export  ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Export));
    [for     ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::For));
    [function] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Function));
    [if      ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::If));
    [import  ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Import));
    [let     ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Let));
    [return  ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Return));
    [type    ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::Type));
    [while   ] => ($crate::tokens::TokenType::KeyWord($crate::tokens::KeyWord::While));

    // Simple Primitives
    [void ] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Void));
    [false] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Boolean(false)));
    [true ] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Boolean(true)));
    [char $c:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Character($c)));
    [str  $s:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::String($s)));
    
    // Number Literals
    [num   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::Standard($n)
    )));
    [u8    $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::U8($n)
    )));
    [u16   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::U16($n)
    )));
    [u32   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::U32($n)
    )));
    [u64   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::U64($n)
    )));
    [u128  $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::U128($n)
    )));
    [usize $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::Usize($n)
    )));
    [i8    $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::I8($n)
    )));
    [i16   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::I16($n)
    )));
    [i32   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::I32($n)
    )));
    [i64   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::I64($n)
    )));
    [i128  $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::I128($n)
    )));
    [isize $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::Isize($n)
    )));
    [f32   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::F32($n)
    )));
    [f64   $n:ident] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::F64($n)
    )));
    [inf   ] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::Infinity
    )));
    [nan   ] => ($crate::tokens::TokenType::Literal($crate::tokens::Literal::Number(
        $crate::tokens::NumberLiteral::NaN
    )));

    // Runtime evaluated Keywords and Identifiers
    (kw $k:ident) => ($crate::tokens::KeyWord::try_from($k).map($crate::tokens::TokenType::KeyWord));
    (id $k:ident) => ($crate::tokens::TokenType::Identifier($k));
}
