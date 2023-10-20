import { Container, Image, Text } from '@chakra-ui/react'
import JoyRide from 'react-joyride'

const customLocale = {
    back: 'Voltar',
    close: 'Encerrar',
    last: 'Concluir',
    next: 'Avançar',
    skip: 'Pular',
};

export default function Tour() {
    return (
        <JoyRide
            continuous
            hideCloseButton
            scrollToFirstStep
            showSkipButton
            spotlightClicks
            locale={customLocale}
            styles={{
                options: {
                    primaryColor: 'gray',
                    beaconSize: 20,
                    textColor: '#000',
                    backgroundColor: '#F7FAFC',
                    width: 600
                },
                buttonNext: {
                    background: '#22543D'
                },
                buttonBack: {
                    color: '#000'
                }
            }}
            steps={[
                {
                    title: 'Seja bem vindo! 🛸',
                    content: (
                        <>
                            <Container
                                bgColor='green.100'
                                py={8}
                                rounded='md'
                            >
                                <Text>
                                    Vamos fazer uma breve explicação das funcionalidades que existem em nosas plataforma
                                </Text>
                            </Container>
                        </>
                    ),
                    target: '#tour',
                    placement: 'right'
                },
                {
                    title: 'Dashboard 📊',
                    content: (
                        <>
                            <Container
                                bgColor='green.100'
                                py={8}
                                rounded='md'
                            >
                                <Text>
                                    Aqui você pode acompanhar os índices de cada funcionalidade conforme sua demanda, nesse primeiro exemplo temos quantidade de clientes e a taxa de inscrições por dia
                                </Text>

                                <Image
                                    pt={4}
                                    src='../tourDash.png'
                                />
                            </Container>
                        </>
                    ),
                    target: '#dashboard',
                    placement: 'right'
                },
                {
                    title: 'Usuários 💚',
                    content: (
                        <>
                            <Container
                                bgColor='green.100'
                                py={8}
                                rounded='md'
                            >
                                <Text>
                                    Aqui você poderá conferir os dados de seus clientes cadastrados, alterar e também criar se necessário, assim você terá um controle maior da quantidade de clientes e também dar suporte quando necessário
                                </Text>

                                <Image
                                    pt={4}
                                    src='../tourUsers.png'
                                />
                            </Container>
                        </>
                    ),
                    target: '#users',
                    placement: 'right'
                },
                {
                    title: 'Produtos 💚',
                    content: (
                        <>
                            <Container
                                bgColor='green.100'
                                py={8}
                                rounded='md'
                            >
                                <Text>
                                Aqui são os produtos que estão disponíveis em sua loja, você pode criar novos produtos para venda, ver avaliações dos clientes, adicionar ao seu carrinho e comprar
                                </Text>

                                <Image
                                    pt={4}
                                    src='../tourProducts.png'
                                />
                            </Container>
                        </>
                    ),
                    target: '#products',
                    placement: 'right'
                },
                {
                    title: 'Tarefas 💚',
                    content: (
                        <>
                            <Container
                                bgColor='green.100'
                                py={8}
                                rounded='md'
                            >
                                <Text>
                                    Aqui você poderá criar tarefas do seu cotidiano dentro da plataforma, assim te ajudando a medir o tempo de cada tarefa sua ou até mesmo para estudar algo importante.
                                </Text>

                                <Image
                                    pt={4}
                                    src='../tourTimer.png'
                                />
                            </Container>
                        </>
                    ),
                    target: '#timer',
                    placement: 'right'
                },
            ]}
        />
    )
}