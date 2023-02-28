export enum TokenType {
  // Literal types
  Number,
  String,
  Identifier,
  // Grouping * Operators
  OpenParen,
  CloseParen,
  Comma,
  // Expr
  BinaryExpr,
  // EOF
  EOF,
}

export interface Token {
  value: string;
  type: TokenType;
}
