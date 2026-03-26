import React, { useState, useEffect } from 'react'
import { taskAPI } from '../../services/api'

function MyTasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [filterMonth, setFilterMonth] = useState('all')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [taskStatus, setTaskStatus] = useState('to-do')
  const [editingTask, setEditingTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const [selectedTask, setSelectedTask] = useState(null)
const [showViewModal, setShowViewModal] = useState(false)

  const [formData, setFormData] = useState({
    taskStatus: 'TO_DO',
    links: '',
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getByEmployee(user.employeeId)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }
  const handleView = (task) => {
  setSelectedTask(task)
  setShowViewModal(true)
}

  const getFilteredTasks = () => {
    let filtered = tasks

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
      await taskAPI.update(editingTask.id, {
        ...editingTask,
        taskStatus: formData.taskStatus,
        links: formData.links,
      })
      fetchTasks()
      setShowModal(false)
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      taskStatus: task.taskStatus,
      links: task.links || '',
    })
    setShowModal(true)
  }

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(id)
        fetchTasks()
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  const filteredTasks = getFilteredTasks()

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tasks</h1>

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
          <div key={task.id} className="card">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{task.title}</h3>
            {task.companyName && <p className="text-sm text-gray-600 mb-2">Company: {task.companyName}</p>}

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Status:</span> {task.taskStatus.replace('_', ' ')}
            </p>

            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">Completed Date:</span> {task.completedDate}
            </p>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(task)} className="btn btn-primary btn-sm flex-1">
                Update Status
              </button>
              <button 
              onClick={() => handleView(task)} 
              className="btn btn-secondary btn-sm flex-1"
            >
              View
            </button>
            </div>
          </div>
        ))}
      </div>
      {showViewModal && selectedTask && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn">

      {/* Close */}
      <button
        onClick={() => setShowViewModal(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
      >
        ×
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        {selectedTask.title}
      </h2>

      {/* Content */}
      <div className="space-y-3 text-sm text-gray-700">

        <p><strong>Company:</strong> {selectedTask.companyName || 'N/A'}</p>

        <p><strong>Status:</strong> {selectedTask.taskStatus.replace('_', ' ')}</p>

        <p><strong>Completed Date:</strong> {selectedTask.completedDate}</p>

        <p><strong>Salary:</strong> Rs. {selectedTask.salary || 0}</p>

        <div>
          <strong>Description:</strong>
          <p className="mt-1 text-gray-600">
            {selectedTask.description}
          </p>
        </div>

        {selectedTask.links && (
          <div>
            <strong>Links:</strong>
            <p className="text-blue-600 break-all mt-1">
              {selectedTask.links}
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
)}

      {filteredTasks.length === 0 && !loading && (
        <div className="card text-center py-12">
          <p className="text-gray-600">No tasks found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && editingTask && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowModal(false)} className="modal-close">
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6">Update Task</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Task Title: {editingTask.title}</h3>
                <p className="text-gray-600 mb-4">{editingTask.description}</p>
              </div>

              <div className="form-group">
                <label>Task Status</label>
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

              <div className="form-group">
                <label>Task Link/Notes</label>
                <textarea
                  name="links"
                  value={formData.links}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Update task link or add notes"
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? 'Updating...' : 'Update Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyTasks
