import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

async function router(server: FastifyInstance, { path: { resolve }, fs }: any): Promise<void> {
  server.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    fs.readFile(resolve("./package.json"), "utf8", (err: Error, data: string) => {
      reply.send(`Welcome to PD server ${JSON.parse(data).version}`);
    });
  });
}

if (2 == 2) {
}

export default router;
