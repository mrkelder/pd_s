"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const mongodb_2 = tslib_1.__importDefault(require("../modules/mongodb"));
const fabric_1 = require("fabric");
const canvas_1 = require("canvas");
const fs_1 = require("fs");
const path_1 = require("path");
canvas_1.registerFont(path_1.resolve("fonts/Righteous-Regular.ttf"), { family: "Bold" });
canvas_1.registerFont(path_1.resolve("fonts/Kalam-Regular.ttf"), { family: "Cursive" });
canvas_1.registerFont(path_1.resolve("fonts/Roboto-Regular.ttf"), { family: "Roboto" });
canvas_1.registerFont(path_1.resolve("fonts/Hanalei-Regular.ttf"), { family: "Custom2" });
canvas_1.registerFont(path_1.resolve("fonts/LongCang-Regular.ttf"), { family: "Custom3" });
canvas_1.registerFont(path_1.resolve("fonts/Ranchers-Regular.ttf"), { family: "Custom4" });
canvas_1.registerFont(path_1.resolve("fonts/ReggaeOne-Regular.ttf"), { family: "Custom5" });
canvas_1.registerFont(path_1.resolve("fonts/Cyberpunk-Regular.ttf"), { family: "Custom6" });
function basicRoute(server) {
    server.get("/getItem", (req, reply) => {
        const total = req.query;
        const type = total.type;
        const limit = Number(total.limit);
        const skip = Number(total.skip);
        if (type === "*" || mongodb_1.ObjectID.isValid(type))
            mongodb_2.default(({ db, client }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let data;
                if (type === "*")
                    data = yield db
                        .collection("items")
                        .find({})
                        .skip(isNaN(skip) ? 0 : skip)
                        .limit(isNaN(limit) ? 0 : limit)
                        .toArray();
                else
                    data = yield db
                        .collection("items")
                        .find({ _id: new mongodb_1.ObjectID(type) })
                        .skip(isNaN(skip) ? 0 : skip)
                        .limit(isNaN(limit) ? 0 : limit)
                        .toArray();
                reply.send(data);
                client.close();
            }));
        else
            reply.code(404).send("Sorry, but your request is invalid");
    });
    server.put("/addBought", (req, reply) => {
        const items = req.body;
        mongodb_2.default(({ client, db }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield db.collection("items").updateMany({ _id: { $in: items.filter(id => !/unique/.test(id)).map(id => new mongodb_1.ObjectID(id)) } }, { $inc: { bought: 1 } });
            reply.send("Okay");
            client.close();
        }));
    });
    server.post("/createImgForCustom", (req, reply) => {
        function drawCanvas(elements, index, uniqueId) {
            const canvas = new fabric_1.fabric.StaticCanvas(null, { width: 150 * 2, height: 175 * 2 });
            canvas.backgroundColor = "#fff";
            for (const i of elements[index]) {
                const { fontSize, fontFamily, left, top, width, height, fill, scaleX, scaleY, angle } = i;
                const textbox = new fabric_1.fabric.Textbox(i.text, {
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
            fs_1.writeFile(path_1.join(__dirname, `../../static/templates/${uniqueId}_${index}.png`), base64Data, "base64", () => { });
        }
        const { elements, uniqueId } = req.body;
        drawCanvas(elements, 0, uniqueId);
        drawCanvas(elements, 1, uniqueId);
        reply.send("Okay");
    });
}
exports.default = basicRoute;
