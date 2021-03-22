"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const mongodb_2 = tslib_1.__importDefault(require("../modules/mongodb"));
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
            yield db.collection("items").updateMany({ _id: { $in: items.map(id => new mongodb_1.ObjectID(id)) } }, { $inc: { bought: 1 } });
            reply.send("Okay");
            client.close();
        }));
    });
}
exports.default = basicRoute;
