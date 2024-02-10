use crate::*;

impl<'a> Parser<'a> {
    pub fn parse(&mut self, mut line: Peekable<Chars<'a>>) -> Result {
        while let Some(c) = line.next() {
            if self.in_comment >= 2 {
                if c == '/' {
                    self.in_comment -= 1;
                }
                continue;
            }
            let mut token = Token {
                line_number: self.line_number,
                file_name: self.file_name,
                token: Token!(),
            };
            match c {
                '(' => token.token = Token!['('],
                ')' => token.token = Token![')'],
                '{' => token.token = Token!['{'],
                '}' => token.token = Token!['}'],
                '[' => token.token = Token!['['],
                ']' => token.token = Token![']'],
                ',' => token.token = Token![,],
                '.' => token.token = Token![.],
                ';' => token.token = Token![;],
                ':' => token.token = Token![:],
                '=' => token.token = Token![=],
                '>' => token.token = Token![>],
                '<' => token.token = Token![<],
                '+' => token.token = Token![+],
                '-' => token.token = Token![-],
                '*' => token.token = Token![*],
                '%' => token.token = Token![%],
                '&' => token.token = Token![&],
                '|' => token.token = Token![|],
                '!' => token.token = Token![!],
                '?' => token.token = Token![?],
                '~' => token.token = Token![~],
                '\'' => {
                    let char_lit  = line.next().ok_or(Error::EndOfFile)?;
                    let next_char = line.next().ok_or(Error::EndOfFile)?;
                    if next_char != '\'' {
                        return Err(Error::LongCharLiteral);
                    }
                    token.token = Token![char char_lit];
                },
                '"' => {
                    let mut literal = String::new();
                    while let Some(c) = line.next() {
                        if c == '"' {
                            break;
                        }
                        literal.push(c);
                    }
                    token.token = Token![str literal];
                },
                '/' => {
                    self.in_comment += 1;
                    if self.in_comment == 2 {
                        self.tokens.pop();
                    } else {
                        token.token = Token![/];
                    }
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
                    let number = literal.parse().map_err(|_| Error::FailedToParseNumber)?;
                    token.token = Token![num number];
                },
                'a'..='z' | 'A'..='Z' | '_' => {
                    let mut string = String::new();
                    string.push(c);
                    while let Some(c) = line.peek() {
                        if c.is_ascii_alphanumeric() || c == &'_' {
                            string.push(line.next().ok_or(Error::EndOfFile)?);
                        } else {
                            break;
                        }
                    }
                    if KeyWord::is_keyword(&string) {
                        token.token = Token![kw string]?;
                    } else {
                        token.token = Token![id string];
                    }
                },
                ' ' | '\t' => {},
                '\n' => {
                    token.token = Token!['\n'];
                    self.line_number += 1;
                },
                c => return Err(Error::UnexpectedCharacter(c))
            }
            if token.ok() {
                self.tokens.push(token);
            }
        }
        Ok(())
    }
}
