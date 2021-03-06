import { FastifyInstance } from "fastify";
import itemRoute from "./basic";
import basicRoute from "./item";
import payment from './payment';

async function router(server: FastifyInstance): Promise<void> {
  basicRoute(server);
  itemRoute(server);
  payment(server);
}

export default router;
