import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Layout from "../components/Layout";
import { api } from "../components/lib/api";
import { withSSRAuth } from "../utils/withSSRAuth";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options: any = {
    chart: {
        toolbar: {
            show: false
        },
        zoom: {
            enable: false,
        },
        foreColor: '#616480',
    },
    grid: {
        show: false,
    },
    tooltip: {
        enabled: false
    },
    xaxis: {
        type: 'datetime' as 'datetime',
        axisBorder: {
            color: '#616480'
        },
        axisTicks: {
            color: '#616480'
        },
        categories: [
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
        ]
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        }
    }
};


const TaxaAbertura = [
    { name: 'series2', data: [20, 20, 40, 50, 70, 10] }
]

export default function dashboard({totalUsers}) {

    const optionsUsers: any = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enable: false,
            },
            foreColor: '#616480',
        },
        grid: {
            show: false,
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            type: 'datetime' as 'datetime',
            axisBorder: {
                color: '#616480'
            },
            axisTicks: {
                color: '#616480'
            },

        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3,
            }
        }
    };

    const usuarios = [
        { name: '', data: [totalUsers] }
    ];

    return (
        <Layout>
            <Flex
                flex={1}
            >
                <SimpleGrid
                    flex={1}
                    gap={4}
                    minChildWidth={320}
                    alignItems='flex-start'
                >
                    <Flex
                        maxW={600}
                        flexDir='column'
                        p={8}
                        bgColor='gray.800'
                        borderRadius={8}
                    >
                        <Text
                            fontSize='lg'
                            mb={4}
                        >
                            Usuários
                        </Text>

                        <Chart
                            type="heatmap"
                            height={160}
                            width='100%'
                            options={optionsUsers}
                            series={usuarios}
                        />
                    </Flex>

                    <Flex
                        maxW={600}
                        flexDir='column'
                        p={8}
                        bgColor='gray.800'
                        borderRadius={8}
                    >
                        <Text
                            fontSize='lg'
                            mb={4}
                        >
                            Taxa de abertura
                        </Text>

                        <Chart
                            type="area"
                            height={160}
                            width='100%'
                            options={options}
                            series={TaxaAbertura}
                        />
                    </Flex>
                </SimpleGrid>
            </Flex>
        </Layout>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const response = await api.get('/users/getUsers', {
        params: {
            page: 1,
            perPage: 10
        },
    })

    const totalUsers = response.headers['x-total-count'];

    return {
        props: {
            totalUsers
        },
    };
});


