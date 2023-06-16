import { useToast } from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { CartContextProps, CartProviderProps, ProductProps } from "../components/@types";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";

const CartContext = createContext<CartContextProps>({} as CartContextProps)

export default function CartProvider({ children }: CartProviderProps) {
    const router = useRouter();
    const toast = useToast();
    const { user } = useContext(AuthContext)
    const [cart, setCart] = useState<ProductProps[]>(() => {
        const { '@cart': storageCart } = parseCookies();
        if (!!storageCart) return JSON.parse(storageCart)
        return [];
    })
    // console.log(cart)
    async function handleProduct({ id, name, price, quantity, url, description }: ProductProps) {
        const updateCart = [...cart]
        const newProduct = {
            id,
            name,
            price,
            quantity,
            url,
            description,
            userId: user.id
        }
        updateCart.push(newProduct)
        setCart(updateCart)
        setCookie(undefined, '@cart', JSON.stringify(updateCart), {
            maxAge: 60 * 60 * 24 * 30, //30 dias
            path: '/'
        })
        toast({
            position: 'top-right',
            title: 'Ótima escolha!',
            description: `Produto adicionado ao carrinho!`,
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
        router.push('/carrinho')
    }

    async function updateQtdProduct(id: string, qtd: number) {
        if (qtd <= 0) { return }
        const updateCart = [...cart]
        const productExist = updateCart.find((product) => product.id === id)
        if (!!productExist) {
            productExist.quantity = qtd;
            setCart(updateCart)
            setCookie(undefined, '@cart', JSON.stringify(updateCart), {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })
        }
    }

    async function removeProduct(productId: string) {
        const updateCart = [...cart]
        const getProduct = updateCart.findIndex((product) => product.id === productId)
        if (getProduct >= 0) {
            updateCart.splice(getProduct, 1)
            setCart(updateCart)
            setCookie(undefined, '@cart', JSON.stringify(updateCart), {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })
            toast({
                position: 'top-right',
                title: 'Produto removido com sucesso!',
                status: 'info',
                duration: 9000,
                isClosable: true,
            });
        }
    }
    return (
        <CartContext.Provider value={{ cart, handleProduct, removeProduct, updateQtdProduct }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextProps {
    const context = useContext(CartContext);
    return context;
}