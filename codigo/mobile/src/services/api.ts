import axios from "axios";

const api = axios.create({
  baseURL: "https://tis5client.onrender.com/",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default api;
