export enum NodeType {
  Program = "Program",

  CallExpr = "CallExpr",
  BinaryExpr = "BinaryExpr",

  VariableLiteral = "VariableLiteral",
  NumberLiteral = "NumberLiteral",
  StringLiteral = "StringLiteral",
  Identifier = "Identifier",
}

export interface Stmt {
  type: NodeType;
}

export interface Program extends Stmt {
  type: NodeType.Program;
  body: Stmt[];
}

export interface Expr extends Stmt {}

export interface CallExpr extends Expr {
  type: NodeType.CallExpr;
  caller: Expr;
  arguments: Expr[];
}

export interface BinaryExpr extends Expr {
  type: NodeType.BinaryExpr;
  left: Expr;
  right: Expr;
  operator: string;
}

export interface NumberLiteral extends Expr {
  type: NodeType.NumberLiteral;
  value: number;
}
export interface StringLiteral extends Expr {
  type: NodeType.StringLiteral;
  value: string;
}

export interface Identifier extends Expr {
  type: NodeType.Identifier;
  name: string;
}
