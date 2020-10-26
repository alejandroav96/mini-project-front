import axios from 'axios';

export const axiosIntance = axios.create({
  baseURL: "https://fast-hollows-16867.herokuapp.com/api",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});
