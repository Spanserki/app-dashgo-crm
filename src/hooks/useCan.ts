import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

type UseCanParams = {
    permissions?: string[];
    redirect?: boolean;
}

export function useCan({ permissions, redirect }: UseCanParams) {

    const router = useRouter();

    const { user, IsAuthenticated } = useContext(AuthContext);

    const arrayPermissions: any = [];

    user?.permissions.forEach((item: any) => {
        arrayPermissions.push(
            item.value
        )
    })

    if (!IsAuthenticated) {
        return false;
    }

    if (permissions?.length > 0) {
        const hasAllPermissions = permissions.every(permission => {
            return arrayPermissions.includes(permission);
        })

        if (!hasAllPermissions) {
            if (!!redirect) {
                router.push('/dashboard')
            }
            return false;
        }
    }
    return true;
}