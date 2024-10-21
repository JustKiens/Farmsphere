import axios from "axios";


const serverUrl = 'https://farmsphere.onrender.com/'

export const serverClient = axios.create({
  baseURL: serverUrl,
  withCredentials: true
});

