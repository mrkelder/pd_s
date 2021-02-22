import { FastifyInstance } from "fastify";
import itemRoute from "./basic";
import basicRoute from "./item";

async function router(server: FastifyInstance): Promise<void> {
  basicRoute(server);
  itemRoute(server);
}

export default router;
