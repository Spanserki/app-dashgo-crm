import { Button, Center, Container, Flex, Heading, Icon, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { GetProduct } from "../../hooks/server";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Detalhes() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
    };
    const [isLoadingPurchaseProduct, setIsLoadingPurchaseProduct] = useState(false);
    const toast = useToast();
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, error } = GetProduct(`${id}`)

    async function handlePurchaseProduct(priceId: string) {
        setIsLoadingPurchaseProduct(true);

        try {
            const response = await api.post('/products/checkout', {
                priceId,
                productId: id
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;

        } catch (err) {
            toast({
                position: 'top-right',
                title: 'Ops!',
                description: `Ocorreu um erro com sua transação, tente mais tarde`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });

            setIsLoadingPurchaseProduct(false);
        }
    }

    return (
        <Layout>

            {isLoading ? (
                <Flex w='100%' h='100%' overflow='hidden'>
                    <Center w='100%'><Spinner /></Center>
                </Flex>
            ) : error ? (
                <Flex w='100%' justify='center'>
                    <Text>Produto não encontrado</Text>
                </Flex>
            ) : (
                <>
                    <Link href="/produtos">
                        <Button
                            size="xs"
                            background='linear-gradient(130deg, #1ea483 0%, #7465d4 100%)'
                            _hover={{ opacity: '0.8' }}
                            leftIcon={<Icon as={RiArrowGoBackLine} fontSize="16px" />}
                        >
                            Voltar ao catálogo
                        </Button>
                    </Link>
                    {
                        data.map(item => {
                            return (
                                <Flex
                                    w='100%'
                                    pt={10}
                                >
                                    <Flex
                                        w='100%'
                                        flexDir={{ base: 'column', md: 'column', lg: 'row' }}
                                        gap={5}
                                    >
                                        <Container
                                            background='linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
                                            rounded={"base"}
                                        >
                                            <Slider {...settings}>
                                                {
                                                    item.images?.map(img => {
                                                        return (
                                                            <Flex
                                                                key={img.id}
                                                                borderRadius={"md"}
                                                                overflow={"hidden"}
                                                            >
                                                                <Image
                                                                    objectFit='cover'
                                                                    src={img.url}
                                                                    boxSize='100%'
                                                                    h={500}
                                                                />
                                                            </Flex>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        </Container>

                                        <Flex
                                            w='50%'
                                            flexDir='column'
                                            justify='space-between'
                                            p={{ base: 0, md: 4, lg: 4 }}
                                            gap={5}
                                        >
                                            <Flex
                                                flexDir='column'
                                                gap={3}
                                            >
                                                <Heading>{item.name}</Heading>
                                                <Text
                                                    color='green.600'
                                                    fontWeight='black'
                                                    fontSize={20}
                                                >
                                                    R$ {item.price}
                                                </Text>
                                            </Flex>

                                            <Flex
                                                flexDir='column'
                                                gap={8}
                                                color='gray.200'
                                            >
                                                <Text>{item.description}</Text>
                                            </Flex>

                                            <Button
                                                type="submit"
                                                bgColor='green.700'
                                                _hover={{ opacity: '0.7' }}

                                                isLoading={isLoadingPurchaseProduct}
                                            >
                                                Comprar agora
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })
                    }

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