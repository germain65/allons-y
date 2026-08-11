// Fichier : src/contexts/AuthContext.jsx
// Rôle : Gestion de l'authentification et de l'utilisateur

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le check de session
    if (token) {
      setUser({
        id: 1,
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '+243990000000',
        role: 'rider', // ou 'driver'
        rating: 4.8
      });
    }
    setLoading(false);
  }, [token]);

  const login = async (phone, password) => {
    // Simuler login
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser({ id: 1, firstName: 'Jean', role: 'rider' });
  };

  const signup = async (data) => {
    // Simuler signup
    const fakeToken = 'fake-jwt-token';
    localStorage.setItem('token', fakeToken);
    setToken(fakeToken);
    setUser({ id: 1, firstName: data.firstName, role: data.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const switchRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'rider' ? 'driver' : 'rider'
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAuthenticated: !!user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
