import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Icon,
    Input,
    SimpleGrid,
    Skeleton,
    Stack,
    useToast
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { RiSave3Line } from 'react-icons/ri';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as yup from 'yup';
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { GetPermissions } from "../../hooks/server";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useCan } from "../../hooks/useCan";

const handleFormSchemaValidation = yup.object().shape({
    name: yup.string().required('Campo obrigatório').min(5, 'Mínimo 5 caracteres').max(80, 'Máximo 80 caracteres'),
    email: yup.string().required('Campo obrigatório').email('Formato de e-mail com @'),
    password: yup.string().required('Campo obrigatório').min(6, 'Mínimo 6 caracteres').max(50, 'Máximo 50 caracteres'),
    passwordConfirm: yup.string().oneOf([undefined, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser() {

    const isUsers = useCan({
        permissions: ['users'],
        redirect: true
    })

    const toast = useToast();
    const [permissions, setPermissions] = useState<any>([]);

    const { data } = GetPermissions();

    const arrayPermissions: any = [];

    data?.forEach(item => {
        arrayPermissions.push({
            value: item.value,
            label: item.name,
        })
    });

    const animatedComponents = makeAnimated();
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#181c24',
            color: 'white',
            border: '#38A169',
            marginTop: '10px',
            padding: '5px',
            borderRadius: '8px'
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: 'black',
            fontWeight: 'semi-bold',
            cursor: 'pointer',
        }),
        placeholder: (provided: any, state: any) => ({
            ...provided,
            color: '#718096', // Define a cor do placeholder como cinza
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: '#2D3748',
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px'
        }),
    }


    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
        resolver: yupResolver(handleFormSchemaValidation)
    })

    const createUser: SubmitHandler<any> = async values => {

        try {
            const response = await api.post('/users/create', {
                values,
                permissions
            }).then(res => console.log(res))

            toast({
                position: 'bottom',
                title: '😁',
                description: 'Usuário criado com sucesso!',
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
        setPermissions('')
    }

    return (
        <Layout>
            {
                !isUsers ? (
                    <>
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
                    </>
                ) : (
                    <Flex
                        flexDir='column'
                        h='370px'
                        flex={1}
                        borderRadius={8}
                        bgColor='gray.800'
                        p={5}
                    >
                        <Heading size='md' fontWeight='normal'>Criar usuário</Heading>

                        <Divider my={6} />

                        <Flex
                            as='form'
                            onSubmit={handleSubmit(createUser)}
                            flexDir='column'
                            gap={2}
                        >
                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 2 }}
                                minWidth={240}
                                spacing={3}
                                w='100%'
                            >
                                <FormControl isInvalid={!!errors.name?.message}>

                                    <Input
                                        focusBorderColor="green.500"
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="Nome"
                                        {...register('name')}
                                    />

                                    {!!errors.name?.message &&
                                        <FormErrorMessage>{`${errors.name.message}`}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.email?.message}>

                                    <Input
                                        focusBorderColor="green.500"
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="E-mail"
                                        {...register('email')}
                                    />

                                    {!!errors.email?.message &&
                                        <FormErrorMessage>{`${errors.email.message}`}</FormErrorMessage>}
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid
                                columns={{ base: 1, md: 2, lg: 2 }}
                                minWidth={240}
                                spacing={3}
                                w='100%'
                            >
                                <FormControl isInvalid={!!errors.password?.message}>

                                    <Input
                                        focusBorderColor="green.500"
                                        type='password'
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="Senha"
                                        {...register('password')}
                                    />

                                    {!!errors.password?.message &&
                                        <FormErrorMessage>{`${errors.password.message}`}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.passwordConfirm?.message}>

                                    <Input
                                        focusBorderColor="green.500"
                                        type='password'
                                        border={0}
                                        bgColor='gray.900'
                                        placeholder="Confirmar senha"
                                        {...register('passwordConfirm')}
                                    />

                                    {!!errors.passwordConfirm?.message &&
                                        <FormErrorMessage>{`${errors.passwordConfirm.message}`}</FormErrorMessage>}
                                </FormControl>


                                <Select
                                    onChange={(item: any) => setPermissions(item)}
                                    value={permissions}
                                    placeholder='Permissões'
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={arrayPermissions}
                                    styles={customStyles}
                                />

                            </SimpleGrid>

                            <Flex
                                py={7}
                                justify='space-between'
                            >
                                <Link
                                    href='/usuarios'
                                >
                                    <Button
                                        size='sm'
                                        fontSize='sm'
                                        type="submit"
                                        bgColor='gray'
                                        transition='0.3s'
                                        _hover={{ opacity: '0.7' }}
                                    >
                                        Cancelar
                                    </Button>
                                </Link>

                                <Button
                                    size='sm'
                                    fontSize='sm'
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