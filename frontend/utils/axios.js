import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Usando o caminho relativo para que o proxy funcione
});

export default instance;