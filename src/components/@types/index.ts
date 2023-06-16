import { ReactNode } from "react";

export interface AuthProviderProps {
    children: ReactNode;
}

export interface SignInCredentialsProps {
    email: string;
    password: string;
}

export interface AuthContextProps {
    signIn(credentials): Promise<void>;
    IsAuthenticated: boolean;
    user: UserProps;
}

export interface UserProps {
    name: string;
    permissions: [];
    id: string;
}

export interface imageProps {
    id: string;
    url: string;
}

export interface ProductProps {
    id: string;
    name: string;
    price: string;
    url: imageProps;
    quantity: number;
    description: string;
    userId?: string;
}

export interface CartProviderProps {
    children: ReactNode;
}

export interface CartContextProps {
    cart: ProductProps[];
    handleProduct: ({ id, name, price, quantity, url }: ProductProps) => Promise<void>
    removeProduct: (id: string) => Promise<void>
    updateQtdProduct: (id: string, qtd: number) => Promise<void>
}