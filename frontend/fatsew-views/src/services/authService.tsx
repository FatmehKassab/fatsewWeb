import axios from "axios";

const API_URL = "/api/auth";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    withCredentials: true,
  });
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`, {
    withCredentials: true,
  });
  return response.data;
};

// Get current user
const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
};

export default authService;
