import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../components/lib/stripe";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { priceId, productId } = req.body;

    if (!priceId) {
        return res.status(401).json({ message: 'A identificação do produto não foi encontrada!' })
    }

    try {
        const cancelUrl = `${process.env.RES_STRIPE_LOCAL}/produtos/${productId}`;
        const successUrl = `${process.env.RES_STRIPE_LOCAL}/produtos/sucesso?session_id={CHECKOUT_SESSION_ID}`;

        // const cancelUrl = `${process.env.RES_STRIPE_PRODUCTION}/produtos/${productId}`;
        // const successUrl = `${process.env.RES_STRIPE_PRODUCTION}/produtos/sucesso?session_id={CHECKOUT_SESSION_ID}`;

        const checkout = await stripe.checkout.sessions.create({
            success_url: successUrl,
            cancel_url: cancelUrl,
            mode: 'payment',
            line_items: [
                {
                    price: String(priceId),
                    quantity: 1
                }
            ]
        })

        return res.status(201).json({
            checkoutUrl: checkout.url
        });

    } catch (error) {
        return res.status(400).json({ message: 'Ocorreu um erro com sua transação, tente mais tarde' })
    }
}