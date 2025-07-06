import apiClient from "../apiClient";

export const loginService = async (email: string, password: string) => {
  const response = await apiClient.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerService = async (email: string, password: string) => {
  const response = await apiClient.post("/api/v1/auth/register", {
    email,
    password,
  });
  return response.data;
};
