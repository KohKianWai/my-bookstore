import { environment } from "../environment";
import axios from "axios";

const API_URL = environment.apiUrl + "contract";

export const createContract = (contractDto) => axios.post(API_URL, contractDto);

export const approveContract = (chequeId) =>
	axios.put(`${API_URL}/${chequeId}/approve`);

export const cancelContract = (chequeId, voidedBy) =>
	axios.put(`${API_URL}/${chequeId}/cancel`, null, {
        params: { voidedBy }
    });

export const getContractByUsername = (username) => axios.get(`${API_URL}/${username}`);