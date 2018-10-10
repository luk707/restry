import http from "http";
import router from "restry-router";

const testEndpoint = context => (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      messgage: "Test",
      remoteAddress: req.connection.remoteAddress
    })
  );
  res.end();
};

const customerEndpoint = context => (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      id: context.params.id,
      firstName: "John",
      lastName: "Smith"
    })
  );
  res.end();
};

const transactionEndpoint = context => (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      id: context.params.id,
      amount: 123.45
    })
  );
  res.end();
};

const notFoundEndpoint = context => (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify({
      messgage: "This is a custom not found error",
      type: "NotFoundError"
    })
  );
  res.end();
};

// The router can be passed to http createServer, this makes it lightweight, you can even use https or http2
const server = http.createServer(
  router([
    // Exact specifies not to match sub routes i.e. only match the index route
    { path: "/", exact: true, handler: testEndpoint },
    { path: "/customer/:id", handler: customerEndpoint },
    // Since routers are handlers, a router can be nested within a router
    {
      path: "/transaction",
      handler: router([
        // Routes within another router are relative
        { path: "/:id", handler: transactionEndpoint }
      ])
    },
    // If you don't specify a path, the route will always be hit
    { handler: notFoundEndpoint }
  ])({ path: "" })
);

server.listen(8080);
