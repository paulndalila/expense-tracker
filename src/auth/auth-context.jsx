// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../auth/supabaseClient.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current session on load
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session error:", error.message);
      } else {
        setUser(data?.session?.user ?? null);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes (login, logout, refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        //console.log("Auth event:", event);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Google sign in
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/",
      },
    });

    if (error) throw error;
    return data;
  };

  // Sign in (email/password)
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
    return data;
  };

  // Sign up
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
