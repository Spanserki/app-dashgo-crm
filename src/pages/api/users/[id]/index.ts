import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    try {
        const response = await prisma.user.findUnique({
            where: {
                id: String(id)
            },
            include: { permissions: true }
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({ message: 'Usuário não encontrado!' })
    }
}