import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../components/lib/stripe";
import Stripe from "stripe";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { sessionId } = req.query;

    try {
        const session = await stripe.checkout.sessions.retrieve(String(sessionId), {
            expand: ['line_items', 'line_items.data.price.product']
        })

        const customerName = session.customer_details.name;
        const product = session.line_items.data[0].price.product as Stripe.Product

        return res.status(200).json({
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        })

    } catch (error) {
        return res.status(400).json({message: 'Erro ao buscar o produto!'})
    }
}