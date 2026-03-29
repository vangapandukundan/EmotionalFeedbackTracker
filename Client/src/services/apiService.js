import axios from 'axios';

const API_BASE_URL = '/api';

export const analyzeFrame = async (imageBase64) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/emotion/analyze`, {
      imageBase64
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/emotion/health`);
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};