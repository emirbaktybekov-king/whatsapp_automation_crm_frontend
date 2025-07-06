import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Sending request:", config.method, config.url, "with token:", token || "none");
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          console.error("No refresh token available");
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
        console.log("Attempting to refresh token");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
          refresh: refreshToken,
        });
        const { access, refresh } = response.data;
        Cookies.set("accessToken", access, { expires: 5 / 24 }); // 5 hours
        Cookies.set("refreshToken", refresh, { expires: 1 }); // 1 day
        console.log("Token refreshed successfully");
        originalRequest.headers["Authorization"] = `Bearer ${access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;