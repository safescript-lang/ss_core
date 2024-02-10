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

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Self::SyntaxError(e) => write!(f, "Syntax Error: {}", e),
            Self::UnexpectedCharacter(c) => write!(f, "Unexpected Character: '{c}'"),
            Self::LongCharLiteral => write!(f, "Character literal is too long, if you want to use a string, use double quotes"),
            Self::EndOfFile => write!(f, "End of file"),
            Self::FailedToParseNumber => write!(f, "Failed to parse number"),
            Self::FailedToParseKeyword => write!(f, "Failed to parse keyword"),
        }
    }
}

impl<'a> Token<'a> {
    pub fn ok(&self) -> bool {
        self.token != TokenType::Undefined
    }
}

impl KeyWord {
    #[inline]
    pub fn is_keyword(s: &str) -> bool {
        KeyWord::from_str(s).is_ok()
    }
}

impl TryFrom<String> for KeyWord {
    type Error = Error;
    #[inline]
    fn try_from(s: String) -> Result<Self, Self::Error> {
        KeyWord::from_str(&s)
    }
}

impl FromStr for KeyWord {
    type Err = Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "break" => Ok(Self::Break),
            "class" => Ok(Self::Class),
            "const" => Ok(Self::Const),
            "continue" => Ok(Self::Continue),
            "else" => Ok(Self::Else),
            "enum" => Ok(Self::Enum),
            "export" => Ok(Self::Export),
            "for" => Ok(Self::For),
            "function" => Ok(Self::Function),
            "if" => Ok(Self::If),
            "import" => Ok(Self::Import),
            "let" => Ok(Self::Let),
            "return" => Ok(Self::Return),
            "type" => Ok(Self::Type),
            "while" => Ok(Self::While),
            _ => Err(Error::FailedToParseKeyword),
        }
    }
}
