import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    try {
        const response = await prisma.product.findMany({
            where: {
                id: String(id)
            },
            include: {
                images: true
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({ message: 'Produto não encontrado!' })
    }
}