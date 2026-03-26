import React, { useState, useEffect } from 'react'
import { taskAPI } from '../../services/api'

function MyTasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())
  const [taskStatus, setTaskStatus] = useState('to-do')
  const [editingTask, setEditingTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

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

  const getFilteredTasks = () => {
    let filtered = tasks

    const statusMap = { 'to-do': 'TO_DO', 'in-progress': 'IN_PROGRESS', 'completed': 'COMPLETED' }
    filtered = filtered.filter((t) => t.taskStatus === statusMap[taskStatus])

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
              <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger btn-sm flex-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
