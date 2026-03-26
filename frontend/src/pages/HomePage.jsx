import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="modern-home">
      {/* Gradient Background Elements */}
      <div className="gradient-sphere gradient-sphere-1"></div>
      <div className="gradient-sphere gradient-sphere-2"></div>
      <div className="gradient-sphere gradient-sphere-3"></div>

      {/* Navigation Bar */}
      <nav className="navbar fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="navbar-brand">IDEA HUB</div>
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="modern-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Manage Your Work</h1>
            <h2 className="hero-subtitle">Beautifully Simple</h2>
            <p className="hero-description">
              Track tasks, monitor salary, and achieve your goals in one intuitive platform designed for modern teams.
            </p>
            
            <div className="cta-group">
              <button 
                onClick={() => navigate('/login')} 
                className="btn-primary-modern"
              >
                Get Started
              </button>
              <button className="btn-secondary-modern">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="modern-stats">
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">10K+</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="modern-cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join your team and start managing your work today</p>
          <button 
            onClick={() => navigate('/login')} 
            className="btn-primary-modern btn-large"
          >
            Login Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
