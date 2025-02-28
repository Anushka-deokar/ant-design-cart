import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    id: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (productId: number) => {
        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
            setCart(cart.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { id: productId, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};