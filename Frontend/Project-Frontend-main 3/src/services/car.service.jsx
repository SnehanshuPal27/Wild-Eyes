import axios from "axios";
import { getToken } from "../utils/auth.utils";

const API_URL = "http://127.0.0.1:5000";

const addCar = async (formData) => {
  
  
  const token = getToken();
  // console.log(token)
  console.log(formData);
  const response = await axios.post(`${API_URL}/animals`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addPlant = async (formData) => {
  
  
  const token = getToken();
  // console.log(token)
  console.log(formData);
  const response = await axios.post(`${API_URL}/plants`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getAvailableCars = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/getUserSpecies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { addCar, getAvailableCars,addPlant};
