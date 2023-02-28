import { eNotFunction } from "../../../controller/error";
import { BinaryExpr, CallExpr } from "../../../interface/ast";
import { MK_NULL, NativeFnVal, NumberVal, RuntimeVal, Value } from "../../../interface/value";
import { Environment } from "../environment";
import { evaluate } from "../interpreter";

export const evaluateBinaryExpr = (binaryExpr: BinaryExpr, env: Environment): RuntimeVal => {
  const lhs = evaluate(binaryExpr.left, env)!;
  const rhs = evaluate(binaryExpr.right, env)!;
  if (lhs.type === Value.Number && rhs.type === Value.Number) return evaluateNumericBinaryExpr(lhs as NumberVal, rhs as NumberVal, binaryExpr.operator);
  return MK_NULL();
};
const evaluateNumericBinaryExpr = (lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal => {
  let result = 0;
  switch (operator) {
    case "+":
      result = lhs.value + rhs.value;
      break;
    case "-":
      result = lhs.value - rhs.value;
      break;
    case "*":
      result = lhs.value * rhs.value;
      break;
    case "/":
      result = lhs.value / rhs.value;
      break;
    default:
      result = lhs.value % rhs.value;
      break;
  }
  return { type: Value.Number, value: result };
};

export const evaluateCallExpr = (callExpr: CallExpr, env: Environment): RuntimeVal => {
  const args = callExpr.arguments.map(arg => evaluate(arg, env));
  const fn = evaluate(callExpr.caller, env);
  if (fn.type !== Value.NativeFn) eNotFunction(JSON.stringify(fn));
  const result = (fn as NativeFnVal).call(args, env);
  return result;
};
