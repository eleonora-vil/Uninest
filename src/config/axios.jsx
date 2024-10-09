import axios from "axios";
const baseUrl = "http://localhost:5010";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

// handle before call api
const handleBefore = (config) => {
  // handle hành động trước khi call API

  // lấy ra cái token và đính kèm theo cái request
  const token = localStorage.getItem("token")?.replaceAll("", "");
  config.headers["Authorization"] = "Bearer ${token}";
  return config;
};
api.interceptors.request.use(handleBefore, null);

export const getTotalUsersCount = () => {
  return api.get("/api/Dashboard/userCount");
};
export const getTotalPostsCount = () => {
  return api.get("/api/Dashboard/postCount");
};
export const getTotalEarnings = () => {
  return api.get("/api/Dashboard/total-earnings");
};
export const getTotalEarningsByDay = () => {
  return api.get("/api/Dashboard/total-earnings-by-day");
};
export const getRecentUsers = (count = 10) => {
  return api.get(`/api/Dashboard/recent-users?count=${count}`);
};
export default api;
