import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import AddEmployee from '../components/admin/AddEmployee'
import EmployeeProfile from '../components/admin/EmployeeProfile'
import TaskManagement from '../components/admin/TaskManagement'
import SalaryManagement from '../components/admin/SalaryManagement'
import { employeeAPI, taskAPI, salaryAPI } from '../services/api'
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
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalSalary: 0,
  })
  const [taskStatus, setTaskStatus] = useState({ 'TO_DO': 0, 'IN_PROGRESS': 0, 'COMPLETED': 0 })
  const [employeeProgress, setEmployeeProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [employeesRes, tasksRes] = await Promise.all([
        employeeAPI.getAll(),
        taskAPI.getAll(),
      ])

      const employees = employeesRes.data
      const tasks = tasksRes.data

      // Get current month and year
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1

      const activeEmp = employees.filter((e) => e.status === 'ACTIVE').length
      const inactiveEmp = employees.filter((e) => e.status !== 'ACTIVE').length
      const completedTasks = tasks.filter((t) => t.taskStatus === 'COMPLETED').length
      
      // Calculate total salary for current month and year only
      const totalSalary = tasks
        .filter((t) => {
          if (t.taskStatus !== 'COMPLETED' || !t.completedDate) return false
          const completedDate = new Date(t.completedDate)
          return (
            completedDate.getFullYear() === currentYear &&
            completedDate.getMonth() + 1 === currentMonth
          )
        })
        .reduce((sum, t) => sum + parseFloat(t.salary || 0), 0)

      const statusCounts = {
        'TO_DO': tasks.filter((t) => t.taskStatus === 'TO_DO').length,
        'IN_PROGRESS': tasks.filter((t) => t.taskStatus === 'IN_PROGRESS').length,
        'COMPLETED': tasks.filter((t) => t.taskStatus === 'COMPLETED').length,
      }

      // Calculate employee work progress
      const empProgress = employees
        .filter((emp) => !emp.admin && emp.jobRole !== 'Admin') // Exclude admins
        .map((emp) => {
          const empTasks = tasks.filter((t) => t.assignedEmployeeId === emp.id)
          const completed = empTasks.filter((t) => t.taskStatus === 'COMPLETED').length
          const total = empTasks.length
          const progressPercent = total > 0 ? (completed / total) * 100 : 0

          // Calculate salary earned in current month and year
          const currentYearMonthSalary = empTasks
            .filter((t) => {
              if (t.taskStatus !== 'COMPLETED' || !t.completedDate) return false
              const completedDate = new Date(t.completedDate)
              return (
                completedDate.getFullYear() === currentYear &&
                completedDate.getMonth() + 1 === currentMonth
              )
            })
            .reduce((sum, t) => sum + parseFloat(t.salary || 0), 0)

          return {
            id: emp.id,
            name: emp.name,
            jobRole: emp.jobRole,
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: total - completed,
            progressPercent: progressPercent,
            currentMonthSalary: currentYearMonthSalary,
          }
        })
        .sort((a, b) => b.progressPercent - a.progressPercent)

      setStats({
        totalEmployees: employees.length,
        activeEmployees: activeEmp,
        inactiveEmployees: inactiveEmp,
        totalTasks: tasks.length,
        completedTasks: completedTasks,
        pendingTasks: tasks.length - completedTasks,
        totalSalary: totalSalary,
      })

      setTaskStatus(statusCounts)
      setEmployeeProgress(empProgress)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your agency overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Employees Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEmployees}</p>
                <p className="text-sm text-green-600 mt-2">
                  {stats.activeEmployees} Active • {stats.inactiveEmployees} Inactive
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTasks}</p>
                <p className="text-sm text-green-600 mt-2">
                  {stats.completedTasks} Completed • {stats.pendingTasks} Pending
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-4">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          {/* Completed Tasks Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                </p>
                <p className="text-sm text-gray-500 mt-2">{stats.completedTasks} tasks completed</p>
              </div>
              <div className="bg-green-100 rounded-full p-4">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          {/* Total Salary Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Salary (This Month)</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  Rs. {parseFloat(stats.totalSalary).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-4">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Task Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Task Status Distribution</h3>
            <div className="space-y-4">
              {/* To Do */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">To Do</span>
                  <span className="font-bold text-gray-900">{taskStatus['TO_DO']}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${stats.totalTasks > 0 ? (taskStatus['TO_DO'] / stats.totalTasks) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* In Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">In Progress</span>
                  <span className="font-bold text-gray-900">{taskStatus['IN_PROGRESS']}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${stats.totalTasks > 0 ? (taskStatus['IN_PROGRESS'] / stats.totalTasks) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Completed */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 font-medium">Completed</span>
                  <span className="font-bold text-gray-900">{taskStatus['COMPLETED']}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${stats.totalTasks > 0 ? (taskStatus['COMPLETED'] / stats.totalTasks) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Status Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Employee Status Overview</h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 120 120" className="transform -rotate-90 w-full h-full">
                  {/* Inactive Arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${(stats.inactiveEmployees / stats.totalEmployees) * 314.159} 314.159`}
                  ></circle>
                  {/* Active Arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${(stats.activeEmployees / stats.totalEmployees) * 314.159} 314.159`}
                    strokeDashoffset={-((stats.inactiveEmployees / stats.totalEmployees) * 314.159)}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
                    <p className="text-gray-600 text-sm">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Active ({stats.activeEmployees})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Inactive ({stats.inactiveEmployees})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Work Progress */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Employee Work Progress</h3>
          {employeeProgress.length > 0 ? (
            <div className="space-y-6">
              {employeeProgress.map((emp) => (
                <div key={emp.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                      <p className="text-sm text-gray-600">{emp.jobRole}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        Rs. {emp.currentMonthSalary.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">This month</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(emp.progressPercent)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {emp.completedTasks} of {emp.totalTasks} tasks
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        emp.progressPercent === 100
                          ? 'bg-green-500'
                          : emp.progressPercent >= 75
                          ? 'bg-blue-500'
                          : emp.progressPercent >= 50
                          ? 'bg-yellow-500'
                          : 'bg-orange-500'
                      }`}
                      style={{ width: `${emp.progressPercent}%` }}
                    ></div>
                  </div>

                  {/* Task Breakdown */}
                  <div className="flex gap-6 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">Completed: {emp.completedTasks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-600">Pending: {emp.pendingTasks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No employee data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
