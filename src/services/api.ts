import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3030', // ajuste se seu backend rodar em outra porta
});