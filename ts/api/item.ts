import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { ObjectID } from "mongodb";
import mongodbFunc from "../modules/mongodb";

interface StringQuery {
  type: string;
  limit: string;
  skip: string;
}

function basicRoute(server: FastifyInstance): void {
  server.get("/getItem", (req: FastifyRequest, reply: FastifyReply) => {
    const total: StringQuery = req.query as StringQuery;
    const type: string = total.type;
    const limit = Number(total.limit);
    const skip = Number(total.skip);
    if (type === "*" || ObjectID.isValid(type))
      mongodbFunc(async ({ db, client }) => {
        let data;
        if (type === "*")
          data = await db
            .collection("items")
            .find({})
            .skip(isNaN(skip) ? 0 : skip)
            .limit(isNaN(limit) ? 0 : limit)
            .toArray();
        else
          data = await db
            .collection("items")
            .find({ _id: new ObjectID(type) })
            .skip(isNaN(skip) ? 0 : skip)
            .limit(isNaN(limit) ? 0 : limit)
            .toArray();
        reply.send(data);
        client.close();
      });
    else reply.code(404).send("Sorry, but your request is invalid");
  });
}

export default basicRoute;
