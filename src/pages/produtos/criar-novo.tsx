import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Icon,
    Input,
    Select,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { RiSave3Line } from 'react-icons/ri';
import { AiOutlineMinusCircle } from 'react-icons/ai'
import * as yup from 'yup';
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { GetCategories } from "../../hooks/server";
import { useCan } from "../../hooks/useCan";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { v4 } from 'uuid'
import { BsPlus } from "react-icons/bs";

const handleFormSchemaValidation = yup.object().shape({
    nameProduct: yup.string().required('Campo obrigatório').min(5, 'Mínimo 5 caracteres').max(80, 'Máximo 80 caracteres'),
    description: yup.string().required('Campo obrigatório'),
    price: yup.string().required('Campo obrigatório'),
    nameCategory: yup.string().required('Campo obrigatório'),
    images: yup.object().required('Adicione pelo menos uma imagem')
})

export default function CreateUser() {
    const isUsers = useCan({
        permissions: ['admin'],
        redirect: true
    })
    const toast = useToast();
    const [inputImage, setInputImage] = useState([]);
    const { data } = GetCategories();

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
        resolver: yupResolver(handleFormSchemaValidation)
    })

    const createProduct: SubmitHandler<any> = async values => {
        try {
            const response = await api.post('/products/create', {
                values
            }).then(res => console.log(res))

            toast({
                position: 'bottom',
                title: '😁',
                description: 'Produto criado com sucesso!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error: any) {
            toast({
                position: 'bottom',
                title: 'Ops!',
                description: `${error.response.data.message}`,
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        reset();
    }

    function handleInputImage() {
        const idInput = v4();
        const input = { id: idInput }
        setInputImage(previusState => [...previusState, input])
    }
    function handleDeleteInputImage(id: string) {
        const newInputsImage = inputImage.filter(response => {
            return response.id != id
        })
        setInputImage(newInputsImage)
    }

    return (
        <Layout>
            {
                !isUsers ? (
                    <Stack>
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                    </Stack>
                ) : (
                    <Flex
                        flexDir='column'
                        h='100vh'
                        flex={1}
                        borderRadius={8}
                        bgColor='gray.800'
                        p={5}
                    >
                        <Heading size='md' fontWeight='normal'>Criar produto</Heading>

                        <Divider my={6} />

                        <Flex
                            as='form'
                            onSubmit={handleSubmit(createProduct)}
                            flexDir='column'
                            gap={6}
                        >
                            <SimpleGrid
                                columns={{ base: 1, md: 3, lg: 3 }}
                                minWidth={240}
                                spacing={4}
                                w='100%'
                            >
                                <FormControl isInvalid={!!errors.nameCategory?.message}>

                                    <Text mb={2} color='gray.200'>Categoria do produto *</Text>
                                    <Select
                                        border='none'
                                        bgColor='gray.900'
                                        color='white'
                                        {...register('nameCategory')}
                                    >
                                        {data?.map(item => {
                                            return (
                                                <option
                                                    key={item.id}
                                                    value={item.name}
                                                    style={{
                                                        backgroundColor: '#171923',
                                                        color: 'white'
                                                    }}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        })}
                                    </Select>

                                    {!!errors.nameCategory?.message &&
                                        <FormErrorMessage>{`${errors.nameCategory.message}`}</FormErrorMessage>
                                    }
                                </FormControl>

                                <FormControl isInvalid={!!errors.nameProduct?.message}>

                                    <Text mb={2} color='gray.200'>Nome do produto *</Text>
                                    <Input
                                        focusBorderColor="green.500"
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="Escreva"
                                        {...register('nameProduct')}
                                    />

                                    {!!errors.nameProduct?.message &&
                                        <FormErrorMessage>{`${errors.nameProduct.message}`}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.price?.message}>

                                    <Text mb={2} color='gray.200'>Valor do produto *</Text>
                                    <Input
                                        focusBorderColor="green.500"
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="R$"

                                        {...register('price')}
                                    />

                                    {!!errors.price?.message &&
                                        <FormErrorMessage>{`${errors.price.message}`}</FormErrorMessage>}
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid
                                minWidth={240}
                                spacing={4}
                                w='100%'
                            >
                                <FormControl isInvalid={!!errors.description?.message}>

                                    <Text mb={2} color='gray.200'>Descrição do produto *</Text>
                                    <Textarea
                                        focusBorderColor="green.500"
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="Escreva..."

                                        {...register('description')}
                                    />

                                    {!!errors.description?.message &&
                                        <FormErrorMessage>{`${errors.description.message}`}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.images?.message}>
                                    <Flex
                                        flexDir='column'
                                        gap={2}
                                        mt={4}
                                    >
                                        <Button
                                            onClick={() => handleInputImage()}
                                            variant='outline'
                                            colorScheme="whiteAlpha"
                                            size='xs'
                                            leftIcon={<Icon as={BsPlus} />}
                                            maxW={150}
                                        >
                                            Adicionar imagens*
                                        </Button>
                                        {
                                            inputImage.map(input => {
                                                return (
                                                    <Flex
                                                        gap={2}
                                                        align='center'
                                                    >
                                                        <Input
                                                            focusBorderColor="green.500"
                                                            border={0}
                                                            bgColor='gray.900'
                                                            placeholder="URL"
                                                            {...register(`images.${input.id}.url`)}
                                                        />
                                                        <Icon
                                                            as={AiOutlineMinusCircle}
                                                            color='gray.400'
                                                            fontSize={20}
                                                            cursor='pointer'
                                                            onClick={() => handleDeleteInputImage(input.id)}
                                                        />
                                                    </Flex>

                                                )
                                            })
                                        }
                                    </Flex>
                                    {!!errors.images?.message &&
                                        <FormErrorMessage>{`${errors.images.message}`}</FormErrorMessage>}
                                </FormControl>

                            </SimpleGrid>

                            <Flex
                                py={7}
                                justify='space-between'
                            >
                                <Button
                                    as={Link}
                                    href='/produtos'
                                    size='sm'
                                    bgColor='gray.700'
                                    transition='0.3s'
                                    _hover={{ opacity: '0.7' }}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    size='sm'
                                    type="submit"
                                    bgColor='green.600'
                                    transition='0.3s'
                                    _hover={{ opacity: '0.7' }}
                                    leftIcon={<Icon as={RiSave3Line} fontSize={20} />}
                                    isLoading={isSubmitting}
                                >
                                    Salvar
                                </Button>
                            </Flex>
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