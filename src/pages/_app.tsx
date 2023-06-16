import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SideBarDrawerProvider } from '../context/SideBarDrawerContext'
import { theme } from '../styles/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '../context/AuthContext'
import '../styles/global.css'
import CartProvider from '../context/CartContext'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <AuthProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </AuthProvider>
        </SideBarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
