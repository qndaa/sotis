import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:443/api/v1'
});

export { client };
