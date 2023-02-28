import { CONCAT_FN } from "../../constant/native-fn";
import { eCannotDeclareAlreadyVariable, eVariableDoesNotExist } from "../../controller/error";
import { MK_BOOL, MK_NULL, RuntimeVal } from "../../interface/value";

export interface Environment {
  parent?: Environment;
  variables: Map<string, RuntimeVal>;
  declareVar: (this: Environment, varname: string, value: RuntimeVal) => RuntimeVal;
  assignVar: (this: Environment, varname: string, value: RuntimeVal) => RuntimeVal;
  lookupVar: (this: Environment, varname: string) => RuntimeVal;
  resolve: (this: Environment, varname: string) => Environment;
}

export const createGlobalEnv = () => {
  const env = craeteEnvironment();
  // Create default global environment
  env.declareVar("true", MK_BOOL(true));
  env.declareVar("false", MK_BOOL(false));
  env.declareVar("null", MK_NULL());
  // Define a native builtin method
  env.declareVar("concat", CONCAT_FN());
  return env;
};

export const craeteEnvironment = (parent?: Environment): Environment => {
  const variables: Environment["variables"] = new Map();
  const declareVar: Environment["declareVar"] = function (this, varname, value) {
    if (this.variables.has(varname)) eCannotDeclareAlreadyVariable(varname);
    this.variables.set(varname, value);
    return value;
  };
  const assignVar: Environment["assignVar"] = function (this, varname, value) {
    const env = this.resolve(varname);
    env.variables.set(varname, value);
    return value;
  };
  const lookupVar: Environment["lookupVar"] = function (this, varname) {
    const env = this.resolve(varname);
    return env.variables.get(varname) as RuntimeVal;
  };
  const resolve: Environment["resolve"] = function (this, varname) {
    if (this.variables.has(varname)) return this;
    if (this.parent === undefined) eVariableDoesNotExist(varname);
    return (this.parent as Environment).resolve(varname);
  };
  return {
    parent,
    variables,
    declareVar,
    assignVar,
    lookupVar,
    resolve,
  };
};
