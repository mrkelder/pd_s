import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { config } from 'dotenv';
import Stripe from 'stripe';

config();

interface StringQuery {
  price: string;
  description: string;
}

const stripe = new Stripe(process.env.STRIPE as string, {
  apiVersion: '2020-08-27',
});

async function payment(fastify: FastifyInstance) {
  fastify.get("/getPaymentSecret", async (req: FastifyRequest, reply: FastifyReply) => {
    const total = req.query as StringQuery;
    const price = Number(total.price);
    const { description } = total;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.ceil(price),
      currency: 'cad',
      payment_method_types: ['card'],
      description,
    });
    reply.send(paymentIntent.client_secret);
  });
};

export default payment;