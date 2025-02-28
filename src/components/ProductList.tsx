import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <Row gutter={[16, 16]}>
            {products.map((product) => (
                <Col span={6} key={product.id}>
                    <Card
                        cover={<img alt={product.title} src={product.image} style={{ height: '200px', objectFit: 'contain' }} />}
                    >
                        <Card.Meta title={product.title} description={`$${product.price}`} />
                        <Link to={`/product/${product.id}`}>
                            <Button style={{ marginTop: '10px' }}>View Details</Button>
                        </Link>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;