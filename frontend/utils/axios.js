import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajuste a URL conforme necessário
});

export default instance;