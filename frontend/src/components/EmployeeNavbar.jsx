import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EmployeeNavbar({ user, onLogout }) {
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
          <a href="/employee/my-tasks" className="nav-link">
            My Tasks
          </a>
          <a href="/employee/my-salary" className="nav-link">
            My Salary
          </a>
          <a href="/employee/my-profile" className="nav-link">
            My Profile
          </a>
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
          <a href="/employee/my-tasks" className="nav-link mb-2">
            My Tasks
          </a>
          <a href="/employee/my-salary" className="nav-link mb-2">
            My Salary
          </a>
          <a href="/employee/my-profile" className="nav-link mb-2">
            My Profile
          </a>
        </div>
      )}
    </nav>
  )
}

export default EmployeeNavbar
