import axios from "axios";

 const prodapi = "https://mi-proyecto-backend.onrender.com/api";
const localapi = "http://localhost:5000/api";
export const api = axios.create({ baseURL: prodapi });
