import * as pathToRegexp from "path-to-regexp";

export type CachedPath = { keys: Array<pathToRegexp.Key>; pattern: RegExp };

const pathMap = new Map<string, CachedPath>();

const getMemoizedRegexp = (path: string, end: boolean) => {
  const key = `${end ? "exact_" : ""}${path}`;
  const memoizedPath = pathMap.get(key);
  if (memoizedPath !== undefined) {
    return memoizedPath;
  }
  const keys: Array<pathToRegexp.Key> = [];
  const pattern = pathToRegexp(path, keys, { end });
  const result: CachedPath = { keys, pattern };
  pathMap.set(key, result);
  return result;
};

export type Params = { [key: string]: string };

export default ({
  path,
  url,
  end
}: {
  path: string;
  url: string;
  end: boolean;
}): { params: Params } => {
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
