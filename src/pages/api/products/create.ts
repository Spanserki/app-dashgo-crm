import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../components/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { values } = req.body;
    const { nameCategory, description, nameProduct, price, images } = values;

    let arrayImages: any = [];

    Object.keys(images).forEach(item => {
        arrayImages.push({
            url: images[item].url
        })
    })

    try {

        const getProduct = await prisma.product.findUnique({
            where: {
                name: nameProduct
            }
        })

        if (!!getProduct) {
            return res.status(400).json({ message: 'Produto já cadastrado' })
        }

        const createProduct = await prisma.product.create({
            data: {
                name: nameProduct,
                description,
                price,
                images: {
                    createMany: {
                        data: arrayImages
                    }
                },
                category: {
                    connect: {
                        name: nameCategory
                    }
                }
            }
        })

        return res.status(200).json(createProduct)
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao tentar cadastrar o produto!' })
    }
}