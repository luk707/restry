import pathToRegexp from "path-to-regexp";

export default (path, url) => {
  const keys = [];
  const test = pathToRegexp(path, keys, { end: true, strict: true });
  const match = test.exec(url);
  if (!match) {
    return null;
  }
  const [, ...values] = match;
  return keys.reduce(
    (accumalator, key, index) => ({
      ...accumalator,
      [key.name]: values[index]
    }),
    {}
  );
};
