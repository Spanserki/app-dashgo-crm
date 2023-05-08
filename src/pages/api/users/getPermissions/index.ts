import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const response = await prisma.permission.findMany({})

    return res.status(200).json(response)
}