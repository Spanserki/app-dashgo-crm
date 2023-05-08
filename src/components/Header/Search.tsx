import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from 'react-icons/ri'

export default function Search() {
    return (
        <Flex
            as='label'
            flex={1}
            py={2}
            px={8}
            maxW={400}
            alignSelf='center'
            color='gray.800'
            bgColor='gray.800'
            position='relative'
            align='center'
            borderRadius='full'
        >
            <Input
                color='gray.50'
                variant='unstyled'
                px={4}
                mr={4}
                placeholder='Buscar...'
            />

            <Icon as={RiSearchLine} color='gray.200' />
        </Flex>
    )
}