import {
    Avatar,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Icon,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spinner,
    Tab,
    TabIndicator,
    TabList,
    Tabs,
    Text,
    useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartFill, BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link as ReactLink } from 'react-scroll';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { useCart } from "../../context/CartContext";
import { DetailsProduct } from "../../hooks/server";
import { avaliations } from "../../utils/dataAvaliations";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Detalhes() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const [isLoadingPurchaseProduct, setIsLoadingPurchaseProduct] = useState(false);
    const [quantity, setQuantity] = useState<number>(1)
    const [heartColor, setHeartColor] = useState<Boolean>(false)
    const toast = useToast();
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, error } = DetailsProduct(`${id}`)
    // console.log(data)

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
    const { handleProduct } = useCart();
    return (
        <Layout>
            {isLoading ? (
                <Flex w='100%' overflow='hidden'>
                    <Center w='100%'><Spinner /></Center>
                </Flex>
            ) : error ? (
                <Flex w='100%' justify='center'>
                    <Text>Produto não encontrado</Text>
                </Flex>
            ) : (
                <Flex
                    flexDir='column'
                >
                    <Button
                        as={Link}
                        href="/produtos"
                        w='fit-content'
                        size="xs"
                        background='linear-gradient(130deg, #1ea483 0%, #7465d4 100%)'
                        _hover={{ opacity: '0.8' }}
                        leftIcon={<Icon as={RiArrowGoBackLine} fontSize="16px" />}
                    >
                        Voltar ao catálogo
                    </Button>
                    {
                        data.map(item => {
                            return (
                                <Flex
                                    key={item.id}
                                    w='100%'
                                    pt={4}
                                >
                                    <Flex
                                        w='100%'
                                        flexDir={{ base: 'column', md: 'column', lg: 'row' }}
                                        gap={6}
                                        align='center'
                                    >
                                        <Container
                                            h='100%'
                                            w='100%'
                                            bgColor='white'
                                            rounded={"base"}
                                            py={8}
                                        >
                                            <Slider {...settings} arrows={false}>
                                                {
                                                    item.images?.map(img => {
                                                        return <Image
                                                            src={img.url}
                                                            objectFit='contain'
                                                            w='100%'
                                                            maxH='sm'
                                                        />
                                                    })
                                                }
                                            </Slider>
                                            <Button
                                                colorScheme="transparent"
                                                w='fit-content'
                                                p={0}
                                                _hover={{ opacity: '0.7' }}
                                                onClick={() => setHeartColor(!heartColor)}
                                                position='relative'
                                            >
                                                <Icon
                                                    as={AiFillHeart}
                                                    fontSize={34}
                                                    color={!!heartColor ? 'red' : 'gray'}
                                                />
                                            </Button>
                                        </Container>

                                        <Flex
                                            w='100%'
                                            h='100%'
                                            maxW={600}
                                            gap={4}
                                            flexDir='column'
                                            justify='space-between'
                                        >
                                            <Flex
                                                flexDir='column'
                                                gap={3}
                                            >
                                                <Text
                                                    fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    color='green.600'
                                                    fontWeight='black'
                                                    fontSize={20}
                                                >
                                                    R$ {item.price}
                                                </Text>

                                                <Flex
                                                    as={ReactLink}
                                                    href="/#avaliations"
                                                    to="avaliations"
                                                    duration={500}
                                                    smooth={true}
                                                    align='center'
                                                >
                                                    <Icon as={BsFillStarFill} color='yellow.400' />
                                                    <Icon as={BsFillStarFill} color='yellow.400' />
                                                    <Icon as={BsFillStarFill} color='yellow.400' />
                                                    <Icon as={BsStarHalf} color='yellow.400' />

                                                    <Text pl={2}>3 vendido(s)</Text>
                                                </Flex>
                                                <Flex
                                                    align='center'
                                                    gap={2}
                                                >
                                                    <Text color='gray.100'>quantidade</Text>

                                                    <NumberInput
                                                        focusBorderColor="red"
                                                        defaultValue={1}
                                                        size='sm'
                                                        maxW={20}
                                                        max={20}
                                                        min={1}
                                                    >
                                                        <NumberInputField
                                                            borderColor='#2D3748'
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper
                                                                color='gray.200'
                                                                borderColor='#2D3748'
                                                                onClick={() => setQuantity(quantity + 1)}
                                                            />
                                                            <NumberDecrementStepper
                                                                color='gray.200'
                                                                borderColor='#2D3748'
                                                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
                                                            />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Flex>
                                                <Box display='flex' alignItems='end' gap={4}>
                                                    <Text color='gray.100'>tamanhos:</Text>
                                                    <Tabs position="relative" variant="unstyled">
                                                        <TabList>
                                                            <Tab>P</Tab>
                                                            <Tab>M</Tab>
                                                            <Tab>G</Tab>
                                                            <Tab>GG</Tab>
                                                        </TabList>
                                                        <TabIndicator
                                                            mt="-1.5px"
                                                            height="2px"
                                                            bg="blue.500"
                                                            borderRadius="1px"
                                                        />
                                                    </Tabs>
                                                </Box>
                                            </Flex>
                                            <Flex
                                                flexDir='column'
                                                color='gray.200'
                                            >
                                                <Text>{item.description}</Text>
                                            </Flex>
                                            <Box display='flex' gap={2}>
                                                <Button
                                                    colorScheme="green"
                                                    leftIcon={<Icon as={BsFillCartFill} />}
                                                    variant='outline'
                                                    _hover={{ borderColor: 'green.300' }}
                                                    onClick={() => handleProduct({
                                                        id: item.id,
                                                        name: item.name,
                                                        price: item.price,
                                                        quantity: quantity,
                                                        url: item.images.map(img => { return { url: img.url } }),
                                                        description: item.description
                                                    })}
                                                >
                                                    Adicionar ao carrinho
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    bgColor='green.700'
                                                    _hover={{ opacity: '0.7' }}
                                                    isLoading={isLoadingPurchaseProduct}
                                                >
                                                    Comprar agora
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                    <Flex
                        id="avaliations"
                        flexDir='column'
                        py={14}
                    >
                        <Flex
                            w='100%'
                            align='center'
                            justify='center'
                            gap={2}
                        >
                            <Text fontSize='lg'>Avaliaçoes</Text>
                            <Flex>
                                <Icon as={BsFillStarFill} color='yellow.400' />
                                <Icon as={BsFillStarFill} color='yellow.400' />
                                <Icon as={BsFillStarFill} color='yellow.400' />
                                <Icon as={BsFillStarFill} color='yellow.400' />
                                <Icon as={BsFillStarFill} color='yellow.400' />
                            </Flex>
                        </Flex>
                        {avaliations.map(item => {
                            let starsPositives: any = [];
                            let starsNegatives: any = [];
                            for (let i = 0; i <= item.starts - 1; i++) {
                                starsPositives.push(i)
                            }
                            for (let i = starsPositives.length + 1; i <= 5; i++) {
                                starsNegatives.push(i)
                            }
                            return (
                                <Flex
                                    key={item.id}
                                    flexDir='column'
                                    bgColor='gray.800'
                                    rounded='sm'
                                    mt={4}
                                    py={2}
                                >
                                    <Flex
                                        align='center'
                                        gap={2}
                                    >
                                        <Avatar name={item.name} src={item.img} />
                                        <Flex
                                            flexDir='column'
                                        >
                                            <Text color='gray.100'>{item.name}</Text>
                                            <Flex
                                                gap={2}
                                            >
                                                <Flex>
                                                    {starsPositives.map(star => {
                                                        return <Icon as={BsFillStarFill} color='yellow.400' />
                                                    })}
                                                    {starsNegatives.map(star => {
                                                        return <Icon as={BsStar} color='yellow.400' />
                                                    })}
                                                </Flex>
                                                <Text
                                                    fontSize='small'
                                                    color='gray.300'
                                                >
                                                    {item.date}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Text fontWeight='bold' p={2}>{item.title}</Text>
                                    <Text
                                        pl={2}
                                        fontWeight='hairline'
                                    >
                                        {item.description}
                                    </Text>
                                </Flex>
                            )
                        })}

                    </Flex>
                </Flex>
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