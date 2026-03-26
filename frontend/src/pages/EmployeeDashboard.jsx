import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EmployeeNavbar from '../components/EmployeeNavbar'
import EmployeeHome from '../components/employee/EmployeeHome'
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
          <Route path="/" element={<EmployeeHome user={user} />} />
          <Route path="/my-tasks" element={<MyTasks user={user} />} />
          <Route path="/my-salary" element={<MySalary user={user} />} />
          <Route path="/my-profile" element={<MyProfile user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default EmployeeDashboard
