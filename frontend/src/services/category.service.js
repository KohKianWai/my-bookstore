import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "category";

export const getAllCategories = () => axios.get(API_URL)

export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);

export const createCategory = (categoryDto) =>
    axios.post(API_URL, categoryDto);

export const updateCategory = (id, categoryDto) =>
    axios.put(`${API_URL}/${id}`, categoryDto);

export const deleteCategory = (id) =>
    axios.delete(`${API_URL}/${id}`);