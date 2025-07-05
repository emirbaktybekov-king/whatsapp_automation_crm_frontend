"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/src/api/apiClient";
import { login as loginService, register as registerService } from "@/src/api/services/authService";
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
      const { access, refresh } = await loginService(email, password);
      Cookies.set("accessToken", access, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refresh, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      setAuthState({
        isAuthenticated: true,
        accessToken: access,
        refreshToken: refresh,
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

  const register = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      await registerService(email, password);
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: null,
      }));
      router.push("/auth/login");
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || "Registration failed",
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
        refresh: authState.refreshToken,
      });
      const { access, refresh: newRefreshToken } = response.data;
      Cookies.set("accessToken", access, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      Cookies.set("refreshToken", newRefreshToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      setAuthState((prev) => ({
        ...prev,
        accessToken: access,
        refreshToken: newRefreshToken,
        isAuthenticated: true,
        error: null,
      }));
      return access;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return { ...authState, login, register, logout, refreshToken };
};