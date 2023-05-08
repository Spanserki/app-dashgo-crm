import { Center, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { PurchasesSuccess } from "../../hooks/server";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Sucesso() {

    const router = useRouter();
    const { session_id } = router.query

    const { data, isLoading, error } = PurchasesSuccess(`${session_id}`)

    return (
        <Layout>
            {isLoading ? (
                <Flex w='100%' h='100%' overflow='hidden'>
                    <Center w='100%'><Spinner /></Center>
                </Flex>
            ) : error ? (
                <Flex w='100%' justify='center'>
                    <Text>Erro ao mostrar o produto</Text>
                </Flex>
            ) : (
                <>
                    <Flex
                        w='100%'
                        justify='center'
                        align='center'
                        pt={10}
                    >
                        <Flex
                            flexDir='column'
                            gap={10}
                            align='center'
                        >
                            <Heading>Compra efetuada!</Heading>

                            <Flex
                                borderRadius={8}
                                overflow='hidden'
                                background='linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
                            >
                                <Image
                                    src={data?.product.imageUrl}
                                    w='100%'
                                    h='100%'
                                    objectFit='cover'
                                    maxH={300}
                                    maxW={200}
                                />
                            </Flex>

                            <Flex
                                flexDir='column'
                                align='center'
                                gap={2}
                            >
                                <Text>
                                    Uhhull!, parabéns <strong>{data?.customerName}</strong>, sua <strong>{data?.product.name} </strong>
                                    já está a caminho da sua casa.
                                </Text>

                                <Text>Fique de olho no seu e-mail 📧😉</Text>
                            </Flex>

                            <Text>Agradecemos por comprar conosco ❤️</Text>

                            <Link
                                href='/produtos'
                            >
                                <Text
                                    color='green.500'
                                    _hover={{ textDecor: 'underline' }}
                                >
                                    Voltar ao catálogo
                                </Text>
                            </Link>
                        </Flex>
                    </Flex>

                </>
            )
            }

        </Layout>
    )
}

export const getServerSideProps = withSSRAuth(async () => {

    return {
        props: {},
    };
});