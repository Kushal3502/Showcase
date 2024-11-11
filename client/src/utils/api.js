import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// configuration
const api = axios.create({
  baseURL: baseUrl + "/api/v1",
  withCredentials: true,
});

// GET method
export const get = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// POST method
export const post = async (endpoint, data = {}) => {
  try {
    const response = await api.post(endpoint, data);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// PATCH method
export const patch = async (endpoint, data = {}) => {
  try {
    const response = await api.patch(endpoint, data);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE method
export const del = async (endpoint, params = {}) => {
  try {
    const response = await api.delete(endpoint, { params });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// ERROR handler
export const handleError = (error) => {
  const message =
    error?.response?.data?.message || "An unexpected error occurred.";
  console.log("API error :: ", error);

  return message;
};
