import axios from "axios";
import { baseUrl } from "./baseUrl";

export const API = axios.create({
  baseURL: baseUrl.dev,

  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${cookie.get("accessToken")}`,
  },
});