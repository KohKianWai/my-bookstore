import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "transaction";

export const createTransaction = (transactionDto) => axios.post(API_URL, transactionDto);

export const getTransactionByUsername = (username) => axios.get(`${API_URL}/${username}`);