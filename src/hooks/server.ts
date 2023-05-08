import { useQuery } from "react-query";
import { api } from "../components/lib/api";
import { queryClient } from "../components/lib/queryClient";

export function GetUsers(page: number, perPage: number) {
    return (
        useQuery(
            ['getUsers'],
            async () => {
                const response = await api.get('/users/getUsers', {
                    params: {
                        page,
                        perPage
                    },
                })

                const totalCount = response.headers['x-total-count']
                const results = response.data;

                return {
                    totalCount,
                    results
                }
            }
        )
    )
}

export function UserEdit(id: string) {
    return (
        useQuery(
            ['users', id],
            async () => {
                const repsonse = await api.get(`/users/${id}`)
                return repsonse.data;
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}

export async function PrefretchUser(id: string) {
    await queryClient.prefetchQuery(
        ['users', id],
        async () => {
            const repsonse = await api.get(`/users/${id}`)
            return repsonse.data;
        },
        {
            staleTime: 1000 * 60 * 1, //1 minuto
        }
    )
}

export function GetPermissions() {
    return (
        useQuery(
            ['getPermissions'],
            async () => {
                const repsonse = await api.get(`/users/getPermissions`, {})
                return repsonse.data;
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}

export async function PrefretchProduct(id: string) {
    await queryClient.prefetchQuery(
        ['details', id],
        async () => {
            const repsonse = await api.get(`/products/${id}`)
            return repsonse.data;
        },
        {
            staleTime: 1000 * 60 * 1, //1 minuto
        }
    )
}

export function GetProduct(id: string) {
    return (
        useQuery(
            ['details', id],
            async () => {
                const response = await api.get(`/products/${id}`)
                const products = response.data;
                return JSON.parse(JSON.stringify(products));
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}

export function PurchasesSuccess(sessionId: string) {
    return (
        useQuery(
            ['purchasesuccess', sessionId],
            async () => {
                const repsonse = await api.get('/products/success', {
                    params: {
                        sessionId
                    }
                })
                return repsonse.data;
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}

export function GetCategories() {
    return (
        useQuery(
            ['getCategories'],
            async () => {
                const repsonse = await api.get('/products/getCategories', {})
                return repsonse.data;
            },
            {
                staleTime: 1000 * 60 * 1, //1 minuto
            }
        )
    )
}