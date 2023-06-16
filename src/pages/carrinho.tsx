import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Icon,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Tooltip
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { UseCartStorage } from "../utils/useCartStorage";

export default function Carrinho() {
    const { cartStorage } = UseCartStorage();
    const { removeProduct, updateQtdProduct } = useCart();
    return (
        <Layout>
            <Box>
                <Button
                    as={Link}
                    href="/produtos"
                    size="xs"
                    w='fit-content'
                    background='linear-gradient(130deg, #1ea483 0%, #7465d4 100%)'
                    _hover={{ opacity: '0.8' }}
                    leftIcon={<Icon as={RiArrowGoBackLine} fontSize="16px" />}
                >
                    Voltar ao catálogo
                </Button>
            </Box>
            {cartStorage.length === 0 ? (
                <Flex
                    flexDir='column'
                    align='center'
                    pt={10}
                    gap={20}
                >
                    <Text color='gray.100'>Você ainda não adicionou produtos ao seu carrinho!</Text>
                    <Icon
                        as={BsFillCartPlusFill}
                        color='gray'
                        boxSize={20}
                    />
                </Flex>
            ) : (
                <Flex
                    flexDir='column'
                    gap={6}
                    bgColor='gray.800'
                    p={4}
                    rounded='xl'
                >
                    {cartStorage.map(item => {
                        return (
                            <>
                                <Box
                                    key={item.id}
                                    display='flex'
                                    w='100%'
                                    maxH='3xs'
                                >
                                    <Checkbox pr={4} />
                                    <Image
                                        src={item.url[0].url}
                                        w={200}
                                    />
                                    <Box
                                        display='flex'
                                        flexDir='column'
                                        gap={2}
                                        px={4}
                                        justifyContent='space-around'
                                    >
                                        <Text>{item.name}</Text>
                                        <Text
                                            color='green.600'
                                            fontWeight='black'
                                        >
                                            R$ {item.price}
                                        </Text>
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            gap={2}
                                        >
                                            <NumberInput
                                                focusBorderColor="red"
                                                defaultValue={item.quantity}
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
                                                        onClick={() => updateQtdProduct(item.id, item.quantity + 1)}

                                                    />
                                                    <NumberDecrementStepper
                                                        color='gray.200'
                                                        borderColor='#2D3748'
                                                        onClick={() => updateQtdProduct(item.id, item.quantity - 1)}
                                                    />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Box>
                                        <Text color='gray.100' fontSize='sm'>
                                            {item.description}
                                        </Text>
                                    </Box>
                                    <Tooltip
                                        hasArrow
                                        label='Remover produto ?'
                                        placement="right"

                                    >
                                        <Button
                                            colorScheme="tranparent"
                                            _hover={{ color: 'green.500' }}
                                            p={0}
                                            onClick={() => removeProduct(item.id)}
                                        >
                                            <Icon
                                                as={AiOutlineDelete}
                                                fontSize={20}
                                                color='gray.400'
                                            />
                                        </Button>
                                    </Tooltip>
                                </Box>
                                <Divider borderColor='gray.700' />
                            </>

                        )
                    })}

                </Flex>
            )}
        </Layout>
    )
}