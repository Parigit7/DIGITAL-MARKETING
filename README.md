# IDEEZ - Digital Marketing Agency Management System

A comprehensive full-stack web application for managing employees, tasks, and salaries in a digital marketing agency.

## Features

### Admin Panel
- **Employee Management**: Add, update, and manage employee profiles
- **Task Management**: Create, assign, and track tasks with status updates
- **Salary Management**: Calculate and view employee salaries based on completed tasks
- **Employee Deactivation**: Prevent inactive employees from accessing the system

### Employee Portal
- **My Tasks**: View and update assigned tasks with status changes
- **My Salary**: View earned salaries from completed tasks
- **My Profile**: View profile information (read-only)

## Tech Stack

### Backend
- **Spring Boot 3.1.5** - Java web framework
- **Spring Security** - Authentication and authorization
- **JWT** - Token-based authentication
- **JPA/Hibernate** - ORM
- **MySQL** - Database
- **Maven** - Build tool

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Prerequisites

- Java 17+
- Node.js 16+
- npm or yarn
- MySQL 8.0+

## Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Update database configuration** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ideez_agency
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. **Create database:**
   ```sql
   CREATE DATABASE ideez_agency;
   ```

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The frontend will start at `http://localhost:5173`

## Default Login

Create an admin user first through the backend, or update the database directly:

```sql
INSERT INTO employees (name, nic, birthday, gender, phone_no, whatsapp_no, email, address, job_role, join_date, password, status, created_at, updated_at) 
VALUES ('Admin User', '123456789', '1990-01-01', 'Male', '1234567890', '9876543210', 'admin@ideez.com', 'Address', 'Admin', NOW(), '$2a$10$...', 'ACTIVE', NOW(), NOW());
```

Login with: `admin@ideez.com`

## Project Structure

### Backend
```
backend/
├── src/main/java/com/ideez/agency/
│   ├── controller/        # REST API endpoints
│   ├── service/          # Business logic
│   ├── entity/           # JPA entities
│   ├── repository/       # Data access layer
│   ├── dto/              # Data transfer objects
│   └── security/         # JWT and security config
├── resources/
│   └── application.properties
└── pom.xml
```

### Frontend
```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── admin/       # Admin components
│   │   └── employee/    # Employee components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # CSS files
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/ping` - Health check

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/active` - Get active employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `PUT /api/employees/:id/deactivate` - Deactivate employee
- `PUT /api/employees/:id/activate` - Activate employee

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/employee/:employeeId` - Get tasks by employee

### Salaries
- `GET /api/salaries/:year/:month` - Get salaries for period
- `GET /api/salaries/all` - Get all total salaries

## Job Roles

The system supports the following job roles:
- Strategy Planner
- Client Manager
- Sales Person
- Social Media Manager
- Content Creator
- Graphic Designer
- Video Editor
- Copywriter
- Ads Manager
- SEO Beginner
- Data Analyst
- Customer Support
- Brand Manager
- Researcher

## Color Scheme

- **Primary Color**: #FFC300 (Gold/Yellow)
- **Dark Color**: #000000 (Black)
- **Background Light**: #f5f5f5
- **Background Dark**: #1a1a1a

## Security

- JWT token-based authentication
- Passwords encrypted with BCrypt
- CORS configuration for frontend access
- Role-based access control

## Features in Detail

### Task Management
- Create tasks with title, description, company name, and links
- Assign tasks to active employees only
- Set completed date and salary for tasks
- Track task status (To Do, In Progress, Completed)
- Filter tasks by employee and date range
- Update and delete tasks

### Salary Calculation
- Salaries are calculated from completed tasks
- Salary is associated with the completed date
- View monthly or yearly salary reports
- Filter by employee and date range

### Employee Management
- Add new employees with detailed information
- Update employee information
- Deactivate employees (prevents login)
- View employee profiles with all details

## Production Deployment

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build backend:**
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

3. **Update JWT secret** in `application.properties` for production

4. **Configure database** for production MySQL instance

5. **Deploy** using your preferred hosting platform

## Troubleshooting

### CORS Issues
Update `application.properties` with correct frontend URL:
```properties
cors.allowed-origins=http://your-frontend-url
```

### Database Connection
Ensure MySQL is running and credentials are correct in `application.properties`

### Port Conflicts
- Backend default: 8080
- Frontend default: 5173

Change ports in config files if needed.

## Future Enhancements

- Email notifications
- Attendance tracking
- Performance analytics
- Custom salary rules
- Invoice generation
- Team collaboration features

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please contact the development team.
