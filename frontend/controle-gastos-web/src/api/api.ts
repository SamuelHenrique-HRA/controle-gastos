import axios from "axios";

/**
 * Instância centralizada do Axios
 * Facilita manutenção e padroniza chamadas à API
 */
const api = axios.create({
  baseURL: "http://localhost:5028/api",
});

export default api;
