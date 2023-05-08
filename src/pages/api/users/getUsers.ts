import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { page, perPage } = req.query;
    const pageStart = (Number(page) - 1) * Number(perPage);

    try {
        const count = await prisma.user.count({});
        const response = await prisma.user.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {permissions: true},
            skip: Number(pageStart),
            take: Number(perPage)
        });

        res.setHeader('x-total-count', count)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: 'Nenhum dado encontrado' })
    }
}