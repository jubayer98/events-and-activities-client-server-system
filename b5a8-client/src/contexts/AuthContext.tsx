"use client";

import { createContext, useContext, useState } from "react";
import { authApi } from "@/lib/api";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is already logged in on mount
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
    }
    return null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
