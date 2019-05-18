import axios from "axios";

const api = axios.create();

api.defaults.baseURL = "http://localhost:3000";

export default api;
