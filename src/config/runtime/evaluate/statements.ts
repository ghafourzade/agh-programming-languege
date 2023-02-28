import { Identifier, Program } from "../../../interface/ast";
import { MK_NULL, RuntimeVal } from "../../../interface/value";
import { Environment } from "../environment";
import { evaluate } from "../interpreter";

export const evaluateProgram = (program: Program, env: Environment): RuntimeVal => {
  let lastEvaluated: RuntimeVal = MK_NULL();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env)!;
  }
  return lastEvaluated;
};
export const evaluateIdentifier = (ident: Identifier, env: Environment): RuntimeVal => {
  const val = env.lookupVar(ident.name);
  return val;
};
