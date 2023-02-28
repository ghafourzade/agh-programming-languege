export const mCmdHead = "[COMPILER] ";
export const mCannotTokenize = (cahrecter: string = "") => "Unexpected charecter found: '" + cahrecter + "'";
export const mCannotParse = (token: string = "") => "Unexpected token found: '" + token + "'";
export const mCloseParen = "Unexpected token found inside parentheses. Expected close parenthesis.";
export const mCompilerCrache = "Compiler faced to runtime error.";
export const mExpectOpenParen = "Expected open parenthesis.";
export const mMissingCloseParenArgs = "Missing closing parenthesis inside arguments list.";
export const mCallNotIdentifier = "Use operator for calling a function.";
export const mCannotDeclareAlreadyVariable = (varname: string) => `Cannot declare variable ${varname} when it's already defined.`;
export const mVariableDoesNotExist = (varname: string) => `Cannot resolve ${varname} as it doesn't exist.`;
export const mNotFunction = (func: string) => `Cannot call value that is not a function: ${func}`;

export const eGeneral = (err: string) => {
  throw new Error(mCmdHead + err);
};

export const eCannotTokenize = (cahrecter: string = "") => {
  eGeneral(mCannotTokenize(cahrecter));
};

export const eCannotParse = (token: string = "") => {
  eGeneral(mCannotParse(token));
};

export const eCompilerCrache = () => {
  eGeneral(mCompilerCrache);
};

export const eCallNotIdentifier = () => {
  eGeneral(mCallNotIdentifier);
};

export const eCannotDeclareAlreadyVariable = (varname: string) => {
  eGeneral(mCannotDeclareAlreadyVariable(varname));
};

export const eVariableDoesNotExist = (varname: string) => {
  eGeneral(mVariableDoesNotExist(varname));
};

export const eNotFunction = (func: string) => {
  eGeneral(mNotFunction(func));
};
