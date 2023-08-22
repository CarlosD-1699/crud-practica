import axios from "./axios";

export const getProductsRequest = async () => axios.get("/products");

export const getProductRequest = (id) => axios.get(`/products/${id}`);

export const createProductRequest = async (product) =>
  axios.post("/products", product);

export const deleteProductRequest = async (id) =>
  axios.delete(`products/${id}`);

export const updateProductRequest = async (id, product) =>
  axios.put(`products/${id}`, product);
