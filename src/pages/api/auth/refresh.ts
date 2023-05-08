import { decode, sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../components/lib/prisma';
import { v4 as uuid } from 'uuid'

export type DecodedToken = {
    sub: string;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;
    const { refreshToken } = req.body;

    if (!authorization) {
        return res.status(401).json({ erro: true, code: 'token-invalid', message: 'Token não existe' })
    }

    const [, token] = authorization?.split(' ')

    if (!token) {
        return res.status(401).json({ error: true, code: 'token-invalid', message: 'Token não existe' })
    }

    try {
        const decoded = decode(token as string) as DecodedToken

        const getUser = await prisma.user.findUnique({
            where: { email: decoded.sub }
        })

        if (!getUser) {
            return res.status(401).json({ error: true, message: 'Usuário não existe' })
        }

        if (!refreshToken) {
            return res.status(401).json({ message: 'refresh-token é obrigatório' })
        }

        const response = await prisma.user.findUnique({
            where: {
                refreshToken
            }
        })

        if (!response) {
            return res.status(404).json({ error: true, code: 'refreshToken-invalid', message: 'refresh token inválido' })
        }

        const newRefreshToken = uuid();
        const user = await prisma.user.update({
            where: {
                id: decoded.sub
            },
            data: {
                refreshToken: newRefreshToken
            }
        })

        const newToken = sign({ id: decoded.sub }, process.env.JWT_SECRET_CLIENT, {
            expiresIn: 60 * 60 * 24
        })

        res.status(200).json({
            newToken,
            newRefreshToken,
            id: response.id,
            name: response.name,
            email: response.email
        })

    } catch (error) {
        return res.status(401).json({ error: true, code: 'token-invalid', message: 'Formato do token inválido' })
    }
}