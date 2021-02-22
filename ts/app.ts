import fastify from "fastify";
import fastify_static from "fastify-static";
import path from "path";
import fs from "fs";
import routes from "./api/routes";

const port = process.env.PORT || 8080;

const server = fastify({
  ignoreTrailingSlash: true
});

server.register(routes, { fs, path });
server.register(fastify_static, {
  root: path.resolve("./static"),
  prefix: "/static/"
});

server.listen(port);

server.ready(() => {
  console.log(`Listening at http://localhost:${port}`);
});
