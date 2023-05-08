import {
    Badge,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Icon,
    Input,
    Skeleton,
    Spinner,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { RiSave3Line } from "react-icons/ri";
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import * as yup from 'yup';
import Layout from "../../components/Layout";
import { api } from "../../components/lib/api";
import { GetPermissions, UserEdit } from "../../hooks/server";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { queryClient } from "../../components/lib/queryClient";
import { useCan } from "../../hooks/useCan";

const handleFormSchemaValidation = yup.object().shape({
    name: yup.string().required('Campo obrigatório').min(5, 'Mínimo 5 caracteres').max(80, 'Máximo 80 caracteres'),
    email: yup.string().required('Campo obrigatório').email('Formato de e-mail com @'),
})

export default function Edit() {

    const isUsers = useCan({
        permissions: ['users'],
        redirect: true
    })

    const [permissions, setPermissions] = useState<any>([]);
    const animatedComponents = makeAnimated();

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: '#1e2128',
            color: 'white',
            border: '#38A169',
            marginTop: '10px',
            padding: '5px'
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

    const router = useRouter();
    const toast = useToast();
    const { id } = router.query;

    const { data, isLoading, error, refetch } = UserEdit(`${id}`);
    const { data: dataPermissions } = GetPermissions();

    const arrayPermissions: any = [];
    const arrayPermissionsUser: any = [];

    data?.permissions.forEach(item => {
        arrayPermissionsUser.push({
            value: item.value,
            label: item.name,
        })
    });

    dataPermissions?.forEach(item => {
        arrayPermissions.push({
            value: item.value,
            label: item.name,
        })
    });

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
        resolver: yupResolver(handleFormSchemaValidation)
    })

    const EditUser: SubmitHandler<any> = async values => {

        try {
            const response = await api.post('/users/edit', {
                values,
                permissions,
                id
            }).then(result => console.log(result.data))
            toast({
                position: 'top-right',
                title: '😁',
                description: 'Usuário atualizado!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            reset();
            refetch();
            setPermissions('');
            queryClient.invalidateQueries(['users', id]);
            router.push('/usuarios')

        } catch (err: any) {
            toast({
                position: 'top-right',
                title: 'Ops!',
                description: `Ocorreu um erro!`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    }

    return (
        <Layout>
            {
                !isUsers ? (
                    <>
                        <Stack>
                            <Skeleton height='20px' w='100%' startColor='#2D3748' endColor="#4A5568" />
                        </Stack>
                    </>
                ) : (
                    <Flex
                        as='form'
                        onSubmit={handleSubmit(EditUser)}
                        flexDir='column'
                        gap={10}
                    >
                        <Heading
                            fontWeight='semibold'
                            fontSize={20}
                        >
                            Editar perfil
                        </Heading>

                        {
                            isLoading ? (
                                <Flex w='100%' h='100%' overflow='hidden'>
                                    <Center w='100%'><Spinner /></Center>
                                </Flex>
                            ) : error ? (
                                <Flex w='100%' justify='center'>
                                    <Text>Usuário não encontrado!</Text>
                                </Flex>
                            ) : (
                                <Flex
                                    flexDir='column'
                                    gap={5}
                                >
                                    <Flex
                                        flexDir={{ base: 'column', md: 'row', lg: 'row' }}
                                        gap={2}
                                    >
                                        <FormControl isInvalid={!!errors.name?.message}>
                                            <Input
                                                focusBorderColor="green.500"
                                                border={0}
                                                bgColor='gray.800'
                                                defaultValue={data?.name}
                                                {...register('name')}
                                            />
                                            {!!errors.name?.message &&
                                                <FormErrorMessage>{`${errors.name?.message}`}</FormErrorMessage>}
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.email?.message}>
                                            <Input
                                                focusBorderColor="green.500"
                                                border={0}
                                                bgColor='gray.800'
                                                defaultValue={data?.email}
                                                {...register('email')}
                                            />
                                            {!!errors.email?.message &&
                                                <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>}
                                        </FormControl>
                                    </Flex>

                                    <Flex
                                        flexDir='column'
                                        gap={5}
                                        mt={10}
                                        maxW={600}
                                    >
                                        <Flex>
                                            <Badge variant='outline' colorScheme="green">Permissões</Badge>

                                        </Flex>

                                        <ReactSelect
                                            onChange={(item: any) => setPermissions(item)}
                                            placeholder='Permissões'
                                            defaultValue={arrayPermissionsUser}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={arrayPermissions}
                                            styles={customStyles}
                                        />
                                    </Flex>
                                </Flex>
                            )
                        }


                        <Divider borderColor='gray.500' />

                        <Flex
                            py={7}
                            justify='end'
                            gap={5}
                        >
                            <Link
                                href='/usuarios'
                            >
                                <Button
                                    size='sm'
                                    fontSize='sm'
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