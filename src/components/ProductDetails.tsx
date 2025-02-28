import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { Card, Button } from 'antd';
import { useCart } from '../contexts/CartContext';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const getProduct = async () => {
            if (id) {
                const data = await fetchProductById(parseInt(id));
                setProduct(data);
            }
        };
        getProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <Card
            cover={<img alt={product.title} src={product.image} style={{ height: '300px', objectFit: 'contain' }} />}
        >
            <Card.Meta title={product.title} description={product.description} />
            <p>Price: ${product.price}</p>
            <Button onClick={() => addToCart(product.id)}>Add to Cart</Button>
        </Card>
    );
};

export default ProductDetails;

