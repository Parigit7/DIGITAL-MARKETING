import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import '../styles/LoginPage.css'

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setError('')
  //   setLoading(true)

  //   try {
  //     const response = await authAPI.login(email, password)
  //     onLogin(response.data)
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Invalid email or password')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  try {
    const response = await authAPI.login(email, password)

    const user = response.data

    // ✅ Save to localStorage
    localStorage.setItem("token", user.token)
    localStorage.setItem("user", JSON.stringify(user))

    // ✅ Update app state
    onLogin(user)

    // 🔥 ROLE-BASED REDIRECT
    if (user.jobRole === "Admin") {
      window.location.href = "/admin"
    } else {
      window.location.href = "/employee"
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Invalid email or password')
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-brand">
          <h1 className="login-title">IDEA HUB</h1>
          <p className="login-subtitle">Digital Marketing Agency Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Admin Login</h2>

          {error && (
            <div className="alert alert-error mb-4">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2024 IDEA HUB. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
