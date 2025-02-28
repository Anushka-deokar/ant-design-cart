import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const fetchProductById = async (id: number) => {
    const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/products/</span>{id}`);
    return response.data;
};
