"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function router(server, { path: { resolve }, fs }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        server.get("/", (req, reply) => {
            fs.readFile(resolve("./package.json"), "utf8", (err, data) => {
                reply.send(`Welcome to PD server ${JSON.parse(data).version}`);
            });
        });
    });
}
if (2 == 2) {
}
exports.default = router;
