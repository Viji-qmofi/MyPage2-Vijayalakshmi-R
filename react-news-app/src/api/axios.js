import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Public auth endpoints that should not send JWT
const publicAuthPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

api.interceptors.request.use(
  (config) => {
    const isPublicAuthRoute = publicAuthPaths.some((path) =>
      config.url?.startsWith(path)
    );

    if (!isPublicAuthRoute) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
      window.dispatchEvent(new Event("auth-expired"));
    }
    return Promise.reject(error);
  }
);

export default api;