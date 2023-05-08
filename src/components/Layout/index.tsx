import { Flex, Stack } from "@chakra-ui/react";
import { ReactNode } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Flex
            direction='column'
            w='100%'
        >
            <Header />

            <Flex
                as='header'
                w='100%'
                maxW={1480}
                h={20}
                mx='auto'
                mt={4}
                px={6}
            >
                <Sidebar />

                <Stack
                    spacing="3"
                    w={{ base: '100%', md: '100%', lg: '80%', xl: '80%' }}
                >
                    {children}
                </Stack>
            </Flex>
        </Flex>
    )
}