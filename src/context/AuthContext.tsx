import { ReactNode, createContext, useEffect, useState } from "react"
import { setCookie } from "nookies";
import Router from "next/router";
import { api } from "../components/lib/api";
import { useToast } from "@chakra-ui/react";
import { parseCookies, destroyCookie } from 'nookies'
import { AuthContextProps, AuthProviderProps, SignInCredentialsProps, UserProps } from "../components/@types";

export const AuthContext = createContext({} as AuthContextProps)

export function signOut() {

    destroyCookie(undefined, 'token_client')
    destroyCookie(undefined, 'refresh_token')

    Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>();

    const isAuthenticated = !!user;
    const toast = useToast();
    const { 'token_client': token } = parseCookies();

    useEffect(() => {

        if (token) {
            try {
                api.get('/auth/me').then(response => setUser(response.data))
            } catch (error) {
                console.log(error)
            }
        }
    }, [token])

    async function signIn({ email, password }: SignInCredentialsProps) {

        try {
            const response = await api.post('/auth', {
                email,
                password
            })

            console.log(response)
            const { id, name, token, permissions, refreshToken } = response?.data;

            setUser({ name, permissions, id })

            setCookie(undefined, 'token_client', token, {
                maxAge: 60 * 60 * 24, // 30 dias
                path: '/'
            })

            setCookie(undefined, 'refresh_token', refreshToken, {
                maxAge: 60 * 60 * 24, // 30 dias
                path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/dashboard')

        } catch (error) {
            console.log(error)
            toast({
                position: 'bottom',
                title: 'Ops!',
                description: `Usuário e senha inválidos`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, IsAuthenticated: isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}

