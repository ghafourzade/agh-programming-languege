import { eCannotParse, eGeneral, mCloseParen, mExpectOpenParen, mMissingCloseParenArgs } from "../../controller/error";
import { BinaryExpr, CallExpr, Expr, Identifier, NodeType, NumberLiteral, Program, Stmt, StringLiteral } from "../../interface/ast";
import { Token, TokenType } from "../../interface/token";
import { tokenize } from "../../config/frontend/lexer";

let tokens: Token[] = [];

const tUtlt = {
  // tokens utilities
  at: () => tokens[0],
  eat: () => tokens.shift()!,
  expect: (type: TokenType, err: string) => {
    const prev = tokens.shift() as Token;
    if (!prev || prev.type !== type) {
      eGeneral(err);
    }
    return prev;
  },
};

export const parse = (sourceCode: string) => {
  tokens = tokenize(sourceCode);
  const program = programStmt();
  while (notEof(tUtlt.at())) {
    program.body.push(parseStmt());
  }
  return program;
};

// CallExpr
// AdditiveExpr
// MultiplicitaveExpr
// PrimaryExpr

const parseStmt = (): Stmt => parseExpr();

const parseExpr = (): Expr => parseAdditiveExpr();

const parseAdditiveExpr = (): Expr => {
  let left = parseMultiplicitaveExpr()!;
  while (tUtlt.at().value === "+" || tUtlt.at().value === "-") {
    const operator = tUtlt.eat().value;
    const right = parseMultiplicitaveExpr();
    left = {
      type: NodeType.BinaryExpr,
      left,
      right,
      operator,
    } as BinaryExpr;
  }
  return left;
};

const parseMultiplicitaveExpr = (): Expr => {
  let left = parseCallMemberExpr();
  while (tUtlt.at().value === "*" || tUtlt.at().value === "/" || tUtlt.at().value === "%") {
    const operator = tUtlt.eat().value;
    const right = parseCallMemberExpr();
    left = {
      type: NodeType.BinaryExpr,
      left,
      right,
      operator,
    } as BinaryExpr;
  }
  return left;
};

const parseCallMemberExpr = (): Expr => {
  const member = parsePrimaryExpr()!;
  if (tUtlt.at().type == TokenType.OpenParen) return parseCallExpr(member);
  return member;
};

const parseCallExpr = (caller: Expr): Expr => {
  let callExpr: Expr = {
    type: NodeType.CallExpr,
    caller,
    arguments: parseArguments(),
  } as CallExpr;
  if (tUtlt.at().type == TokenType.OpenParen) callExpr = parseCallExpr(callExpr);
  return callExpr;
};

const parseArguments = (): Expr[] => {
  tUtlt.expect(TokenType.OpenParen, mExpectOpenParen);
  const args = tUtlt.at().type === TokenType.CloseParen ? [] : parseArgumentsList();
  tUtlt.expect(TokenType.CloseParen, mMissingCloseParenArgs);
  return args;
};

const parseArgumentsList = (): Expr[] => {
  const args = [parseExpr()];
  while (tUtlt.at().type === TokenType.Comma) {
    tUtlt.eat();
    args.push(parseExpr());
  }
  return args;
};

const parsePrimaryExpr = (): Expr | undefined => {
  const tokenType = tUtlt.at().type;
  switch (tokenType) {
    case TokenType.Identifier:
      return parseIdentifier(tUtlt.eat());
    case TokenType.Number:
      return parseNumber(tUtlt.eat());
    case TokenType.String:
      return parseString(tUtlt.eat());
    case TokenType.OpenParen:
      return parseOpenParen();
    default:
      eCannotParse(tUtlt.at().value);
  }
};

const notEof = (token: Token) => token.type !== TokenType.EOF;

const programStmt = (): Program => ({ type: NodeType.Program, body: [] });

const parseIdentifier = (token: Token): Identifier => ({
  type: NodeType.Identifier,
  name: token.value,
});
const parseNumber = (token: Token): NumberLiteral => ({ type: NodeType.NumberLiteral, value: parseFloat(token.value) });
const parseString = (token: Token): StringLiteral => ({ type: NodeType.StringLiteral, value: token.value });
const parseOpenParen = () => {
  tUtlt.eat(); // open paren
  const value = parseExpr();
  tUtlt.expect(TokenType.CloseParen, mCloseParen); // close paren
  return value;
};
