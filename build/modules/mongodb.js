"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const assert_1 = require("assert");
const uri = "mongodb://localhost:27017";
function mognodbFunc(func) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        mongodb_1.MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
            assert_1.strictEqual(null, err);
            const db = client.db("PD");
            func({ client, db });
        });
    });
}
exports.default = mognodbFunc;
