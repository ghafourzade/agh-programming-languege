import { MK_NATIVE_FN, MK_STRING, NumberVal, StringVal, Value } from "../interface/value";

export const CONCAT_FN = () => {
  return MK_NATIVE_FN((args, scope) => {
    const ret = args.reduce((pv, cv) => {
      let current = (pv as StringVal).value;
      switch (cv.type) {
        case Value.String:
          current += (cv as StringVal).value;
          break;
        case Value.Number:
          current += (cv as NumberVal).value.toString();
          break;
        default:
          break;
      }
      return MK_STRING(current);
    }, MK_STRING(""));
    return ret;
  });
};
