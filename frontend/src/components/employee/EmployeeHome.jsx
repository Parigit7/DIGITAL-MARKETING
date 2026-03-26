import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
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
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">Welcome back, {user.name}</h1>
          <p className="text-gray-500 font-medium">Your performance dashboard</p>
        </div>

        {/* Salary Card */}
        <div className="mb-10">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg p-8 border border-purple-200 hover:shadow-xl transition duration-300">
            <p className="text-purple-700 text-sm font-semibold mb-3 uppercase tracking-wide">This Month Salary</p>
            <h2 className="text-4xl font-bold text-purple-900">{formatCurrency(currentMonthSalary)}</h2>
          </div>
        </div>

        {/* Task Statistics with Circle Chart */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Task Statistics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Circle Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Completed', value: taskStats.completed, fill: '#10b981' },
                      { name: 'In Progress', value: taskStats.inProgress, fill: '#f59e0b' },
                      { name: 'To Do', value: taskStats.toDo, fill: '#ef4444' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip
                    formatter={(value) => value}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <p className="text-gray-500 text-sm font-semibold mb-2">Total Tasks</p>
                <p className="text-4xl font-bold text-gray-900">{taskStats.total}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100">
                <p className="text-gray-500 text-sm font-semibold mb-2">Completed</p>
                <p className="text-4xl font-bold text-green-600">{taskStats.completed}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-amber-100">
                <p className="text-gray-500 text-sm font-semibold mb-2">In Progress</p>
                <p className="text-4xl font-bold text-amber-600">{taskStats.inProgress}</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
                <p className="text-gray-500 text-sm font-semibold mb-2">To Do</p>
                <p className="text-4xl font-bold text-red-600">{taskStats.toDo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeHome
