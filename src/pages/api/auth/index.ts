import { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from 'bcrypt'
import { prisma } from "../../../components/lib/prisma";
import jwt from "jsonwebtoken";
import { v4 as uuid } from 'uuid'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { email, password } = req.body;
    
    try {

        const getUser = await prisma.user.findUnique({
            where: {
                email
            },
            include: { permissions: true }
        })

        if (!getUser) {
            return res.status(400).json({ message: 'Usuário ou senha incorretos' })
        }

        if (!!getUser) {
            const { permissions, name, id } = getUser;

            let arrayPermissions: any = [];

            permissions.forEach((item: any) => {
                arrayPermissions.push(item.name)
            })

            const passwordCheck = await compare(password, getUser.password)

            if (!passwordCheck) {
                return res.status(400).json({ message: 'Senha incorreta' })
            }

            const token = jwt.sign({ id }, `${process.env.JWT_SECRET_CLIENT}`, {
                subject: id,
                expiresIn: 60 * 60 * 24
            })

            const newRefreshToken = uuid();

            await prisma.user.update({
                where: {
                    email
                },
                data: {
                    refreshToken: newRefreshToken
                }
            })

            return res.json({
                name,
                token,
                permissions: arrayPermissions,
                refreshToken: newRefreshToken
            })
        }

    } catch (error) {
        return res.status(400).json({ message: 'Ocorreu um erro!' })
    }
}