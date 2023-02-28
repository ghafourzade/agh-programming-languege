import { eCompilerCrache } from "../../controller/error";
import { BinaryExpr, CallExpr, Identifier, NodeType, NumberLiteral, Program, Stmt, StringLiteral } from "../../interface/ast";
import { MK_NULL, MK_NUMBER, MK_STRING, RuntimeVal, Value } from "../../interface/value";
import { Environment } from "./environment";
import { evaluateBinaryExpr, evaluateCallExpr } from "./evaluate/expressions";
import { evaluateIdentifier, evaluateProgram } from "./evaluate/statements";

export const evaluate = (astNode: Stmt, env: Environment): RuntimeVal => {
  switch (astNode.type) {
    case NodeType.Program:
      return evaluateProgram(astNode as Program, env);
    case NodeType.NumberLiteral:
      return MK_NUMBER((astNode as NumberLiteral).value);
    case NodeType.StringLiteral:
      return MK_STRING((astNode as StringLiteral).value);
    case NodeType.Identifier:
      return evaluateIdentifier(astNode as Identifier, env);
    case NodeType.CallExpr:
      return evaluateCallExpr(astNode as CallExpr, env);
    case NodeType.BinaryExpr:
      return evaluateBinaryExpr(astNode as BinaryExpr, env);
    default:
      eCompilerCrache();
      return MK_NULL();
  }
};
