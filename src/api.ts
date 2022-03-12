import axios from "axios";

console.log(process.env.REACT_APP_API);

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export default api;
