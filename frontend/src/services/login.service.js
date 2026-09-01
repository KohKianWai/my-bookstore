import { environment } from "../environment";
import axios from "axios";

export const login = (form) => axios.post(`${environment.apiUrl}auth/login`, form);