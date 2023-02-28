import { BINARY_EXPRESSION, SPACE_CHARECTERS, STRING_SYMBOLS } from "../../constant/chars";
import { KEYWORDS } from "../../constant/keywords";
import { exist, isAlpha, isNumber } from "../../controller/condition";
import { eCannotTokenize } from "../../controller/error";
import { Token, TokenType } from "../../interface/token";

const createToken = (value: string = "", type: TokenType): Token => ({ value, type });

const token = (src: string[]): Token | undefined => {
  if (src[0] === "(") return createToken(src.shift(), TokenType.OpenParen);
  if (src[0] === ")") return createToken(src.shift(), TokenType.CloseParen);
  if (src[0] === ",") return createToken(src.shift(), TokenType.Comma);
  if (exist(BINARY_EXPRESSION, src[0])) return createToken(src.shift(), TokenType.BinaryExpr);
  if (exist(STRING_SYMBOLS, src[0])) {
    src.shift();
    let string = "";
    while (src.length > 0 && !exist(STRING_SYMBOLS, src[0])) string += src.shift();
    src.shift();
    return createToken(string, TokenType.String);
  }
  if (isNumber(src[0])) {
    let num = "";
    while (src.length > 0 && isNumber(src[0])) num += src.shift();
    return createToken(num, TokenType.Number);
  }
  if (isAlpha(src[0])) {
    let ident = "";
    while (src.length > 0 && isAlpha(src[0])) ident += src.shift();
    const reserved = KEYWORDS[ident];
    if (typeof reserved === "number") return createToken(ident, reserved);
    return createToken(ident, TokenType.Identifier);
  }
  if (exist(SPACE_CHARECTERS, src[0])) {
    src.shift();
    return;
  }
  eCannotTokenize(src.shift());
};

export const tokenize = (sourceCode: string) => {
  const tokens: Token[] = [];
  const src = sourceCode.split("");
  while (src.length > 0) {
    const myToken = token(src);
    if (myToken) tokens.push(myToken);
  }
  tokens.push(createToken("End of file", TokenType.EOF));
  return tokens;
};
