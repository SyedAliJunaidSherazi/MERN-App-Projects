import axios from 'axios';
import { backendBaseUrl } from '../config/url';

export const ingestData = async (token) => {
  console.log("Tokenbefore sending:"+ token)

  try {
    const response = await axios.post(`${backendBaseUrl}/ingest`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Ingest Data Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ingest Data Error:', error.response.data);
    throw error.response.data;
  }
};
export const getData = async (filters) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/data`, { params: filters });
    console.log('Get Data Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Data Error:', error.response.data);
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/login`, credentials);
    console.log('Login Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data);
    throw error.response.data;
  }
};
