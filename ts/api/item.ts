import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { ObjectID } from "mongodb";
import mongodbFunc from "../modules/mongodb";

interface StringQuery {
  type: string;
}

function basicRoute(server: FastifyInstance): void {
  server.get("/getItem", (req: FastifyRequest, reply: FastifyReply) => {
    const total: StringQuery = req.query as StringQuery;
    const type: string = total.type;
    mongodbFunc(async ({ db, client }) => {
      let data;
      if (type === "*") data = await db.collection("items").find({}).toArray();
      else
        data = await db
          .collection("items")
          .find({ _id: new ObjectID(type) })
          .toArray();
      reply.send(data);
      client.close();
    });
  });
}

export default basicRoute;
