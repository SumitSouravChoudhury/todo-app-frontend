import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const isValidToken = (token) => !!token && typeof token === "string" && token !== "undefined";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    isValidToken(localStorage.getItem("token"))
  );

  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);

  const login = (token, id) => {
    if (!isValidToken(token)) return;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setIsAuthenticated(true);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
