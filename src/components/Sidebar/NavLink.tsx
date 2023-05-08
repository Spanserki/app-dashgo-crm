import { Flex, Icon, InputProps, Link as ChakraLink, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib/esm/iconBase";
import ActiveLink from "../ActiveLink";

interface NavLinkProps extends InputProps {
    url: string;
    title: string;
    icon: IconType;
}

export default function NavLink({ title, url, icon, ...rest }: NavLinkProps) {
    return (
        <ActiveLink
            href={url}
        >
            <Flex
                mt={5}
                align='center'
                gap={2}
                transition='0.2s'
                _hover={{ color: 'green.500', textDecorationColor: 'none' }}
                {...rest}
            >
                <Icon as={icon} />
                <Text fontWeight='medium'>{title}</Text>
            </Flex>
        </ActiveLink>
    )
}