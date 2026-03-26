import React, { useState, useEffect } from 'react'
import { employeeAPI } from '../../services/api'

function EmployeeProfile() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee)
    setFormData(employee)
    setEditMode(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    try {
      await employeeAPI.update(selectedEmployee.id, formData)
      setSelectedEmployee(formData)
      setEditMode(false)
      fetchEmployees()
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }

  const handleDeactivate = async () => {
    try {
      await employeeAPI.deactivate(selectedEmployee.id)
      fetchEmployees()
      setSelectedEmployee(null)
    } catch (error) {
      console.error('Error deactivating employee:', error)
    }
  }

  const handleActivate = async () => {
    try {
      await employeeAPI.activate(selectedEmployee.id)
      fetchEmployees()
      setSelectedEmployee(null)
    } catch (error) {
      console.error('Error activating employee:', error)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Employee Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Employee List</h2>
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {employees.map((employee) => (
                  <button
                    key={employee.id}
                    onClick={() => handleSelectEmployee(employee)}
                    className={`w-full text-left px-4 py-3 rounded transition ${
                      selectedEmployee?.id === employee.id
                        ? 'bg-primary text-dark'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{employee.name}</div>
                    <div className="text-sm">{employee.jobRole}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Employee Details */}
        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6">{selectedEmployee.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-gray-600">{selectedEmployee.email}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Job Role</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-gray-600">{selectedEmployee.jobRole}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-gray-600">{selectedEmployee.phoneNo}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-gray-700">WhatsApp</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="whatsappNo"
                      value={formData.whatsappNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-gray-600">{selectedEmployee.whatsappNo}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold text-gray-700">Address</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <p className="text-gray-600">{selectedEmployee.address}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold text-gray-700">Status</label>
                  <p className={`font-semibold ${selectedEmployee.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedEmployee.status}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                {!editMode ? (
                  <>
                    <button onClick={() => setEditMode(true)} className="btn btn-primary">
                      Update
                    </button>
                    {selectedEmployee.status === 'ACTIVE' ? (
                      <button onClick={handleDeactivate} className="btn btn-danger">
                        Deactivate
                      </button>
                    ) : (
                      <button onClick={handleActivate} className="btn btn-success">
                        Activate
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button onClick={handleUpdate} className="btn btn-success">
                      Save Changes
                    </button>
                    <button onClick={() => setEditMode(false)} className="btn btn-secondary">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600">Select an employee to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
