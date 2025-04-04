import axios from "axios";

export const apiClient = axios.create({
  baseURL: 'https://stage.theaigo.com:8000',
});
