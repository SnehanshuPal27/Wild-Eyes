import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response)
  return response.data;
};

export { register, login };