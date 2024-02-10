#![cfg_attr(not(feature = "std"), no_std)]

extern crate alloc;
use alloc::{
    string::String,
    vec::Vec,
};

use ::core::result::Result as R;
pub type Result<T = ()> = R<T, Error>;

mod tokens;
mod impls;

pub use impls::ToParseParams;
pub use tokens::*;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    SyntaxError(String),
    UnexpectedCharacter(char),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TokenStream<'a>(Vec<Token<'a>>);

pub struct ParseParams<'a> {
    code: &'a str,
    file_name: &'a str
}

pub fn parse<'a, T: ToParseParams<'a>>(input: T) -> Result<TokenStream<'a>> {
    let params = input.to_parse_params();
    let code = params.code;
    let file_name = params.file_name;
    let mut line_number: u32 = 1;
    let mut tokens = Vec::new();

    let mut in_comment: u8;

    for line in code.lines().peekable() {
        in_comment = 0;
        let line = line.trim();
        if line.is_empty() {
            line_number += 1;
            continue;
        }
        let mut line = line.chars().peekable();
        while let Some(c) = line.next() {
            if in_comment >= 2 {
                if c == '/' {
                    in_comment -= 1;
                }
                continue;
            }
            let mut token = Token {
                token_type: Token!(),
                line_number,
                file_name,
            };
            match c {
                '(' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::OpenParen),
                    line_number,
                    file_name,
                }),
                ')' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::CloseParen),
                    line_number,
                    file_name,
                }),
                '{' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::OpenBrace),
                    line_number,
                    file_name,
                }),
                '}' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::CloseBrace),
                    line_number,
                    file_name,
                }),
                '[' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::OpenBracket),
                    line_number,
                    file_name,
                }),
                ']' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::CloseBracket),
                    line_number,
                    file_name,
                }),
                ',' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Comma),
                    line_number,
                    file_name,
                }),
                '.' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Dot),
                    line_number,
                    file_name,
                }),
                ';' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Semicolon),
                    line_number,
                    file_name,
                }),
                ':' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Colon),
                    line_number,
                    file_name,
                }),
                '=' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Equal),
                    line_number,
                    file_name,
                }),
                '>' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::LeftToRightArrow),
                    line_number,
                    file_name,
                }),
                '<' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::RightToLeftArrow),
                    line_number,
                    file_name,
                }),
                '+' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Plus),
                    line_number,
                    file_name,
                }),
                '-' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Minus),
                    line_number,
                    file_name,
                }),
                '*' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Star),
                    line_number,
                    file_name,
                }),
                '/' => {
                    in_comment += 1;
                    if in_comment == 2 {
                        tokens.pop();
                    } else {
                        tokens.push(Token {
                            token_type: TokenType::Symbol(Symbol::Slash),
                            line_number,
                            file_name,
                        })
                    }
                },
                '%' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Percent),
                    line_number,
                    file_name,
                }),
                '&' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Ampersand),
                    line_number,
                    file_name,
                }),
                '|' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Pipe),
                    line_number,
                    file_name,
                }),
                '!' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Bang),
                    line_number,
                    file_name,
                }),
                '?' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Question),
                    line_number,
                    file_name,
                }),
                '~' => tokens.push(Token {
                    token_type: TokenType::Symbol(Symbol::Tilde),
                    line_number,
                    file_name,
                }),
                '\'' => {
                    let mut literal = String::new();
                    while let Some(c) = line.next() {
                        if c == '\'' {
                            break;
                        }
                        literal.push(c);
                    }
                    tokens.push(Token {
                        token_type: TokenType::Symbol(Symbol::Quote),
                        line_number,
                        file_name,
                    });
                    tokens.push(Token {
                        token_type: TokenType::Literal(Literal::String(literal)),
                        line_number,
                        file_name,
                    });
                    tokens.push(Token {
                        token_type: TokenType::Symbol(Symbol::Quote),
                        line_number,
                        file_name,
                    });
                },
                '"' => {
                    let mut literal = String::new();
                    while let Some(c) = line.next() {
                        if c == '"' {
                            break;
                        }
                        literal.push(c);
                    }
                    tokens.push(Token {
                        token_type: TokenType::Symbol(Symbol::DoubleQuote),
                        line_number,
                        file_name,
                    });
                    tokens.push(Token {
                        token_type: TokenType::Literal(Literal::String(literal)),
                        line_number,
                        file_name,
                    });
                    tokens.push(Token {
                        token_type: TokenType::Symbol(Symbol::DoubleQuote),
                        line_number,
                        file_name,
                    });
                },
                '0'..='9' => {
                    let mut literal = String::new();
                    literal.push(c);
                    while let Some(c) = line.next() {
                        if c.is_ascii_digit() || c == '.' {
                            literal.push(c);
                        } else {
                            break;
                        }
                    }
                    tokens.push(Token {
                        token_type: TokenType::Literal(Literal::Number(
                            NumberLiteral::Standard(literal.parse().unwrap())
                        )),
                        line_number,
                        file_name,
                    });
                },
                'a'..='z' | 'A'..='Z' | '_' => {
                    let mut literal = String::new();
                    literal.push(c);

                    while line.peek()
                        .map(|c| c.is_ascii_alphanumeric() || *c == '_')
                        .unwrap_or(true)
                    {
                        if let Some(c) = line.next() {
                            if c.is_ascii_alphanumeric() || c == '_' {
                                literal.push(c);
                            } else {
                                break;
                            }
                        }
                    }
                    tokens.push(Token {
                        token_type: TokenType::Identifier(literal),
                        line_number,
                        file_name,
                    });
                },
                ' ' | '\t' => {},
                '\n' => {
                    tokens.push(Token {
                        token_type: TokenType::Symbol(Symbol::NewLine),
                        line_number,
                        file_name,
                    });
                    line_number += 1;
                },
                c => {
                    return Err(Error::UnexpectedCharacter(c));
                    // return Err(Error::UnexpectedCharacter(c));
                }
            }
        }
    }


    Ok(TokenStream(tokens))
}

#[cfg(all(feature = "nightly", not(feature = "std")))]
impl ::core::error::Error for Error {}
#[cfg(all(not(feature = "nightly"), feature = "std"))]
impl ::std::error::Error for Error {}
