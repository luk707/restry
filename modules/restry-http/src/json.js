import { HttpError } from "./errors";
import httpStatuses from "./statuses";
import { httpRequestContext } from "./context";

export default resourceCreator => context => async (req, res) => {
  try {
    const resource = await httpRequestContext.provider(req, resourceCreator)(
      context
    );
    if (typeof resource !== "object") {
      throw new TypeError("Resource must be of type error");
    }
    const { status = httpStatuses.ok, headers = {}, payload = {} } = resource;
    res.writeHead(status, { ...headers, "Content-Type": "application/json" });
    res.write(JSON.stringify(payload));
    res.end();
    return;
  } catch (error) {
    if (error instanceof HttpError) {
      res.writeHead(error.code, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          name: error.name,
          message: error.message
        })
      );
      res.end();
      return;
    }
    if (error instanceof Error) {
      res.writeHead(httpStatuses.internalServerError, {
        "Content-Type": "application/json"
      });
      res.write(
        JSON.stringify({
          name: error.name,
          message: error.message
        })
      );
      res.end();
      return;
    }
  }
  res.writeHead(httpStatuses.internalServerError, {
    "Content-Type": "application/json"
  });
  res.write(
    JSON.stringify({
      name: "Unknown",
      message: "Unknown error"
    })
  );
  res.end();
};
