// import axios from 'axios'

// const API_BASE_URL = 'http://localhost:8080/api'

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // Auth API
// export const authAPI = {
//   login: (email, password) => api.post('/auth/login', { email, password }),
//   ping: () => api.get('/ping'),
// }

// // Employee API
// export const employeeAPI = {
//   create: (data) => api.post('/employees', data),
//   getAll: () => api.get('/employees'),
//   getActive: () => api.get('/employees/active'),
//   getById: (id) => api.get(`/employees/${id}`),
//   update: (id, data) => api.put(`/employees/${id}`, data),
//   deactivate: (id) => api.put(`/employees/${id}/deactivate`),
//   activate: (id) => api.put(`/employees/${id}/activate`),
// }

// // Task API
// export const taskAPI = {
//   create: (data) => api.post('/tasks', data),
//   getAll: () => api.get('/tasks'),
//   getById: (id) => api.get(`/tasks/${id}`),
//   getByEmployee: (employeeId) => api.get(`/tasks/employee/${employeeId}`),
//   getByStatus: (status) => api.get(`/tasks/status/${status}`),
//   update: (id, data) => api.put(`/tasks/${id}`, data),
//   delete: (id) => api.delete(`/tasks/${id}`),
//   getCompletedByEmployeeAndMonth: (employeeId, year, month) => 
//     api.get(`/tasks/completed/${employeeId}/${year}/${month}`),
// }

// // Salary API
// export const salaryAPI = {
//   getByEmployeeAndMonth: (employeeId, year, month) => 
//     api.get(`/salaries/employee/${employeeId}/${year}/${month}`),
//   getAll: (year, month) => api.get(`/salaries/${year}/${month}`),
//   getAllTotal: () => api.get('/salaries/all'),
// }

// // Utility API
// export const utilAPI = {
//   getJobRoles: () => api.get('/job-roles'),
// }

// export default api

import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔥 FIXED INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    // ❗ DO NOT send token for login
    if (token && !config.url.includes('/api/auth/login')) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  ping: () => api.get('/ping'),
}

// Employee API
export const employeeAPI = {
  create: (data) => api.post('/employees', data),
  getAll: () => api.get('/employees'),
  getActive: () => api.get('/employees/active'),
  getById: (id) => api.get(`/employees/${id}`),
  update: (id, data) => api.put(`/employees/${id}`, data),
  deactivate: (id) => api.put(`/employees/${id}/deactivate`),
  activate: (id) => api.put(`/employees/${id}/activate`),
}

// Task API
export const taskAPI = {
  create: (data) => api.post('/tasks', data),
  getAll: () => api.get('/tasks'),
  getById: (id) => api.get(`/tasks/${id}`),
  getByEmployee: (employeeId) => api.get(`/tasks/employee/${employeeId}`),
  getByStatus: (status) => api.get(`/tasks/status/${status}`),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getCompletedByEmployeeAndMonth: (employeeId, year, month) =>
    api.get(`/tasks/completed/${employeeId}/${year}/${month}`),
}

// Salary API
export const salaryAPI = {
  getByEmployeeAndMonth: (employeeId, year, month) =>
    api.get(`/salaries/employee/${employeeId}/${year}/${month}`),
  getAll: (year, month) => api.get(`/salaries/${year}/${month}`),
  getAllTotal: () => api.get('/salaries/all'),
}

// Utility API
export const utilAPI = {
  getJobRoles: () => api.get('/job-roles'),
}

export default api