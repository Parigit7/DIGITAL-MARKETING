import React, { useState, useEffect } from 'react'
import { salaryAPI, taskAPI } from '../../services/api'

function MySalary({ user }) {
  const [salaryData, setSalaryData] = useState(null)
  const [tasks, setTasks] = useState([])
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  useEffect(() => {
    fetchSalaryData()
    fetchTasks()
  }, [])

  const fetchSalaryData = async () => {
    setLoading(true)
    try {
      let response

      if (filterMonth !== 'all' && filterYear) {
        response = await salaryAPI.getByEmployeeAndMonth(user.employeeId, filterYear, filterMonth)
      } else if (filterYear) {
        // Get all completed tasks for this employee for the year
        const tasksResponse = await taskAPI.getByEmployee(user.employeeId)
        const completedTasks = tasksResponse.data.filter((t) => t.taskStatus === 'COMPLETED')
        const totalSalary = completedTasks.reduce((sum, t) => sum + parseFloat(t.salary || 0), 0)

        response = {
          data: {
            employeeId: user.employeeId,
            employeeName: user.name,
            jobRole: user.jobRole,
            totalSalary: totalSalary,
            completedTasksCount: completedTasks.length,
          },
        }
      }

      setSalaryData(response.data)
    } catch (error) {
      console.error('Error fetching salary:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getByEmployee(user.employeeId)
      const completedTasks = response.data.filter((t) => t.taskStatus === 'COMPLETED')
      setTasks(completedTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  useEffect(() => {
    fetchSalaryData()
  }, [filterMonth, filterYear])

  const filteredTasks = filterMonth !== 'all' && filterYear
    ? tasks.filter((t) => {
        const date = new Date(t.completedDate)
        return date.getFullYear() === parseInt(filterYear) && (date.getMonth() + 1) === parseInt(filterMonth)
      })
    : tasks.filter((t) => {
        const date = new Date(t.completedDate)
        return date.getFullYear() === parseInt(filterYear)
      })

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Salary</h1>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              min="2020"
              max="2030"
              required
            />
          </div>

          <div className="form-group">
            <label>Month</label>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {monthNames.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {salaryData && (
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Employee Name</p>
              <p className="text-2xl font-bold text-gray-900">{salaryData.employeeName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Job Role</p>
              <p className="text-2xl font-bold text-gray-900">{salaryData.jobRole}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{salaryData.completedTasksCount}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Salary</p>
              <p className="text-2xl font-bold text-primary">Rs. {parseFloat(salaryData.totalSalary).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Completed Tasks Table */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Completed Tasks</h2>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Company</th>
                  <th>Completed Date</th>
                  <th>Assigned Salary</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="font-semibold">{task.title}</td>
                    <td>{task.companyName || '-'}</td>
                    <td>{task.completedDate}</td>
                    <td className={task.salary ? 'text-primary font-semibold' : 'text-red-600'}>
                      {task.salary ? `Rs. ${parseFloat(task.salary).toFixed(2)}` : 'Not Salary Updated'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTasks.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                No completed tasks found for the selected period
              </div>
            )}

            {filteredTasks.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-300 flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600 mb-2">Total Salary (Selected Period):</p>
                  <p className="text-3xl font-bold text-primary">
                    Rs. {filteredTasks.reduce((sum, t) => sum + parseFloat(t.salary || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MySalary
