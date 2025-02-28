import React from 'react';
import { useCart } from '../contexts/CartContext';
import { List, Button } from 'antd';
import { fetchProductById } from '../services/api';
import { useState, useEffect } from 'react';

const Cart: React.FC = () => {
    const { cart, removeFromCart } = useCart();
    const [cartDetails, setCartDetails] = useState<any[]>([]);

    useEffect(() => {
        const getCartDetails = async () => {
            const details = await Promise.all(cart.map(async item => {
                const product = await fetchProductById(item.id);
                return { ...product, quantity: item.quantity }
            }));
            setCartDetails(details);
        }
        getCartDetails();
    }, [cart])

    return (
        <List
            itemLayout="horizontal"
            dataSource={cartDetails}
            renderItem={(item) => (
                <List.Item
                    actions={[<Button onClick={() => removeFromCart(item.id)}>Remove</Button>]}
                >
                    <List.Item.Meta
                        avatar={<img alt={item.title} src={item.image} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />}
                        title={item.title}
                        description={`Quantity: ${item.quantity} - $${item.price}`}
                    />
                </List.Item>
            )}
        />
    );
};

export default Cart;