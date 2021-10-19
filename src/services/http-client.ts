import axios, { AxiosInstance } from "axios";

const Http: AxiosInstance = axios.create({
  baseURL: "https://randomuser.me/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default Http;