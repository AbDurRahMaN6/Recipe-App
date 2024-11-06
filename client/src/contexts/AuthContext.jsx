import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('jwtToken', userData.token);

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
