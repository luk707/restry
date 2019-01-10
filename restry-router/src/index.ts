import { createContext, Context, Block } from "restry";
import { parse as parseUrl } from "url";
import matchPath, { Params } from "./match-path";

export type RouterContext = { path: string; params: Params };

export const routerContext = createContext<RouterContext>({
  path: "",
  params: {}
});

export type HttpHandler = (req: Request, res: Response) => Promise<void>;

export type HttpHandlerBlock = Block<HttpHandler>;

export type Route = {
  exact?: boolean;
  method?:
    | "get"
    | "head"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace"
    | "patch";
  path?: string;
  handler: HttpHandlerBlock;
};

export default (
  routes: Array<Route>,
  defaultHandler?: HttpHandler
): HttpHandlerBlock => (context: Context) => async (
  req: Request,
  res: Response
) => {
  const url = parseUrl(req.url).pathname;
  const { path: rootPath } = routerContext.consumer(context);
  for (const route of routes) {
    const path = `${rootPath || ""}${route.path}`;
    const match = matchPath({ path, url, end: route.exact || false });
    if (!match && route.path) {
      continue;
    }
    if (route.method && !new RegExp(route.method, "i").test(req.method)) {
      continue;
    }
    await routerContext.provider(
      { path, params: match && match.params },
      route.handler
    )(context)(req, res);
    return;
  }
  if (defaultHandler) {
    defaultHandler(req, res);
  } else {
    const response = res as any;
    response.writeHead(404, { "Content-Type": "application/json" });
    response.write(
      JSON.stringify({
        messgage: `No route for ${url}`,
        type: "NotFoundError"
      })
    );
    response.end();
  }
};
