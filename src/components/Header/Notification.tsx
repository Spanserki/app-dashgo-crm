import { Divider, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { RiUserAddLine, RiNotificationLine } from 'react-icons/ri'
import Tour from "../Tour";

export default function Notification() {
    return (
        <Flex
            gap={5}
            color='gray.200'
            ml={10}
        >
            <Icon as={RiNotificationLine} />
            <Divider orientation="vertical" h={5} />
            <Link
                href='/usuarios/novo-usuario'
            >
                <Flex>
                    <Icon
                        as={RiUserAddLine}
                        transition='0.2s'
                        _hover={{ color: 'green' }}
                    />
                </Flex>
            </Link>
        </Flex>
    )
}