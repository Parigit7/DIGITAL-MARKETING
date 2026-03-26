import React, { useState, useEffect } from 'react'
import { salaryAPI, employeeAPI } from '../../services/api'

function SalaryManagement() {
  const [salaries, setSalaries] = useState([])
  const [employees, setEmployees] = useState([])
  const [filterEmployee, setFilterEmployee] = useState('all')
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  useEffect(() => {
    fetchEmployees()
    fetchSalaries()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll()
      // Filter out admins - only show regular employees
      const regularEmployees = response.data.filter((emp) => !emp.admin && emp.jobRole !== 'Admin')
      setEmployees(regularEmployees)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchSalaries = async () => {
    setLoading(true)
    try {
      if (filterYear) {
        let allSalaries = []

        if (filterMonth !== 'all') {
          // Fetch specific month data
          const response = await salaryAPI.getAll(filterYear, filterMonth)
          allSalaries = response.data
        } else {
          // Fetch all 12 months for the selected year
          for (let month = 1; month <= 12; month++) {
            try {
              const response = await salaryAPI.getAll(filterYear, month)
              allSalaries = [...allSalaries, ...response.data]
            } catch (error) {
              // Continue if a month has no data
              continue
            }
          }
          // Remove duplicates by employee (keep latest)
          const uniqueSalaries = {}
          allSalaries.forEach((salary) => {
            uniqueSalaries[salary.employeeId] = salary
          })
          allSalaries = Object.values(uniqueSalaries)
        }

        setSalaries(allSalaries)
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

  const getFilteredSalaries = () => {
    let filtered = salaries

    // Always exclude admins from the table
    filtered = filtered.filter((s) => s.jobRole !== 'Admin' && !s.admin)

    // Filter by employee if selected (and not "all")
    if (filterEmployee !== 'all') {
      filtered = filtered.filter((s) => s.employeeId === parseInt(filterEmployee))
    }

    return filtered
  }

  const filteredSalaries = getFilteredSalaries()

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
                {filteredSalaries.map((salary) => (
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
                  <p className="text-gray-600 mb-2">
                    Total Salary {filterEmployee !== 'all' ? '(Selected Employee)' : '(All Employees)'}:
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    Rs. {filteredSalaries.reduce((sum, s) => sum + parseFloat(s.totalSalary || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {filteredSalaries.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-600">
            No salary data available for the selected period
          </div>
        )}
      </div>
    </div>
  )
}

export default SalaryManagement
