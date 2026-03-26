import React, { useState, useEffect } from 'react'
import { salaryAPI, taskAPI } from '../../services/api'

function EmployeeHome({ user }) {
  const [currentMonthSalary, setCurrentMonthSalary] = useState(0)
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    toDo: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const currentYear = now.getFullYear()

      // Fetch current month salary
      try {
        const monthSalaryResponse = await salaryAPI.getByEmployeeAndMonth(
          user.employeeId,
          currentYear,
          currentMonth
        )
        setCurrentMonthSalary(monthSalaryResponse.data.totalSalary || 0)
      } catch (error) {
        console.error('Error fetching monthly salary:', error)
        setCurrentMonthSalary(0)
      }

      // Fetch all tasks to calculate stats
      try {
        const tasksResponse = await taskAPI.getByEmployee(user.employeeId)
        const allTasks = tasksResponse.data

        // Calculate task statistics
        const stats = {
          total: allTasks.length,
          completed: allTasks.filter((t) => t.taskStatus === 'COMPLETED').length,
          inProgress: allTasks.filter((t) => t.taskStatus === 'IN_PROGRESS').length,
          toDo: allTasks.filter((t) => t.taskStatus === 'TO_DO').length,
        }
        setTaskStats(stats)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCompletionPercentage = () => {
    if (taskStats.total === 0) return 0
    return Math.round((taskStats.completed / taskStats.total) * 100)
  }

  const formatCurrency = (amount) => {
    return 'Rs ' + parseFloat(amount).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center min-h-96">
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}</h1>
          <p className="text-gray-500">Your performance dashboard</p>
        </div>

        {/* Salary Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl shadow-sm p-5 border border-yellow-200 hover:shadow-md transition">
            <p className="text-yellow-700 text-xs font-semibold mb-2 uppercase tracking-wide">Current Month Salary</p>
            <h2 className="text-3xl font-bold text-yellow-600">{formatCurrency(currentMonthSalary)}</h2>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Tasks */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-gray-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900">{taskStats.total}</p>
                </div>
                <span className="text-gray-400 text-2xl">📋</span>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-green-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
                </div>
                <span className="text-green-500 text-2xl">✓</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-blue-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{taskStats.inProgress}</p>
                </div>
                <span className="text-blue-500 text-2xl">→</span>
              </div>
            </div>

            {/* To Do */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md hover:border-amber-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-2">To Do</p>
                  <p className="text-3xl font-bold text-amber-600">{taskStats.toDo}</p>
                </div>
                <span className="text-amber-500 text-2xl">•</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Work Progress</h3>
            <span className="text-3xl font-bold text-green-600">{getCompletionPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            {taskStats.completed} of {taskStats.total} tasks completed
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeHome
