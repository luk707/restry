import matchPath from "./match-path";

export default routes => context => async (req, res) => {
  for (const route of routes) {
    const { path, block } = route;
    const match = matchPath(path, req.pathname);
    if (!match) {
      continue;
    }
    await block(req, res);
    return;
  }
};
