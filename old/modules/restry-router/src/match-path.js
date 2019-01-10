import pathToRegexp from "path-to-regexp";

const pathMap = new Map();

const getMemoizedRegexp = (path, end) => {
  const key = `${end ? "exact_" : ""}${path}`;
  const memoizedPath = pathMap.get(key);
  if (memoizedPath !== undefined) {
    return memoizedPath;
  }
  const keys = [];
  const pattern = pathToRegexp(path, keys, { end });
  const result = { keys, pattern };
  pathMap.set(key, result);
  return result;
};

export default ({ path, url, end }) => {
  const { keys, pattern } = getMemoizedRegexp(path, end);
  const match = pattern.exec(url);
  if (!match) {
    return null;
  }
  const [, ...values] = match;
  return {
    params: keys.reduce(
      (accumalator, key, index) => ({
        ...accumalator,
        [key.name]: values[index]
      }),
      {}
    )
  };
};
