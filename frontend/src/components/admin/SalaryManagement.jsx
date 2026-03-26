import React, { useState, useEffect } from 'react'
import { salaryAPI, employeeAPI } from '../../services/api'

function SalaryManagement() {
  const [salaries, setSalaries] = useState([])
  const [employees, setEmployees] = useState([])
  const [filterEmployee, setFilterEmployee] = useState('all')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEmployees()
    fetchSalaries()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchSalaries = async () => {
    setLoading(true)
    try {
      if (filterMonth && filterYear) {
        const response = await salaryAPI.getAll(filterYear, filterMonth)
        setSalaries(response.data)
      } else if (filterYear) {
        const response = await salaryAPI.getAllTotal()
        setSalaries(response.data)
      }
    } catch (error) {
      console.error('Error fetching salaries:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSalaries()
  }, [filterMonth, filterYear])

  const totalSalary = salaries.reduce((sum, s) => sum + parseFloat(s.totalSalary || 0), 0)

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Salary Management</h1>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label>Employee</label>
            <select value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)}>
              <option value="all">All Employees</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              min="2020"
              max="2030"
            />
          </div>

          <div className="form-group">
            <label>Month (Optional)</label>
            <input
              type="number"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              min="1"
              max="12"
              placeholder="Leave empty for all months"
            />
          </div>
        </div>
      </div>

      {/* Salary Table */}
      <div className="card overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Job Role</th>
                  <th>Total Completed Tasks</th>
                  <th>Total Salary</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((salary) => (
                  <tr key={salary.employeeId}>
                    <td className="font-semibold">{salary.employeeName}</td>
                    <td>{salary.jobRole}</td>
                    <td>{salary.completedTasksCount}</td>
                    <td className="font-semibold text-primary">
                      Rs. {parseFloat(salary.totalSalary).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 pt-6 border-t border-gray-300">
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-gray-600 mb-2">Total Salary (All Employees):</p>
                  <p className="text-3xl font-bold text-primary">
                    Rs. {totalSalary.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {salaries.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-600">
            No salary data available for the selected period
          </div>
        )}
      </div>
    </div>
  )
}

export default SalaryManagement
