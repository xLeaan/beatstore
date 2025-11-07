import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (beat) => {
        setCartItems((prev) => 
        prev.some((i) => i.id_beat === beat.id_beat)
        ? prev
        : [...prev, beat]
        );

        console.log("Carrito actualizado:", cartItems);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id_beat !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}