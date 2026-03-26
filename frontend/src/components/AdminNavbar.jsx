import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminNavbar({ user, onLogout }) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="navbar-brand">IDEEZ</div>

        <div className="hidden md:flex navbar-nav">
          <Link to="/admin/add-employee" className="nav-link">
            Add Employee
          </Link>
          <Link to="/admin/employee-profile" className="nav-link">
            Employee Profile
          </Link>
          <Link to="/admin/task-management" className="nav-link">
            Task Management
          </Link>
          <Link to="/admin/salary-management" className="nav-link">
            Salary Management
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white text-sm hidden sm:inline">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-primary text-dark px-4 py-2 rounded font-medium hover:bg-primary-dark transition"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-dark bg-opacity-95 px-6 py-4 absolute top-full left-0 right-0 navbar-nav flex-col">
          <Link to="/admin/add-employee" className="nav-link mb-2">
            Add Employee
          </Link>
          <Link to="/admin/employee-profile" className="nav-link mb-2">
            Employee Profile
          </Link>
          <Link to="/admin/task-management" className="nav-link mb-2">
            Task Management
          </Link>
          <Link to="/admin/salary-management" className="nav-link mb-2">
            Salary Management
          </Link>
        </div>
      )}
    </nav>
  )
}

export default AdminNavbar
