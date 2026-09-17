import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "shelf";

export const getShelfByUsername = (username) => axios.get(`${API_URL}/${username}`);

export const createShelf = (shelfDto) => axios.post(API_URL, shelfDto);