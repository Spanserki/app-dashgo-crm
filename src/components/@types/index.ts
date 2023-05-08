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
export interface producsProps {
    products: {
        id: string;
        name: string;
        images: imageProps[];
        price: number;
    }[]
}