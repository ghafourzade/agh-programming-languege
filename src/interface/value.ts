import { Environment } from "../config/runtime/environment";

export enum Value {
  Null,
  Number,
  String,
  Boolean,
  NativeFn,
}
export interface RuntimeVal {
  type: Value;
}

export interface NullVal extends RuntimeVal {
  type: Value.Null;
  value: "null";
}
export const MK_NULL = (): NullVal => ({ type: Value.Null, value: "null" });
export interface NumberVal extends RuntimeVal {
  type: Value.Number;
  value: number;
}
export const MK_NUMBER = (value: number): NumberVal => ({ type: Value.Number, value });
export interface StringVal extends RuntimeVal {
  type: Value.String;
  value: string;
}
export const MK_STRING = (value: string): StringVal => ({ type: Value.String, value });
export interface BooleanVal extends RuntimeVal {
  type: Value.Boolean;
  value: boolean;
}
export const MK_BOOL = (value: boolean = true): BooleanVal => ({ type: Value.Boolean, value });

export type FunctionCall = (args: RuntimeVal[], env: Environment) => RuntimeVal;
export interface NativeFnVal extends RuntimeVal {
  type: Value.NativeFn;
  call: FunctionCall;
}
export const MK_NATIVE_FN = (call: FunctionCall): NativeFnVal => ({ type: Value.NativeFn, call });
