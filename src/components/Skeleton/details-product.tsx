import { Flex, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SkeletonDetailsProduct() {
    return (
        <>
            <Flex>
                <Stack>
                    <Skeleton h='20px' w={40} startColor='#2D3748' endColor="#4A5568" />
                </Stack>
            </Flex>
            <Flex
                w='100%'
                align='center'
                pb={10}
            >
                <Flex
                    flexDir={{ base: 'column', md: 'column', lg: 'row' }}
                    gap={5}
                >
                    <Flex
                        borderRadius={8}
                        overflow='hidden'
                        w='100%'
                        h='100%'
                        maxW={500}
                        minH={500}
                        background='linear-gradient(180deg, #1ea483 0%, #7465d4 100%)'
                        alignItems='center'
                        justify='center'
                    >
                        <Stack>
                            <Skeleton w={500} h={500} startColor='#2D3748' endColor="#4A5568" />
                        </Stack>
                    </Flex>

                    <Flex
                        minW={{ base: '100%', md: 400, lg: 500 }}
                        maxW={500}
                        flexDir='column'
                        justify='space-between'
                        p={{ base: 0, md: 4, lg: 4 }}
                        gap={5}
                    >
                        <Flex
                            flexDir='column'
                            gap={3}
                        >
                            <Heading>
                                <Stack>
                                    <Skeleton height='30px' w={300} startColor='#2D3748' endColor="#4A5568" />
                                </Stack>
                            </Heading>
                            <Flex
                                color='green.600'
                                fontWeight='black'
                                fontSize={20}
                            >
                                <Stack>
                                    <Skeleton height='20px' w={20} startColor='#2D3748' endColor="#4A5568" />
                                </Stack>
                            </Flex>
                        </Flex>

                        <Flex
                            flexDir='column'
                            gap={8}
                            color='gray.200'
                        >
                            <Stack>
                                <Skeleton height={200} w={500} startColor='#2D3748' endColor="#4A5568" />
                            </Stack>
                        </Flex>

                        <Stack>
                            <Skeleton height='20px' w={500} startColor='#2D3748' endColor="#4A5568" />
                        </Stack>

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}