import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "user";

export const getAllUsers = () => axios.get(API_URL);

export const updateUser = (id, userDto) => axios.put(`${API_URL}/${id}`, userDto);
