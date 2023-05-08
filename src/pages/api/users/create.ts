import { NextApiRequest, NextApiResponse } from "next";
import { hash } from 'bcrypt'
import { prisma } from "../../../components/lib/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { values, permissions } = req.body;
    const { name, email, password } = values;

    const hashPassword = await hash(password, 10)

    const arrayPermissions: any = [];

    Object.keys(permissions).forEach((item: any) => {
        arrayPermissions.push({
            value: permissions[item].value,
        })
    });


    const getUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!!getUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado' })
    }


    try {
        const response = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                permissions: {
                    connect: arrayPermissions
                }
            }
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: 'Erro ao tentar efetuar o cadastro' })
    }
}