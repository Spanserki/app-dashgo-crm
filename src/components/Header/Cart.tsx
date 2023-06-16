import { Box, Button, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { BsFillCartFill } from "react-icons/bs";
import { RiUserAddLine } from 'react-icons/ri';
import { UseCartStorage } from "../../utils/useCartStorage";

export default function Cart() {
    const { cartStorage } = UseCartStorage();
    return (
        <Flex
            gap={4}
            color='gray.200'
            ml={10}
            align='center'
        >
            <Box>
                <Button
                    as={NextLink}
                    href='/carrinho'
                    variant='unstyled'
                    w='fit-content'
                    _hover={{ color: 'green' }}
                >
                    <Icon as={BsFillCartFill} />
                </Button>
                {cartStorage.length > 0 && (
                    <Text
                        float='right'
                        mt={2}
                        bgColor='red'
                        rounded='full'
                        px={1}
                        fontSize='2xs'
                        fontWeight='bold'
                    >
                        {cartStorage.length}
                    </Text>
                )}
            </Box>
            <Divider orientation="vertical" h={5} />
            <NextLink
                href='/usuarios/novo-usuario'
            >
                <Flex>
                    <Icon
                        as={RiUserAddLine}
                        transition='0.2s'
                        _hover={{ color: 'green' }}
                    />
                </Flex>
            </NextLink>
        </Flex>
    )
}