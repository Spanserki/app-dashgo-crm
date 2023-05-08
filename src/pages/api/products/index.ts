import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await prisma.product.findMany({
            include: {
                images: true
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({ message: 'Produto não encontrado!' })
    }
}