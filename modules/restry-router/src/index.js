import { createContext } from "restry";
import { parse as parseUrl } from "url";
import matchPath from "./match-path";

export const routerContext = createContext({ path: "", params: {} });

export default routes => context => async (req, res) => {
  const url = parseUrl(req.url).pathname;
  const { contextPath } = routerContext.consumer(context);
  for (const route of routes) {
    const path = `${contextPath || ""}${route.path}`;
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

    await routerContext.provider(
      { path, params: match && match.params },
      route.handler
    )(context)(req, res);
    return;
  }
  // TODO: This kind of logic could be implemented elsewhere
  res.writeHead(404, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      messgage: `No route for ${url}`,
      type: "NotFoundError"
    })
  );
  res.end();
};
