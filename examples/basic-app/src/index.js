import http from "http";
import router, { routerContext } from "restry-router";
import {
  createResponse,
  httpStatuses,
  json,
  HttpInternalServerError,
  HttpNotFoundError,
  httpRequestContext
} from "restry-http";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const testResource = context => {
  const req = httpRequestContext.consumer(context);
  if (!req) {
    throw new HttpInternalServerError("No request context was provided");
  }
  return createResponse({
    status: httpStatuses.ok,
    payload: {
      messgage: "Test",
      remoteAddress: req.connection.remoteAddress
    }
  });
};

const customerResource = context => {
  const { params } = routerContext.consumer(context);
  return createResponse({
    status: httpStatuses.ok,
    payload: {
      id: params.id,
      firstName: "John",
      lastName: "Smith"
    }
  });
};

// Asynchronous example
const transactionResource = async context => {
  await delay(1000);
  const { params } = routerContext.consumer(context);
  return createResponse({
    status: httpStatuses.ok,
    payload: {
      id: params.id,
      amount: 123.45
    }
  });
};

const notFoundResource = () => {
  throw new HttpNotFoundError("Route not found");
};

// The router can be passed to http createServer, this makes it lightweight, you can even use https or http2
const server = http.createServer(
  router([
    // Exact specifies not to match sub routes i.e. only match the index route
    { path: "/", exact: true, handler: json(testResource) },
    // Specify a method or a list of methods to match
    {
      path: "/customer/:id",
      method: "get|delete",
      handler: json(customerResource)
    },
    // Since routers are handlers, a router can be nested within a router
    {
      path: "/transaction",
      handler: router([
        // Paths within another router are relative
        { path: "/:id", handler: json(transactionResource) }
      ])
    },
    // If you don't specify a path, the route will always be hit, anything after this route would be ignored
    { handler: json(notFoundResource) }
  ])({ path: "" })
);

server.listen(8080, () => {
  console.log("Listening on port 8080");
});
