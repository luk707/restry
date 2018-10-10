import matchPath from "./match-path";
import { parse as parseUrl } from "url";

export default routes => context => async (req, res) => {
  const url = parseUrl(req.url).pathname;
  for (const route of routes) {
    const path = `${context.path || ""}${route.path}`;
    const match = matchPath({ path, url, end: route.exact || false });
    // If no match was found when a path is specified, ignore route
    if (!match && route.path) {
      continue;
    }
    /**
     * If a method test is defined and it does not match the req method
     * continue. Otherwise use the route.
     */
    if (route.method && !new RegExp(route.method, "i").test(req.method)) {
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
