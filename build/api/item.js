"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const mongodb_2 = tslib_1.__importDefault(require("../modules/mongodb"));
function basicRoute(server) {
    server.get("/getItem", (req, reply) => {
        const total = req.query;
        const type = total.type;
        mongodb_2.default(({ db, client }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data;
            if (type === "*")
                data = yield db.collection("items").find({}).toArray();
            else
                data = yield db
                    .collection("items")
                    .find({ _id: new mongodb_1.ObjectID(type) })
                    .toArray();
            reply.send(data);
            client.close();
        }));
    });
}
exports.default = basicRoute;
