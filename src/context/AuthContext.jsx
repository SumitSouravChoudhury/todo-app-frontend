import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isValidToken = (token) => !!token && typeof token === "string" && token !== "undefined";

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    isValidToken(localStorage.getItem("token"))
  );

  const login = (token) => {
    if (!isValidToken(token)) return;
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
