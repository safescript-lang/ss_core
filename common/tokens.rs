use crate::Result;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TokenType {
    KeyWord(KeyWord),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum KeyWord {

}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Token {
    token_type: TokenType,
    lexeme: String,
    line: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TokenStream(Vec<Token>);

pub fn parse<T: ToString>(code: T) -> Result<TokenStream> {
    let code: String = code.to_string();
    let tokens = Vec::new();

    Ok(TokenStream(tokens))
}
