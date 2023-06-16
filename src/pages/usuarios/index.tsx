import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Icon,
    Skeleton,
    Spinner,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import Layout from "../../components/Layout";
import { Pagination } from "../../components/Pagination";
import { GetUsers, PrefretchUser } from "../../hooks/server";
import DistanceDate from "../../utils/distanceDate";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useCan } from "../../hooks/useCan";
import { format } from "date-fns";
import { GiPadlockOpen } from 'react-icons/gi'
import { UnlockIcon } from "@chakra-ui/icons";
import { ptBR } from "date-fns/locale";

export default function UserList() {

    const isUsers = useCan({
        permissions: ['users'],
        redirect: true
    })
    const isEdit = useCan({
        permissions: ['admin'],
    })
    const [perPage, setPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const { data, isLoading, error, refetch } = GetUsers(page, perPage);

    useEffect(() => {
        refetch();
    }, [page, perPage, data])

    async function handlePrefetch(id: string) {
        PrefretchUser(id);
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
                        flex={1}
                        flexDir='column'
                        bgColor='gray.800'
                        borderRadius={8}
                    >
                        <Flex
                            flex={1}
                            p={5}
                            mb={8}
                            justify='space-between'
                            align='center'
                        >
                            <Badge
                                colorScheme='whiteAlpha'
                                variant='subtle'
                                borderRadius={4}
                                fontSize='md'
                            >
                                Usuários
                            </Badge>

                            {!!isEdit && (
                                <Button
                                    as={Link}
                                    href='/usuarios/novo-usuario'
                                    size='sm'
                                    fontSize='sm'
                                    type="submit"
                                    bgColor='green.600'
                                    transition='0.3s'
                                    _hover={{ opacity: '0.7' }}
                                    leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                                >
                                    Criar novo
                                </Button>
                            )}
                        </Flex>

                        <>
                            {isLoading ? (
                                <Flex w='100%' h='100%' overflow='hidden'>
                                    <Center w='100%'><Spinner /></Center>
                                </Flex>
                            ) : error ? (
                                <Flex w='100%' justify='center'>
                                    <Text>Não a cadastros</Text>
                                </Flex>
                            ) : (
                                <Box
                                    overflowX="auto"
                                >
                                    <Table variant='simple' colorScheme='whiteAlpha'>
                                        <Thead>
                                            <Tr>
                                                <Th>Usuário</Th>
                                                <Th>Permissões</Th>
                                                <Th>Data de cadastro</Th>
                                                <Th>Ações</Th>
                                                <Th></Th>
                                            </Tr>
                                        </Thead>

                                        <Tbody>
                                            {
                                                data?.results?.map((item: any) => {
                                                    return (
                                                        <Tr key={item.id}>
                                                            <Td>
                                                                <Box>
                                                                    <Text fontWeight='bold'>{item.name}</Text>
                                                                    <Text fontSize='sm' color='gray.300'>{item.email}</Text>
                                                                </Box>
                                                            </Td>
                                                            <Td>
                                                                <Tooltip
                                                                    hasArrow
                                                                    placement="top"
                                                                    bg='gray.700'
                                                                    p={3}
                                                                    rounded={"md"}
                                                                    fontWeight='hairline'
                                                                    label={
                                                                        item.permissions.map((per: any) => {
                                                                            return (
                                                                                <Flex flexDir='column'>
                                                                                    {per.name}
                                                                                </Flex>
                                                                            )
                                                                        })
                                                                    }
                                                                >
                                                                    <UnlockIcon />
                                                                </Tooltip>

                                                            </Td>
                                                            <Td>
                                                                <Tooltip
                                                                    hasArrow
                                                                    placement="top"
                                                                    bg='gray.700'
                                                                    p={3}
                                                                    rounded={"md"}
                                                                    fontWeight='hairline'
                                                                    label={format(new Date(item.createdAT),
                                                                        "d 'de' LLLL 'às' HH:mm'h",
                                                                        { locale: ptBR })}
                                                                >
                                                                    {DistanceDate(item.createdAT)}
                                                                </Tooltip>

                                                            </Td>
                                                            <Td>
                                                                {!!isEdit && (
                                                                    <Button
                                                                        as={Link}
                                                                        href={`/usuarios/${item.id}`}
                                                                        onMouseEnter={() => handlePrefetch(`${item.id}`)}
                                                                        size='sm'
                                                                        fontSize='sm'
                                                                        type="submit"
                                                                        bgColor='gray.700'
                                                                        transition='0.3s'
                                                                        _hover={{ opacity: '0.7' }}
                                                                        isDisabled={!isEdit ? true : false}
                                                                    >
                                                                        <Icon as={RiPencilLine} />
                                                                    </Button>
                                                                )}
                                                            </Td>
                                                        </Tr>
                                                    )
                                                })
                                            }

                                        </Tbody>
                                    </Table>
                                </Box>
                            )
                            }
                        </>
                        <Pagination
                            currentPage={page}
                            registersPerPage={perPage}
                            totalCountOfRegisters={data?.totalCount}
                            onPageChange={setPage}
                        />
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