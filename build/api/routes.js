"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const basic_1 = tslib_1.__importDefault(require("./basic"));
const item_1 = tslib_1.__importDefault(require("./item"));
const payment_1 = tslib_1.__importDefault(require("./payment"));
function router(server) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        item_1.default(server);
        basic_1.default(server);
        payment_1.default(server);
    });
}
exports.default = router;
