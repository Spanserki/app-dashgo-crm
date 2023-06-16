import { useContext, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export function UseCartStorage() {
    const { cart } = useCart();
    const { user } = useContext(AuthContext)
    const [cartStorage, setCartStorage] = useState<any[]>([]);
    useEffect(() => {
        const filterCart = cart.filter(cart => cart.userId === user?.id)
        setCartStorage(
            filterCart.map(product => ({ ...product }))
        )
    }, [user, cart])
    return {
        cartStorage
    }
}