import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-type": "application/json",
  },
});
