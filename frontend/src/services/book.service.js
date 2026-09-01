import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "book";

export const getAllBooks = () => axios.get(API_URL);

export const getBookById = (id) => axios.get(`${API_URL}/${id}`);

export const createBook = (bookDto) =>
    axios.post(API_URL, bookDto);

export const uploadBookContent = (id, file) => {
    const formData = new FormData();

    formData.append("file", file);

    return axios.post(
        `${API_URL}/${id}/content`,
        formData
    );
};

export const uploadBookCoverImage = (id, file) => {
    const formData = new FormData()

    formData.append("cover-image", file)

    return axios.post(
        `${API_URL}/${id}/cover-image`,
        formData
    )
}

export const updateBook = (id, bookDto) =>
    axios.put(`${API_URL}/${id}`, bookDto);

export const deleteBook = (id) =>
    axios.delete(`${API_URL}/${id}`);