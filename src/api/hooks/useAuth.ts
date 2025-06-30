"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/src/api/apiClient";
import { login as loginService } from "@/src/api/services/authService";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken") || null;
    const refreshToken = Cookies.get("refreshToken") || null;
    if (accessToken && refreshToken) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        accessToken,
        refreshToken,
        loading: false,
      }));
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      const { accessToken, refreshToken } = await loginService(email, password);
      Cookies.set("accessToken", accessToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      setAuthState({
        isAuthenticated: true,
        accessToken,
        refreshToken,
        loading: false,
        error: null,
      });
      router.push("/whatsapp_bot");
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || "Login failed",
      }));
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
    });
    router.push("/auth/login");
  };

  const refreshToken = async () => {
    try {
      const response = await apiClient.post("/api/v1/auth/refresh-token", {
        refreshToken: authState.refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      Cookies.set("accessToken", accessToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("refreshToken", newRefreshToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      setAuthState((prev) => ({
        ...prev,
        accessToken,
        refreshToken: newRefreshToken,
        isAuthenticated: true,
        error: null,
      }));
      return accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return { ...authState, login, logout, refreshToken };
};
