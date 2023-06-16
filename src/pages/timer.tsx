import {
    Button,
    Container,
    Flex,
    Icon,
    Input,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineStop } from "react-icons/ai";
import { BsFillCircleFill, BsPlay } from "react-icons/bs";
import * as yup from 'yup';
import Layout from "../components/Layout";
import DistanceDate from "../utils/distanceDate";
import { withSSRAuth } from "../utils/withSSRAuth";

const handleSchemaValidation = yup.object().shape({
    task: yup.string().required('Campo obrigatório'),
    minutes: yup.string().required()
})

interface CyrcleProps {
    id: string;
    task: string;
    minutes: number;
    startDate: Date;
    interruptDate?: Date;
    finishedDate?: Date;
}

export default function Timer() {
    const [cyrcles, setCyrcles] = useState<CyrcleProps[]>([]);
    const [activeCyrcleId, setActiveCyrcleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(handleSchemaValidation)
    })
    const activeCyrcle = cyrcles.find((cyrcles) => cyrcles.id === activeCyrcleId);
    const totalSeconds = activeCyrcle ? activeCyrcle.minutes * 60 : 0;
    const currentSeconds = activeCyrcle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        let interval: any;
        if (!!activeCyrcle) {
            interval = setInterval(() => {
                const secondsDifference = (differenceInSeconds(new Date(), activeCyrcle.startDate))
                if (secondsDifference >= totalSeconds) {
                    setCyrcles(
                        cyrcles.map((cyrcle) => {
                            if (cyrcle.id === activeCyrcleId) {
                                return { ...cyrcle, finishedDate: new Date() }
                            } else {
                                return cyrcle;
                            }
                        })
                    )
                    setAmountSecondsPassed(totalSeconds);
                    setActiveCyrcleId(null);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [activeCyrcle, totalSeconds, activeCyrcleId])

    function handleCreateNewCyrcle(values: any) {
        const { task, minutes } = values;
        const id = String(new Date().getTime());
        const newCyrcle = {
            id,
            task,
            minutes: Number(minutes),
            startDate: new Date()
        }
        setCyrcles(cyrcles => [...cyrcles, newCyrcle]);
        setActiveCyrcleId(id);
        setAmountSecondsPassed(0);
        reset();
    }
    function handleInterruptCyrcle() {
        setCyrcles(
            cyrcles.map((cyrcle) => {
                if (cyrcle.id === activeCyrcleId) {
                    return { ...cyrcle, interruptDate: new Date() }
                } else {
                    return cyrcle;
                }
            })
        )
        setActiveCyrcleId(null);
    }
    useEffect(() => {
        if (!!activeCyrcle) {
            document.title = `Tempo da tarefa ${minutes} : ${seconds}`
        }
    }, [minutes, seconds])
    return (
        <Layout>
            <Flex
                w='100%'
                h='100vh'
                justify='center'
            >
                <Container
                    as='form'
                    onSubmit={handleSubmit(handleCreateNewCyrcle)}
                    maxW={800}
                >
                    <Flex
                        flexDir={{ base: 'column', md: 'column', lg: 'row' }}
                        justify='space-between'
                        align='center'
                        fontSize='sm'
                    >
                        <Flex align='end'>
                            <Text minW={120}>Vou trabalhar em</Text>
                            <Input
                                placeholder="Nome da tarefa"
                                borderColor='transparent'
                                borderBottomColor='gray.700'
                                focusBorderColor="#1C4532"
                                {...register('task')}
                            />
                        </Flex>
                        <Flex align='end'>
                            <Text>durante</Text>
                            <Input
                                type="number"
                                defaultValue={1}
                                placeholder="tempo"
                                borderColor='transparent'
                                borderBottomColor='gray.700'
                                focusBorderColor="#1C4532"
                                {...register('minutes')}
                            />
                            <Text>minuto(s)</Text>
                        </Flex>
                    </Flex>
                    <Flex
                        w='100%'
                        justify='space-between'
                        py={8}
                        fontSize={{ base: '3rem', md: '12rem', lg: '12rem' }}
                        fontWeight='semibold'
                    >
                        <Text px={{ base: 2, md: 4, lg: 8 }} rounded='md' bgColor='gray.800'>{minutes[0]}</Text>
                        <Text px={{ base: 2, md: 4, lg: 8 }} rounded='md' bgColor='gray.800'>{minutes[1]}</Text>
                        <Text color='green.700'>:</Text>
                        <Text px={{ base: 2, md: 4, lg: 8 }} rounded='md' bgColor='gray.800'>{seconds[0]}</Text>
                        <Text px={{ base: 2, md: 4, lg: 8 }} rounded='md' bgColor='gray.800'>{seconds[1]}</Text>
                    </Flex>
                    {!!activeCyrcle && activeCyrcleId != null ? (
                        <Button
                            w='100%'
                            mt={4}
                            colorScheme="red"
                            leftIcon={<Icon as={AiOutlineStop} />}
                            type="button"
                            onClick={() => handleInterruptCyrcle()}
                        >
                            Interromper
                        </Button>
                    ) : (
                        <Button
                            w='100%'
                            mt={4}
                            bgColor='green.700'
                            _hover={{ opacity: '0.7' }}
                            leftIcon={<Icon as={BsPlay} />}
                            type="submit"
                        >
                            Começar
                        </Button>
                    )}
                    <Flex overflowX='auto' py={4}>
                        <Table
                            mt={8}
                            variant='simple'
                            colorScheme="whiteAlpha"
                        >
                            <Thead>
                                <Tr>
                                    <Th>Tarefa</Th>
                                    <Th minW={140}>Duração</Th>
                                    <Th minW={200}>Início</Th>
                                    <Th minW={200}>Status</Th>
                                </Tr>
                            </Thead>
                            {cyrcles.map(item => {
                                return (
                                    <Tbody
                                        key={item.id}
                                        color='gray.200'
                                    >
                                        <Tr>
                                            <Td>{item.task}</Td>
                                            <Td>{item.minutes} minuto(s)</Td>
                                            <Td>{DistanceDate(`${item.startDate}`)}</Td>
                                            <Td>
                                                <Icon
                                                    as={BsFillCircleFill}
                                                    boxSize={2}
                                                    mr={2}
                                                    color={item.interruptDate ? 'red' : item.finishedDate ? 'green' : 'yellow.500'}
                                                />
                                                {item.interruptDate ? (
                                                    <>Interrompido</>
                                                ) : item.finishedDate ? (
                                                    <>Concluido</>
                                                ) : (<>Em andamento</>)
                                                }
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                )
                            })}
                        </Table>
                    </Flex>
                </Container>
            </Flex>
        </Layout>
    )
}

export const getServerSideProps = withSSRAuth(async () => {
    return {
        props: {},
    };
});