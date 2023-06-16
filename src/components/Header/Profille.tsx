import {
    Avatar,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext, signOut } from "../../context/AuthContext";
import Notification from "./Cart";
import { PrefretchUser } from "../../hooks/server";
import { GetServerSideProps } from "next";

export default function Profille() {

    const { user } = useContext(AuthContext)

    const isDescktop = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefetch(id: string) {
        PrefretchUser(id);
    }

    return (
        <Flex
            align='center'
            ml='auto'
            gap={10}
        >
            <Notification />
            {
                isDescktop ? (
                    <Flex
                        gap={2}
                        alignItems='center'
                    >
                        <Flex
                            flexDir='column'
                            align='end'
                            fontSize='sm'
                            color='gray.300'
                        >
                            <Text color='gray.50'>{user?.name}</Text>
                        </Flex>

                        <Menu closeOnSelect={false} >
                            <MenuButton>
                                <Avatar
                                    size='md'
                                    name={user?.name}
                                    bgColor='#276749'
                                />
                            </MenuButton>
                            <MenuList
                                bgColor='gray.700'
                                border='none'
                            >
                                <Link
                                    href={`/usuarios/${user?.id}`}
                                    onMouseEnter={() => handlePrefetch(`${user?.id}`)}
                                >
                                    <MenuItem
                                        fontWeight='medium'
                                        bgColor='blackAlpha.100'
                                        transition='0.2s'
                                        _hover={{ color: 'green' }}
                                    >
                                        Meu perfil
                                    </MenuItem>
                                </Link>

                                <MenuItem
                                    fontWeight='medium'
                                    onClick={() => signOut()}
                                    bgColor='blackAlpha.100'
                                    transition='0.2s'
                                    _hover={{ color: 'green' }}
                                >
                                    Sair
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                ) : (
                    <Menu closeOnSelect={false} >
                        <MenuButton>
                            <Avatar
                                size='md'
                                name={user?.name}
                                bgColor='#276749'
                            />
                        </MenuButton>
                        <MenuList
                            minWidth='240px'
                            color='gray.50'
                            fontWeight='bold'
                            bgColor='gray.700'
                            border='none'
                        >
                            <Link
                                href={`/usuarios/${user?.id}`}
                                onMouseEnter={() => handlePrefetch(`${user?.id}`)}
                            >
                                <MenuItem
                                    fontWeight='medium'
                                    bgColor='blackAlpha.100'
                                    transition='0.2s'
                                    _hover={{ color: 'green' }}
                                >
                                    Meu perfil
                                </MenuItem>
                            </Link>

                            <MenuItem
                                fontWeight='medium'
                                onClick={() => signOut()}
                                bgColor='blackAlpha.100'
                                transition='0.2s'
                                _hover={{ color: 'green' }}
                            >
                                Sair
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )
            }

        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {

        }
    }
}