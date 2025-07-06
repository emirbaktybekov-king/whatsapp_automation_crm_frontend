import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        email,
        password,
        username,
      });
      const { accessToken, refreshToken } = response.data;
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });
      const { accessToken, refreshToken } = response.data;
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return { register, login, logout, loading, error };
};
