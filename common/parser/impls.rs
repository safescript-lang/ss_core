use ::core::fmt;
use crate::*;

const DEFAULT_FILE_NAME: &'static str = "<native>";

pub trait ToParseParams<'a> {
    fn to_parse_params(self) -> ParseParams<'a>;
}

impl<'a> ToParseParams<'a> for &'a str {
    fn to_parse_params(self) -> ParseParams<'a> {
        ParseParams {
            file_name: DEFAULT_FILE_NAME,
            code: self,
        }
    }
}

impl<'a> ToParseParams<'a> for (&'a str, &'a str) {
    fn to_parse_params(self) -> ParseParams<'a> {
        ParseParams {
            file_name: self.1,
            code: self.0,
        }
    }
}

impl fmt::Display for TokenType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            TokenType::KeyWord(k) => k.fmt(f),
            TokenType::Identifier(i) => i.fmt(f),
            TokenType::Literal(l) => l.fmt(f),
            TokenType::Symbol(s) => s.fmt(f),

            TokenType::Undefined => write!(f, "undefined"),
        }
    }
}

impl fmt::Display for KeyWord {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        todo!("Implement display for KeyWord")
    }
}

impl fmt::Display for Symbol {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::OpenParen => write!(f, "("),
            Self::CloseParen => write!(f, ")"),
            Self::OpenBrace => write!(f, "{{"),
            Self::CloseBrace => write!(f, "}}"),
            Self::OpenBracket => write!(f, "["),
            Self::CloseBracket => write!(f, "]"),
            Self::Comma => write!(f, ","),
            Self::Dot => write!(f, "."),
            Self::Semicolon => write!(f, ";"),
            Self::Colon => write!(f, ":"),
            Self::Equal => write!(f, "="),
            Self::LeftToRightArrow => write!(f, ">"),
            Self::RightToLeftArrow => write!(f, "<"),
            Self::Plus => write!(f, "+"),
            Self::Minus => write!(f, "-"),
            Self::Star => write!(f, "*"),
            Self::Slash => write!(f, "/"),
            Self::Percent => write!(f, "%"),
            Self::Ampersand => write!(f, "&"),
            Self::Pipe => write!(f, "|"),
            Self::Bang => write!(f, "!"),
            Self::Question => write!(f, "?"),
            Self::Tilde => write!(f, "~"),
            Self::Quote => write!(f, "'"),
            Self::DoubleQuote => write!(f, "\""),
            Self::NewLine => write!(f, "\n"),
        }
    }
}

impl fmt::Display for Literal {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Literal::Void => write!(f, "void"),
            Literal::String(s) => write!(f, "{}", s),
            Literal::Number(n) => write!(f, "{}", n),
            Literal::Boolean(b) => write!(f, "{}", b),
            Literal::Character(c) => write!(f, "{}", c),
        }
    }
}

impl fmt::Display for NumberLiteral {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            NumberLiteral::Infinity => write!(f, "infinity"),
            NumberLiteral::NaN => write!(f, "NaN"),
            NumberLiteral::Standard(n) => write!(f, "{}", n),
            NumberLiteral::U8(n) => write!(f, "{}", n),
            NumberLiteral::U16(n) => write!(f, "{}", n),
            NumberLiteral::U32(n) => write!(f, "{}", n),
            NumberLiteral::U64(n) => write!(f, "{}", n),
            NumberLiteral::U128(n) => write!(f, "{}", n),
            NumberLiteral::Usize(n) => write!(f, "{}", n),
            NumberLiteral::I8(n) => write!(f, "{}", n),
            NumberLiteral::I16(n) => write!(f, "{}", n),
            NumberLiteral::I32(n) => write!(f, "{}", n),
            NumberLiteral::I64(n) => write!(f, "{}", n),
            NumberLiteral::I128(n) => write!(f, "{}", n),
            NumberLiteral::Isize(n) => write!(f, "{}", n),
            NumberLiteral::F32(n) => write!(f, "{}", n),
            NumberLiteral::F64(n) => write!(f, "{}", n),
        }
    }
}

impl<'a> fmt::Display for Token<'a> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        self.token_type.fmt(f)
    }
}

impl<'a> fmt::Display for TokenStream<'a> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for token in &self.0 {
            write!(f, "{}", token)?;
        }
        Ok(())
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::SyntaxError(e) => write!(f, "Syntax Error: {}", e),
            Self::UnexpectedCharacter(c) => write!(f, "Unexpected Character: '{c}'"),
        }
    }
}
