import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization JWT token to all requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear local storage token if not on public routes
      if (window.location.pathname.startsWith("/dashboard")) {
        localStorage.removeItem("admin_token");
        window.location.href = "/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

// Public API endpoints
export const submitLead = async (leadData) => {
  const response = await API.post("/leads", leadData);
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await API.post("/admin/login", credentials);
  return response.data;
};

// Protected API endpoints
export const getLeads = async () => {
  const response = await API.get("/leads");
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await API.put(`/leads/${id}`, { status });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`);
  return response.data;
};

export default API;
