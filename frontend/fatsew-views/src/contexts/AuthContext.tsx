import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post("/api/auth/register", formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      throw err.response.data;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      throw err.response.data;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Update user details
  const updateDetails = async (formData) => {
    try {
      const res = await axios.put("/api/auth/updatedetails", formData, {
        withCredentials: true,
      });
      setUser(res.data.data);
    } catch (err) {
      throw err.response.data;
    }
  };

  // Update password
  const updatePassword = async (formData) => {
    try {
      const res = await axios.put("/api/auth/updatepassword", formData, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      throw err.response.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateDetails,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
