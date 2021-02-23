"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function itemRoute(server) {
    server.get("/", (req, reply) => {
        fs_1.readFile(path_1.resolve("./package.json"), (err, data) => {
            if (err)
                console.error(err.message);
            reply.send(`Welcome to PD server ${JSON.parse(data.toString("utf-8")).version}`);
        });
    });
    server.setNotFoundHandler((req, reply) => {
        reply.code(404).send(`Sorry, but the route ${req.url} does not exist.`);
    });
}
exports.default = itemRoute;
