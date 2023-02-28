import { parse } from "./config/frontend/parser";
import { createGlobalEnv } from "./config/runtime/environment";
import { evaluate } from "./config/runtime/interpreter";

export const compile = (sourceCode: string) => {
  const ast = parse(sourceCode);
  const env = createGlobalEnv();
  const result = evaluate(ast, env);
  return result;
};
