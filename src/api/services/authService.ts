import apiClient from "../apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/api/v1/auth/login", {
    username: email,
    password,
  });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await apiClient.post("/api/v1/auth/register", {
    email,
    password,
  });
  return response.data;
};
