import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_API_URL;

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${api_url}/auth/me`, { withCredentials: true });
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
    await axios.post(`${api_url}/auth/logout`, {}, { withCredentials: true });
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
