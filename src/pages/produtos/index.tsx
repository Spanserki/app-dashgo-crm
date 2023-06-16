import { Button, Center, Container, Flex, Icon, Image, Select, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { VscAdd } from 'react-icons/vsc';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "../../components/Layout";
import { FindProducts, GetCategories, PrefretchProduct } from "../../hooks/server";
import { useCan } from "../../hooks/useCan";

export default function Produto() {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const isUsers = useCan({
        permissions: ['admin'],
        redirect: false
    })
    const [searchCategoryId, setSearchCategoryId] = useState('');
    const { data: dataCategories } = GetCategories();
    const { data, isLoading, error, refetch } = FindProducts(`${searchCategoryId}`);

    useEffect(() => {
        refetch();
    }, [searchCategoryId])

    async function handlePrefetch(id: string) {
        PrefretchProduct(id)
    }
    return (
        <Layout>
            <Flex
                flexDir='column'
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

                <Flex
                    w='100%'
                    justify='space-between'
                    pt={6}
                    gap={2}
                >
                    <Flex align='center' gap={2}>
                        <Icon as={BsFilter} boxSize={6} />
                        <Text>Filtros</Text>
                    </Flex>

                    <Select
                        placeholder="Todos"
                        maxW={200}
                        size='xs'
                        border='none'
                        bgColor='gray.50'
                        color='gray.900'
                        borderBottomRadius='sm'
                        onChange={(e) => setSearchCategoryId(e.target.value)}
                    >
                        {dataCategories?.map(item => {
                            return (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>
                            )
                        })}
                    </Select>
                </Flex>

                {isLoading ? (
                    <Flex w='100%' h='100%' overflow='hidden'>
                        <Center w='100%'><Spinner /></Center>
                    </Flex>
                ) : error ? (
                    <Flex w='100%' justify='center'>
                        <Text>Nenhum produto no estoque!</Text>
                    </Flex>
                ) : data.length === 0 ? (
                    <Flex
                        w='100%'
                        textAlign='center'
                        pt={8}
                    >
                        <Container>
                            <Text>Ainda não há produtos nessa categoria!</Text>

                            <Image
                                src="/productNot.png"
                            />
                        </Container>
                    </Flex>
                ) : (
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        gap={8}
                        mt={2}
                    >
                        {
                            data.map(product => {
                                return (
                                    <Flex
                                        key={product.id}
                                        w='100%'
                                        h='100%'
                                        maxW='sm'
                                        minH={500}
                                        flexDir='column'
                                        bgColor='white'
                                        alignItems='center'
                                        justify='space-between'
                                        borderRadius={8}
                                        px={3}
                                        py={6}
                                    >
                                        <Container
                                            h='100%'
                                        >
                                            <Slider {...settings} arrows={false}>
                                                {
                                                    product.images.map(item => {
                                                        return (
                                                            <Flex
                                                                key={item.id}
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
                                                        maxW={180}
                                                        isTruncated
                                                    >
                                                        {product.name}
                                                    </Text>
                                                    <Text
                                                        color='green.500'
                                                        fontWeight='bold'
                                                    >
                                                        R$ {product.price}
                                                    </Text>
                                                </Flex>
                                            </Link>
                                        </Container>
                                    </Flex>
                                )
                            })
                        }
                    </SimpleGrid>
                )}
            </Flex>
        </Layout >
    )
}