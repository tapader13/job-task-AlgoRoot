import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContextUser = createContext();

// AuthContext Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user info from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContextUser.Provider value={{ user }}>
      {children}
    </AuthContextUser.Provider>
  );
};

export default AuthProvider;
