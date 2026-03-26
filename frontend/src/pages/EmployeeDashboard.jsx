import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeeNavbar from '../components/EmployeeNavbar'
import MyTasks from '../components/employee/MyTasks'
import MySalary from '../components/employee/MySalary'
import MyProfile from '../components/employee/MyProfile'
import '../styles/Dashboard.css'

function EmployeeDashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      <EmployeeNavbar user={user} onLogout={onLogout} />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<EmployeeHome />} />
          <Route path="/my-tasks" element={<MyTasks user={user} />} />
          <Route path="/my-salary" element={<MySalary user={user} />} />
          <Route path="/my-profile" element={<MyProfile user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

function EmployeeHome() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to IDEEZ</h1>
        <p className="text-gray-600 text-lg mb-12">
          Digital Marketing Agency Management System
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Tasks</h3>
            <p className="text-gray-600">View and manage your assigned tasks</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Salary</h3>
            <p className="text-gray-600">View your salary information</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-lg transition">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-600">View your profile information</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
