import matchPath from "./match-path";
import { parse as parseUrl } from "url";

export default routes => context => async (req, res) => {
  const url = parseUrl(req.url).pathname;
  for (const route of routes) {
    const path = `${context.path || ""}${route.path}`;
    const match = matchPath({ path, url, end: route.exact || false });
    if (!match && route.path) {
      continue;
    }
    const childContext = { ...context, path, params: match && match.params };
    await route.handler(childContext)(req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      messgage: `No route for ${url}`,
      type: "NotFoundError"
    })
  );
  res.end();
};
