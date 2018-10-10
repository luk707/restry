import pathToRegexp from "path-to-regexp";

export default ({ path, url, end }) => {
  const keys = [];
  const test = pathToRegexp(path, keys, { end });
  const match = test.exec(url);
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
