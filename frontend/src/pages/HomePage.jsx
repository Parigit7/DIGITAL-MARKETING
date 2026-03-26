import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-x-hidden">
      {/* Gradient Background Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-radial from-yellow-400 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" style={{animation: 'float 20s ease-in-out infinite'}}></div>
      <div className="fixed bottom-1/4 left-0 w-72 h-72 bg-gradient-radial from-yellow-500 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" style={{animation: 'float 25s ease-in-out infinite reverse'}}></div>
      <div className="fixed top-1/2 left-2/5 w-full max-w-96 h-96 bg-gradient-radial from-yellow-400 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none" style={{animation: 'float 30s ease-in-out infinite'}}></div>

      {/* Navigation Bar */}
      <nav className="navbar fixed top-0 left-0 right-0 z-40 bg-transparent border-b border-yellow-400 border-opacity-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-yellow-400 tracking-wide hover:text-yellow-300 transition-colors cursor-pointer"
          >
            IDEA HUB
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-16">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text */}
          <div className="animate-fadeInUp">
            <h1 className="text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-tight text-white">Manage Your Work</h1>
            <h2 className="text-4xl lg:text-5xl font-semibold text-yellow-400 mb-6 tracking-wide">Beautifully Simple</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-md">
              Track tasks, monitor salary, and achieve your goals in one intuitive platform designed for modern teams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => navigate('/login')} 
                className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-yellow-400/30 transition-all transform hover:-translate-y-1"
              >
                Get Started
              </button>
              
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="hidden lg:flex relative h-96 items-center justify-center animate-fadeInRight">
            {/* Large Yellow Circle Background */}
            <div className="absolute w-96 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full blur-2xl opacity-20 pointer-events-none" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
            <div className="absolute w-80 h-80 border-2 border-yellow-400 border-opacity-30 rounded-full" style={{animation: 'rotate 20s linear infinite'}}></div>
            
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Center Icon */}
              <div className="absolute z-20 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/50" style={{animation: 'float 3s ease-in-out infinite'}}>
                <span className="text-5xl">✨</span>
              </div>

              {/* Card 1 - Top Left */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-black/40 border border-yellow-400/60 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md hover:bg-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer shadow-lg shadow-yellow-400/20" style={{animation: 'float 6s ease-in-out infinite 0s'}}>
                <div className="text-4xl">📷</div>
              </div>

              {/* Card 2 - Top Right */}
              <div className="absolute top-6 right-0 w-24 h-24 bg-black/40 border border-yellow-400/60 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md hover:bg-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer shadow-lg shadow-yellow-400/20" style={{animation: 'float 6s ease-in-out infinite 0.3s'}}>
                <div className="text-4xl">📊</div>
              </div>

              {/* Card 3 - Bottom Right */}
              <div className="absolute bottom-0 right-2 w-24 h-24 bg-black/40 border border-yellow-400/60 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md hover:bg-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer shadow-lg shadow-yellow-400/20" style={{animation: 'float 6s ease-in-out infinite 0.6s'}}>
                <div className="text-4xl">📱</div>
              </div>

              {/* Card 4 - Bottom Left */}
              <div className="absolute bottom-4 left-3 w-24 h-24 bg-black/40 border border-yellow-400/60 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md hover:bg-yellow-400/20 transition-all transform hover:-translate-y-2 cursor-pointer shadow-lg shadow-yellow-400/20" style={{animation: 'float 6s ease-in-out infinite 0.9s'}}>
                <div className="text-4xl">🎯</div>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes slideIn {
          0%, 100% { width: 100%; opacity: 0.6; }
          50% { width: 85%; opacity: 1; }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 1.2s ease forwards;
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

export default HomePage
