import { Button, Container, Flex, Icon, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { VscAdd } from 'react-icons/vsc';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { PrefretchProduct } from "../../hooks/server";
import { useCan } from "../../hooks/useCan";
import { producsProps } from "../../components/@types";

export default function Produto({ products }: producsProps) {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
    };
    const isUsers = useCan({
        permissions: ['admin'],
        redirect: false
    })
    async function handlePrefetch(id: string) {
        PrefretchProduct(id)
    }
    return (
        <Layout>
            <Flex
                flexDir='column'
                padding='2rem 0'
                w='100%'
                maxW={1180}
                margin='0 auto'
            >
                {!!isUsers && (
                    <Flex>
                        <Link
                            href={`/produtos/criar-novo`}
                        >
                            <Button
                                size='sm'
                                bgColor='green.700'
                                _hover={{ opacity: '0.8' }}
                                rightIcon={<Icon as={VscAdd} />}
                            >
                                Novo produto
                            </Button>
                        </Link>

                    </Flex>
                )}

                {
                    products === undefined ? (
                        <Container textAlign='center'>
                            <Text>Não há produtos a serem exibidos!</Text>
                        </Container>
                    ) : (
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            gap={8}
                            mt={10}
                        >
                            {
                                products.map(product => {
                                    return (
                                        <Flex
                                            w='100%'
                                            h='100%'
                                            maxW='sm'
                                            minH={500}
                                            flexDir='column'
                                            background='linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
                                            alignItems='center'
                                            justify='space-between'
                                            borderRadius={8}
                                            px={3}
                                            py={6}
                                        >
                                            <Container
                                                h='100%'
                                            >
                                                <Slider {...settings}>
                                                    {
                                                        product.images.map(item => {
                                                            return (
                                                                <Flex
                                                                    borderRadius={"md"}
                                                                    overflow={"hidden"}
                                                                >
                                                                    <Image
                                                                        objectFit='cover'
                                                                        src={item.url}
                                                                        boxSize='100%'
                                                                        minH={300}
                                                                        maxH={300}
                                                                    />
                                                                </Flex>
                                                            )
                                                        })
                                                    }
                                                </Slider>
                                            </Container>
                                            <Container>
                                                <Link
                                                    key={product.id}
                                                    href={`/produtos/${product.id}`}
                                                    onMouseEnter={() => handlePrefetch(`${product.id}`)}
                                                >
                                                    <Flex
                                                        w='100%'
                                                        justify='space-between'
                                                        bgColor='rgba(32, 32, 36, 0.9)'
                                                        p={5}
                                                        borderRadius={8}
                                                    >
                                                        <Text
                                                            transition='0.2s'
                                                            _hover={{ color: 'green.500' }}
                                                        >
                                                            {product.name}
                                                        </Text>
                                                        <Text
                                                            color='green.500'
                                                            fontWeight='bold'
                                                        >
                                                            {product.price}
                                                        </Text>
                                                    </Flex>
                                                </Link>
                                            </Container>
                                        </Flex>
                                    )
                                })
                            }
                        </SimpleGrid>
                    )
                }
            </Flex>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await api.get('/products')
    const products = response.data
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        },
        revalidate: 60
    }
}