import React, { useState, useEffect } from 'react'
import { taskAPI, employeeAPI } from '../../services/api'

function TaskManagement() {
  const [tasks, setTasks] = useState([])
  const [filterEmployee, setFilterEmployee] = useState('all')
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [taskStatus, setTaskStatus] = useState('to-do')
  const [employees, setEmployees] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [loading, setLoading] = useState(false)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    links: '',
    assignedEmployeeId: '',
    completedDate: '',
    salary: '',
    taskStatus: 'TO_DO',
  })

  useEffect(() => {
    fetchEmployees()
    fetchTasks()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getActive()
      // Filter out admins - only show regular employees
      const regularEmployees = response.data.filter((emp) => !emp.admin && emp.jobRole !== 'Admin')
      setEmployees(regularEmployees)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll()
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const getFilteredTasks = () => {
    let filtered = tasks

    if (filterEmployee !== 'all') {
      filtered = filtered.filter((t) => t.assignedEmployeeId === parseInt(filterEmployee))
    }

    const statusMap = { 'to-do': 'TO_DO', 'in-progress': 'IN_PROGRESS', 'completed': 'COMPLETED' }
    filtered = filtered.filter((t) => t.taskStatus === statusMap[taskStatus])

    // Filter by year and month
    filtered = filtered.filter((task) => {
      if (!task.assignedDate) return false
      
      const taskDate = new Date(task.assignedDate)
      const taskYear = taskDate.getFullYear()
      const taskMonth = taskDate.getMonth() + 1

      const yearMatch = taskYear === parseInt(filterYear)
      const monthMatch = filterMonth === 'all' || taskMonth === parseInt(filterMonth)

      return yearMatch && monthMatch
    })

    return filtered
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingTask) {
        await taskAPI.update(editingTask.id, formData)
      } else {
        await taskAPI.create(formData)
      }
      fetchTasks()
      setShowModal(false)
      setFormData({
        title: '',
        companyName: '',
        description: '',
        links: '',
        assignedEmployeeId: '',
        completedDate: '',
        salary: '',
        taskStatus: 'TO_DO',
      })
      setEditingTask(null)
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData(task)
    setShowModal(true)
  }

  const handleView = (task) => {
    setSelectedTask(task)
    setShowViewModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id)
        fetchTasks()
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  const openAddModal = () => {
    setEditingTask(null)
    setFormData({
      title: '',
      companyName: '',
      description: '',
      links: '',
      assignedEmployeeId: '',
      completedDate: '',
      salary: '',
      taskStatus: 'TO_DO',
    })
    setShowModal(true)
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <button onClick={openAddModal} className="btn btn-primary">
          + Add Task
        </button>
      </div>

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

      {/* Status Tabs */}
      <div className="flex gap-4 mb-6">
        {['to-do', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setTaskStatus(status)}
            className={`px-6 py-2 rounded font-medium transition ${
              taskStatus === status
                ? 'bg-primary text-dark'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {status.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card relative flex flex-col min-h-64">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{task.title}</h3>
            {task.companyName && <p className="text-sm text-gray-600 mb-2">Company: {task.companyName}</p>}
            <p className="text-sm text-gray-600 mb-4">Assigned: {task.assignedEmployeeName}</p>

            <div className="space-y-1 text-sm mb-4 flex-1">
              <p>
                <span className="font-semibold">Status:</span> {task.taskStatus.replace('_', ' ')}
              </p>
              {task.salary && <p>
                <span className="font-semibold">Salary:</span> Rs. {task.salary}
              </p>}
            </div>

            <div className="flex gap-2 absolute bottom-6 left-6 right-6">
              <button onClick={() => handleView(task)} className="btn btn-secondary btn-sm flex-1">
                View
              </button>
              <button onClick={() => handleEdit(task)} className="btn btn-primary btn-sm flex-1">
                Edit
              </button>
              <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-600">No tasks found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowModal(false)} className="modal-close">
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6">{editingTask ? 'Edit Task' : 'Add Task'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength="100"
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Links</label>
                <input
                  type="text"
                  name="links"
                  value={formData.links}
                  onChange={handleChange}
                  placeholder="Google Drive links, etc."
                />
              </div>

              <div className="form-group">
                <label>Assign Employee *</label>
                <select
                  name="assignedEmployeeId"
                  value={formData.assignedEmployeeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Completed Date *</label>
                <input
                  type="date"
                  name="completedDate"
                  value={formData.completedDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary.toString()}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="taskStatus"
                  value={formData.taskStatus}
                  onChange={handleChange}
                >
                  <option value="TO_DO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? 'Saving...' : 'Save Task'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowViewModal(false)} className="modal-close">
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6">{selectedTask.title}</h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600">Company</p>
                <p className="font-semibold">{selectedTask.companyName || 'N/A'}</p>
              </div>

              <div>
                <p className="text-gray-600">Description</p>
                <p className="font-semibold">{selectedTask.description}</p>
              </div>

              <div>
                <p className="text-gray-600">Assigned Employee</p>
                <p className="font-semibold">{selectedTask.assignedEmployeeName}</p>
              </div>

              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-semibold">{selectedTask.taskStatus.replace('_', ' ')}</p>
              </div>

              <div>
                <p className="text-gray-600">Completed Date</p>
                <p className="font-semibold">{selectedTask.completedDate}</p>
              </div>

              <div>
                <p className="text-gray-600">Salary</p>
                <p className="font-semibold">Rs. {parseFloat(selectedTask.salary || 0).toFixed(2)}</p>
              </div>

              {selectedTask.links && (
                <div>
                  <p className="text-gray-600 mb-2">Links</p>
                  <a
                    href={selectedTask.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all font-semibold"
                  >
                    {selectedTask.links}
                  </a>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setShowViewModal(false)
                    handleEdit(selectedTask)
                  }}
                  className="btn btn-primary w-full"
                >
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskManagement
