"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fastify_1 = tslib_1.__importDefault(require("fastify"));
const fastify_static_1 = tslib_1.__importDefault(require("fastify-static"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const routes_1 = tslib_1.__importDefault(require("./api/routes"));
const server = fastify_1.default({
    ignoreTrailingSlash: true
});
server.register(routes_1.default, { fs: fs_1.default, path: path_1.default });
server.register(fastify_static_1.default, {
    root: path_1.default.resolve('./static'),
    prefix: '/static/'
});
server.listen(8080);
