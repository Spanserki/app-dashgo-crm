import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import SideBarNav from "./SideBarNav";
import { useSideBarDrawer } from "../../context/SideBarDrawerContext";

export default function Sidebar() {

    const { isOpen, onClose } = useSideBarDrawer();

    const isDrawerSideBar = useBreakpointValue({
        base: true,
        lg: false
    })

    if (isDrawerSideBar) {
        return (
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
            >
                <DrawerOverlay>
                    <DrawerContent
                        h='100vh'
                        bgColor='gray.900'
                        p={4}
                    >
                        <DrawerCloseButton mt={6} />

                        <DrawerHeader>
                            <Flex
                                align='end'
                            >
                                <Heading
                                    fontSize={['2xl', "3xl", "4xl"]}
                                >
                                    DashGoCRM
                                </Heading>

                                <Heading color='green.500' ml={1}>.</Heading>
                            </Flex>
                        </DrawerHeader>

                        <DrawerBody>
                            <SideBarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <SideBarNav />
    )
}