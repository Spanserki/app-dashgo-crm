import { Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
    title: string;
    children: ReactNode;
}

export default function NavSection({ title, children }: NavSectionProps) {
    return (
        <Flex
            flexDir='column'
            pt={6}
        >
            <Text
                fontWeight='bold'
                color='gray.400'
                fontSize='sm'
            >
                {title}
            </Text>

            {children}
        </Flex>
    )
}