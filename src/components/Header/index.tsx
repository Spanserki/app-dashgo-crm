import { Flex, Heading, IconButton, useBreakpointValue, Icon } from "@chakra-ui/react";
import Profille from "./Profille";
import Search from "./Search";
import { RiMenuLine } from 'react-icons/ri'
import { useSideBarDrawer } from "../../context/SideBarDrawerContext";

export default function Header() {

    const isWideversion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { onOpen } = useSideBarDrawer();

    return (
        <Flex
            as='header'
            w='100%'
            maxW={1480}
            h={20}
            mx='auto'
            mt={4}
            px={6}
            align='center'
        >
            <Flex
                pt={4}
            >
                {!isWideversion && (
                    <IconButton
                        aria-label="Open navigation"
                        onClick={onOpen}
                        icon={<Icon as={RiMenuLine} />}
                        variant='unstyled'
                        fontSize={24}
                        mr={2}
                    ></IconButton>
                )}
            </Flex>

            <Flex
                align='end'
                minInlineSize={{ base: 0, md: 200, lg: 200 }}
            >
                <Heading
                    fontSize={['2xl', "3xl", "4xl"]}
                >
                    DashGo
                </Heading>

                <Heading color='green.500' ml={1}>.</Heading>
            </Flex>

            {!!isWideversion && (
                <Search />
            )}

            <Profille />
        </Flex>
    )
}