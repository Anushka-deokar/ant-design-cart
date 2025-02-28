// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import { Layout, Menu, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CartProvider, useCart } from './contexts/CartContext';

const { Header, Content } = Layout;

const CartIcon = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart">
      <Button icon={<ShoppingCartOutlined />}>{totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}</Button>
    </Link>
  );
}

const App: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Products</Link>,
    },
    {
      key: '2',
      label: <CartIcon />,
      style: { float: 'right' }
    },
  ];

  return (
    <CartProvider>
      <Router>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 50px' }}>
            <Menu mode="horizontal" items={menuItems} />
          </Header>
          <Content style={{ padding: '50px' }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;

