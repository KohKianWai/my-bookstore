import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "cheque";

export const createChequePayment = (chequePaymentDto) => axios.post(API_URL, chequePaymentDto);

export const getAllChequePayments = () => axios.get(API_URL);

export const getChequePaymentsByUsername = (username) => axios.get(`${API_URL}/user/${username}`);

export const getChequePaymentById = (id) => axios.get(`${API_URL}/${id}`);

export const updateChequePayment = (id, chequePaymentDto) => axios.put(`${API_URL}/${id}`, chequePaymentDto);