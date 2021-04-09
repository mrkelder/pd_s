import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { ObjectID } from "mongodb";
import mongodbFunc from "../modules/mongodb";
import { fabric } from "fabric";
import { registerFont } from "canvas";
import { writeFile } from "fs";
import { join, resolve } from "path";

interface StringQuery {
  type: string;
  limit: string;
  skip: string;
}

// Adding fonts
registerFont(resolve("fonts/Righteous-Regular.ttf"), { family: "Bold" });
registerFont(resolve("fonts/Kalam-Regular.ttf"), { family: "Cursive" });
registerFont(resolve("fonts/Roboto-Regular.ttf"), { family: "Roboto" });
registerFont(resolve("fonts/Hanalei-Regular.ttf"), { family: "Custom2" });
registerFont(resolve("fonts/LongCang-Regular.ttf"), { family: "Custom3" });
registerFont(resolve("fonts/Ranchers-Regular.ttf"), { family: "Custom4" });
registerFont(resolve("fonts/ReggaeOne-Regular.ttf"), { family: "Custom5" });
registerFont(resolve("fonts/Cyberpunk-Regular.ttf"), { family: "Custom6" });

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

  server.put("/addBought", (req: FastifyRequest, reply: FastifyReply) => {
    const items = req.body as string[];
    mongodbFunc(async ({ client, db }) => {
      await db.collection("items").updateMany({ _id: { $in: items.filter(id => !/unique/.test(id)).map(id => new ObjectID(id)) } }, { $inc: { bought: 1 } });
      reply.send("Okay");
      client.close();
    });
  });

  server.post("/createImgForCustom", (req: FastifyRequest, reply: FastifyReply) => {
    function drawCanvas(elements: any, index: number, uniqueId: string) {
      const canvas = new fabric.StaticCanvas(null, { width: 150 * 2, height: 175 * 2 });
      canvas.backgroundColor = "#fff";
      for (const i of elements[index]) {
        const { fontSize, fontFamily, left, top, width, height, fill, scaleX, scaleY, angle } = i;
        const textbox = new fabric.Textbox(i.text, {
          fontSize,
          left: left * 2,
          top: top * 2,
          width,
          height,
          fill,
          scaleX: scaleX * 2,
          scaleY: scaleY * 2,
          angle,
          fontFamily
        });
        canvas.add(textbox).renderAll();
      }
      const base64Data = canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
      writeFile(join(__dirname, `../../static/templates/${uniqueId}_${index}.png`), base64Data, 'base64', () => { });
    }

    const { elements, uniqueId } = req.body as any; // eslint-disable-line 
    drawCanvas(elements, 0, uniqueId);
    drawCanvas(elements, 1, uniqueId);
    reply.send("Okay");
  });
}

export default basicRoute;
