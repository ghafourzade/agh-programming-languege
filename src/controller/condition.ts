export const exist = (array: string[], str: string) => array.indexOf(str) !== -1;

export const isNumber = (str: string) => {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
};

export const isAlpha = (str: string) => str.toLowerCase() !== str.toUpperCase();
