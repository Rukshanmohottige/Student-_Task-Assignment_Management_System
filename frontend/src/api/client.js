import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // Auth
  login: async (email, password, rememberMe = true) => {
    const res = await apiClient.post('/auth/login', { email, password, rememberMe });
    if (res.data && res.data.token) {
      localStorage.setItem('taskflow_user', JSON.stringify(res.data));
    }
    return res.data;
  },
  getCurrentUser: async () => {
    const cached = localStorage.getItem('taskflow_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // ignore
      }
    }
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('taskflow_user');
  },

  // Dashboard
  getDashboardStats: async () => {
    const res = await apiClient.get('/dashboard/stats');
    return res.data;
  },

  // Courses
  getCourses: async () => {
    const res = await apiClient.get('/courses');
    return res.data;
  },
  getCourseSummaries: async () => {
    const res = await apiClient.get('/courses/summary');
    return res.data;
  },

  // Assignments
  getAssignments: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'all') params.append('status', filters.status.toUpperCase());
    if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority.toUpperCase());
    if (filters.course && filters.course !== 'all') params.append('course', filters.course);
    if (filters.search && filters.search.trim()) params.append('search', filters.search.trim());

    const res = await apiClient.get(`/assignments?${params.toString()}`);
    return res.data;
  },
  getAssignmentById: async (id) => {
    const res = await apiClient.get(`/assignments/${id}`);
    return res.data;
  },
  createAssignment: async (assignmentData) => {
    const res = await apiClient.post('/assignments', assignmentData);
    return res.data;
  },
  updateAssignment: async (id, assignmentData) => {
    const res = await apiClient.put(`/assignments/${id}`, assignmentData);
    return res.data;
  },
  toggleAssignmentStatus: async (id) => {
    const res = await apiClient.patch(`/assignments/${id}/toggle`);
    return res.data;
  },
  deleteAssignment: async (id) => {
    const res = await apiClient.delete(`/assignments/${id}`);
    return res.data;
  },
  exportCsvUrl: `${API_BASE_URL}/assignments/export`
};

export default apiClient;
