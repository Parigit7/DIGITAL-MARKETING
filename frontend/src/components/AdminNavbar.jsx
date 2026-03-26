import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

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
          <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/add-employee" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
            Add Employee
          </NavLink>
          <NavLink to="/admin/employee-profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
            Employee Profile
          </NavLink>
          <NavLink to="/admin/task-management" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
            Task Management
          </NavLink>
          <NavLink to="/admin/salary-management" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`.trim()}>
            Salary Management
          </NavLink>
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
          <NavLink to="/admin" end className={({ isActive }) => `nav-link mb-2 ${isActive ? 'active' : ''}`.trim()}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/add-employee" className={({ isActive }) => `nav-link mb-2 ${isActive ? 'active' : ''}`.trim()}>
            Add Employee
          </NavLink>
          <NavLink to="/admin/employee-profile" className={({ isActive }) => `nav-link mb-2 ${isActive ? 'active' : ''}`.trim()}>
            Employee Profile
          </NavLink>
          <NavLink to="/admin/task-management" className={({ isActive }) => `nav-link mb-2 ${isActive ? 'active' : ''}`.trim()}>
            Task Management
          </NavLink>
          <NavLink to="/admin/salary-management" className={({ isActive }) => `nav-link mb-2 ${isActive ? 'active' : ''}`.trim()}>
            Salary Management
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default AdminNavbar
