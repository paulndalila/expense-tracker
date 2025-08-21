import { createContext, useState, useEffect, useContext } from "react";

// Create Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        if (Date.now() >= exp * 1000) {
          // Token expired
          setIsAuthenticated(false);
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        logout(); // Log out if validation fails
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
