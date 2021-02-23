import fastify from "fastify";
import fastify_static from "fastify-static";
import fastify_cors from "fastify-cors";
import routes from "./api/routes";
import path from "path";
import fs from "fs";

// TODO: Deal with CORS when deploying

const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

const server = fastify({
  ignoreTrailingSlash: true
});

server.register(fastify_cors);
server.register(routes, { fs, path });
server.register(fastify_static, {
  root: path.resolve("./static"),
  prefix: "/static/"
});

server.listen(port);

server.ready(() => {
  console.log(`Listening at http://localhost:${port}`);
});
