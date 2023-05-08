import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from 'nookies';
import { AuthContext, signOut } from "../../context/AuthContext";
import { useContext } from "react";

interface AxiosErrorResponse {
    code?: string;
    message?: string;
}

let cookies = parseCookies();
let IsRefreshing = false;
let faildedRequestQueue = [];

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    // baseURL: 'https://app-dashgo.vercel.app/api',
    headers: {
        Authorization: `Bearer ${cookies['token_client']}`
    }
})

api.interceptors.response.use(response => {
    return response;
}, (error: AxiosError<AxiosErrorResponse>) => {
    if (error.response.status === 401) {
        if (error.response.data?.code === 'token-expired') {
            cookies = parseCookies();
            const { 'refresh-token': refreshToken } = cookies;
            const originalConfig = error.config;

            if (!IsRefreshing) {
                IsRefreshing = true;

                api.post('/refresh', {
                    refreshToken
                }).then(response => {
                    const { newToken, newRefreshToken } = response.data;

                    setCookie(undefined, 'token_client', newToken, {
                        maxAge: 60 * 60 * 24,
                        path: '/'
                    })

                    setCookie(undefined, 'refresh_token', newRefreshToken, {
                        maxAge: 60 * 60 * 24,
                        path: '/'
                    })

                    api.defaults.headers['Authorization'] = `Bearer ${newToken}`

                    faildedRequestQueue.forEach(req => req.resolve(newToken))
                    faildedRequestQueue = [];
                }).catch(err => {
                    faildedRequestQueue.forEach(req => req.reject(err))
                    faildedRequestQueue = [];
                }).finally(() => {
                    IsRefreshing = false;
                })
            }
            return new Promise((resolve, reject) => {
                faildedRequestQueue.push({
                    resolve: (token: string) => {
                        originalConfig.headers['Authorization'] = `Bearer ${token}`
                        resolve(api(originalConfig))
                    },
                    reject: () => {
                        signOut();
                    }
                })
            })
        }
    } else {
        signOut();
    }
})