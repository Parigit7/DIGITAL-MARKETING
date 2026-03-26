# 🎯 IDEA HUB - Digital Marketing Agency Management System

A modern, professional web application for managing digital marketing teams, employees, tasks, and salary information. This is a personal project built with React (frontend) and Spring Boot (backend) for a seamless user experience.

## ✨ Features

### 🏢 Admin Dashboard
- **Employee Management** - Add, edit, and manage employee profiles
- **Task Management** - Create and assign tasks to team members
- **Salary Management** - Track and manage employee salaries
- **Employee Profiles** - View detailed employee information and performance metrics

### 👤 Employee Dashboard
- **Personal Dashboard** - Overview of assigned tasks and salary information
- **My Tasks** - Track personal task assignments and deadlines
- **My Salary** - View salary details and payment history
- **My Profile** - Manage personal information and credentials

### 🎨 Modern UI/UX
- Responsive design for mobile, tablet, and desktop devices
- Professional color scheme with yellow (#FFC300) and black branding
- Smooth animations and transitions
- Hamburger navigation for mobile devices
- Back-to-home navigation from all pages

## 🚀 Technologies Used

### Frontend
- **Frontend Framework**: React 18.2.0
- **Routing**: React Router DOM 6.16.0
- **Styling**: Tailwind CSS 3.3.0
- **Build Tool**: Vite 4.5.0
- **CSS Processing**: PostCSS 8.4.32
- **HTTP Client**: Axios (for API calls)

### Backend
- **Framework**: Spring Boot
- **Language**: Java
- **Database**: (Configure based on your setup)
- **API**: RESTful API endpoints

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone or Extract the Project**
   ```bash
   cd Digital_Marketing/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AdminNavbar.jsx        # Admin navigation bar
│   │   ├── EmployeeNavbar.jsx     # Employee navigation bar
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with hero section
│   │   ├── LoginPage.jsx          # Authentication page
│   │   ├── AdminDashboard.jsx     # Admin dashboard
│   │   ├── EmployeeDashboard.jsx  # Employee dashboard
│   │   └── ...
│   ├── admin/
│   │   ├── AddEmployee.jsx        # Add new employee form
│   │   ├── EmployeeProfile.jsx    # Employee profile management
│   │   ├── SalaryManagement.jsx   # Salary management interface
│   │   └── TaskManagement.jsx     # Task management interface
│   ├── employee/
│   │   ├── EmployeeHome.jsx       # Employee home
│   │   ├── MyProfile.jsx          # Employee profile view
│   │   ├── MySalary.jsx           # Salary information
│   │   └── MyTasks.jsx            # Task list
│   ├── services/
│   │   └── api.js                 # API integration
│   ├── styles/
│   │   ├── globals.css            # Global styles
│   │   ├── App.css                # App styles
│   │   ├── Dashboard.css          # Dashboard styles
│   │   └── LoginPage.css          # Login page styles
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── public/
│   └── images/                    # Static image assets
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

## 🎯 Usage

### Admin User
1. Login with admin credentials
2. Access admin dashboard
3. Manage employees, tasks, and salaries
4. View employee profiles and performance metrics

### Employee User
1. Login with employee credentials
2. Access personal dashboard
3. View assigned tasks
4. Check salary information
5. Update personal profile

## 🎨 Design Features

### Color Scheme
- **Primary Yellow**: #FFC300
- **Background Black**: #000000
- **Text White**: #FFFFFF


## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

### File Structure Best Practices
- Keep components modular and reusable
- Use CSS classes from Tailwind CSS
- Implement responsive design for all breakpoints
- Use semantic HTML elements
- Follow React hooks best practices

## 🔐 Authentication

The application uses a role-based authentication system:
- **Admin Role**: Full access to management features
- **Employee Role**: Limited access to personal information

Login credentials are validated against the backend API.

## 🌐 API Integration

The application communicates with a backend API through the `services/api.js` file:
- Authentication endpoints
- Employee management endpoints
- Task management endpoints
- Salary management endpoints


