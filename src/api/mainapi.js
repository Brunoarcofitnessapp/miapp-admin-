import axios from "axios";

const prodapi = "https://nicomaggifitness.herokuapp.com/api";
const localapi = "http://localhost:5000/api";
export const api = axios.create({ baseURL: prodapi });
