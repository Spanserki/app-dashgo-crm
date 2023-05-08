import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'token-invalid' })
        }

        const [, token] = authorization?.split(' ');

        if (!token) {
            return res.status(401).json({ message: 'token-expired' })
        }

        const decode = jwt.verify(token as string, process.env.JWT_SECRET_CLIENT)

        const getUser = await prisma.user.findUnique({
            where: {
                id: String(decode.sub)
            },
            include: { permissions: true }
        })

        const { name, email, permissions, id } = getUser;

        return res.status(200).json({name, email, permissions, id})
    } catch (error) {
        return res.status(401).json({error: true, code: 'token-expired', message: 'Token invalid'})
    }
}