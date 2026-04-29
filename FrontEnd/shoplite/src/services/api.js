import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchProducts = async ({ category, page }) => {
    const url = category
        ? `${API}/api/products?category=${category}&page=${page}&size=6`
        : `${API}/api/products?type=HOME&page=${page}&size=6`;

    const res = await axios.get(url);
    return res.data;
};

export const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    return res.data;
};