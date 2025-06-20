import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: import.meta.env.VITE_API_KEY as string,
};

const Fetch = axios.create({
  baseURL: API_URL,
  headers: HEADERS,
});

export { Fetch };
