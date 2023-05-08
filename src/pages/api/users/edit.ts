import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { id, values, permissions } = req.body;
    const { name, email } = values;

    console.log(permissions)

    try {
        const arrayPermissions: any = [];

        Object.keys(permissions).forEach((item: any) => {
            arrayPermissions.push({
                value: permissions[item].value,
            })
        });

        const response = await prisma.user.findUnique({
            where: { id }
        })

        if (!response) {
            return res.status(400).json({ message: 'Usuário não encontrado' })
        }

        const removePermissions = await prisma

        const editUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                permissions: {
                    set: arrayPermissions
                }
            }
        })

        return res.status(200).json({ message: 'Sucesso' })

    } catch (error) {
        return res.status(400).json({ message: 'Ocorreu um erro!' })
    }
}