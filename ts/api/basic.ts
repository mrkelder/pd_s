import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { readFile } from "fs";
import { resolve } from "path";

function itemRoute(server: FastifyInstance): void {
  server.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    readFile(resolve("./package.json"), (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) console.error(err.message);
      reply.send(`Welcome to PD server ${JSON.parse(data.toString("utf-8")).version}`);
    });
  });

  server.setNotFoundHandler((req: FastifyRequest, reply: FastifyReply) => {
    reply.code(404).send(`Sorry, but the route ${req.url} does not exist.`);
  });
}

export default itemRoute;
