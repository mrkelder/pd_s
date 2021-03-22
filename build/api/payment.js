"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const stripe_1 = tslib_1.__importDefault(require("stripe"));
dotenv_1.config();
const stripe = new stripe_1.default(process.env.STRIPE, {
    apiVersion: "2020-08-27"
});
function payment(fastify) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        fastify.get("/getPaymentSecret", (req, reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const total = req.query;
            const price = Number(total.price);
            const { description } = total;
            const paymentIntent = yield stripe.paymentIntents.create({
                amount: Math.ceil(price),
                currency: "cad",
                payment_method_types: ["card"],
                description
            });
            reply.send(paymentIntent.client_secret);
        }));
    });
}
exports.default = payment;
