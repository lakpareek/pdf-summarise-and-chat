import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;

  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get('/auth/me', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setUser(null); 
    } finally {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    checkAuthStatus();
  }, []);

  
  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
