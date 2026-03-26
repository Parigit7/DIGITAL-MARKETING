import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import AddEmployee from '../components/admin/AddEmployee'
import EmployeeProfile from '../components/admin/EmployeeProfile'
import TaskManagement from '../components/admin/TaskManagement'
import SalaryManagement from '../components/admin/SalaryManagement'
import '../styles/Dashboard.css'

function AdminDashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <AdminNavbar user={user} onLogout={onLogout} />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/task-management" element={<TaskManagement />} />
          <Route path="/salary-management" element={<SalaryManagement />} />
        </Routes>
      </div>
    </div>
  )
}

function AdminHome() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to IDEEZ</h1>
        <p className="text-gray-600 text-lg mb-12">
          Digital Marketing Agency Management System
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Employees</h3>
            <p className="text-gray-600">Add, update, and manage employee information</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Task Management</h3>
            <p className="text-gray-600">Create and track tasks assigned to employees</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Salary Management</h3>
            <p className="text-gray-600">View and manage employee salaries</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Employee Profiles</h3>
            <p className="text-gray-600">View detailed employee information and roles</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
