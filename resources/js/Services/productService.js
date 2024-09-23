import axios from 'axios';

const API_URL = '/api/products';

export const getProducts = (page = 1) => {
    return axios.get(`${API_URL}?page=${page}`); 
};
export const createProduct = (data) => axios.post(API_URL, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const getProductById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};
export const getProductsByCategory = async (category, page = 1) => {
    return axios.get(`${API_URL}/category/${category}?page=${page}`); // Add pagination to category filter as well
};
