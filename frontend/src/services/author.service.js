import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "author";

export const getAllAuthors = () => axios.get(API_URL);

export const getAuthorById = (id) => axios.get(`${API_URL}/${id}`);

export const createAuthor = (authorDto) =>
    axios.post(API_URL, authorDto);

export const updateAuthor = (id, authorDto) =>
    axios.put(`${API_URL}/${id}`, authorDto);

export const deleteAuthor = (id) =>
    axios.delete(`${API_URL}/${id}`);