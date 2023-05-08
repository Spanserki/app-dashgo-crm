import { Flex, Skeleton, Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine } from 'react-icons/ri';
import { BsHandbagFill } from 'react-icons/bs'
import { useCan } from "../../hooks/useCan";
import Search from "../Header/Search";
import NavLink from "./NavLink";
import NavSection from "./NavSection";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GetServerSideProps } from "next";
import Tour from "../Tour";

export default function SideBarNav() {
    const { user } = useContext(AuthContext)
    const authorization = useCan({
        permissions: ['users']
    })
    const isWideversion = useBreakpointValue({
        base: false,
        lg: true
    })
    return (
        <>
            {!user ? (
                <Flex w={200} >
                    <Stack>
                        <Skeleton height='20px' w={180} startColor='#2D3748' endColor="#4A5568" />
                    </Stack>
                </Flex>
            ) : (
                <Flex
                    flexDir='column'
                    alignItems='flex-start'
                    minInlineSize={{ base: 0, md: 200, lg: 200 }}
                >
                    {!isWideversion && (
                        <Search />
                    )}

                    <Flex>
                        <Text
                            id="tour"
                            color='gray.300'
                        ></Text>
                    </Flex>

                    <NavSection
                        title="GERAL"
                    >

                        <NavLink
                            id="dashboard"
                            title="Dashboard"
                            url="/dashboard"
                            icon={RiDashboardLine}
                        />

                        {!!authorization && (
                            <NavLink
                                id="users"
                                title="Usuários"
                                url="/usuarios"
                                icon={RiContactsLine}
                            />
                        )}

                    </NavSection>

                    <NavSection
                        title="LOJA"
                    >

                        <NavLink
                            title="Produtos"
                            url="/produtos"
                            icon={BsHandbagFill}
                        />
                    </NavSection>

                    <Tour />
                </Flex>
            )}
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {

        }
    }
}