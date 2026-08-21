# Hospital Management System (HMS / ERP)

A modern, full-stack Hospital Management & ERP Application built with **ASP.NET Core Web API** on the backend and **React 19 + Vite** on the frontend. This platform streamlines hospital administrative tasks, patient registration, doctor scheduling, department management, and appointment workflows.

---

## Features

- **Doctor Management**: Manage doctor records, specializations, contact details, and department allocations.
- **Patient Management**: Complete patient onboarding, medical history tracking, and contact details.
- **Appointment System**: Schedule, update, track, and cancel patient appointments with real-time status updates.
- **Department Operations**: Organize hospital divisions, monitor capacities, and handle department assignments.
- **Interactive Dashboard**: Real-time analytics, daily appointment trends, patient check-ins, and system activities.
- **Robust Validation**: Server-side request validation via `FluentValidation` and frontend schema validation with `Zod` and `React Hook Form`.
- **Modern API Explorer**: Interactive API documentation powered by `Scalar` and ASP.NET Core OpenAPI.

---

## Tech Stack

### **Backend (`/Hospital_management_system`)**
- **Framework**: .NET 10 / ASP.NET Core Web API
- **Database ORM**: Entity Framework Core 10 (SQL Server)
- **Validation**: FluentValidation & FluentValidation.DependencyInjectionExtensions
- **API Documentation**: Scalar.AspNetCore & Microsoft.AspNetCore.OpenApi
- **Language**: C# 13

### **Frontend (`/hospital-erp`)**
- **Framework / Build Tool**: React 19 + Vite 8
- **Styling**: TailwindCSS v4 & Custom Utilities
- **UI Components & Icons**: Lucide React, Framer Motion
- **Table & Data Display**: TanStack React Table v8
- **Form Handling & Validation**: React Hook Form, Zod, @hookform/resolvers
- **HTTP Client & Notifications**: Axios, React Hot Toast
- **Routing**: React Router v7

---

## Repository Structure

```text
Hospital-Mgmt-system/
├── Hospital_management_system/        # ASP.NET Core Web API Backend
│   ├── Controllers/                  # API Controllers (Doctors, Patients, Appointments, etc.)
│   ├── Data/                         # EF Core AppDbContext & Database Configurations
│   ├── DTO/                          # Data Transfer Objects
│   ├── Model/                        # Database Entities & Models
│   ├── Migrations/                   # EF Core Database Migrations
│   ├── Validator/                    # FluentValidation Request Rules
│   ├── Program.cs                    # Application Entry Point & Service Registrations
│   └── Hospital_management_system.csproj
│
├── hospital-erp/                      # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/               # Reusable UI Components
│   │   ├── pages/                    # Application Views (Dashboard, Patients, Doctors, etc.)
│   │   ├── config/                   # API Axios Client & Configuration
│   │   ├── data/                     # Mock Data & Constants
│   │   ├── utils/                    # Utility Functions
│   │   ├── App.jsx                   # Main Component & Routing
│   │   └── main.jsx                  # React DOM Renderer
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore                         # Project-wide Git Exclusion File
└── README.md                          # Project Documentation
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:
- [.NET 10 SDK](https://dotnet.microsoft.com/download) (or matching .NET SDK version)
- [Node.js](https://nodejs.org/) (v18.x or higher) & `npm`
- [Microsoft SQL Server](https://www.microsoft.com/sql-server/) (or SQL Server Express)

---

### 1. Backend Setup (ASP.NET Core API)

1. **Navigate to the backend directory**:
   ```bash
   cd Hospital_management_system
   ```

2. **Configure Database Connection**:
   Update `appsettings.json` with your local SQL Server instance connection string:
   ```json
   "ConnectionStrings": {
     "defaultConnection": "Server=YOUR_SERVER_NAME;Database=HMS;trusted_connection=true;trustServerCertificate=true;"
   }
   ```

3. **Restore Dependencies & Apply Database Migrations**:
   ```bash
   dotnet restore
   dotnet ef database update
   ```

4. **Run the API**:
   ```bash
   dotnet run
   ```
   - The API server will start locally.
   - **Scalar API Documentation** is accessible in development mode at:
     ```text
     https://localhost:7198/
     # or
     http://localhost:5247/
     ```

---

### 2. Frontend Setup (React ERP Dashboard)

1. **Navigate to the frontend directory**:
   ```bash
   cd hospital-erp
   ```

2. **Install Node Packages**:
   ```bash
   npm install
   ```

3. **Start the Vite Development Server**:
   ```bash
   npm run dev
   ```
   - The frontend application will run locally at `http://localhost:5173`.

---

## API Endpoints Summary

| Module | Route Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Patients** | `/api/patient` | `GET`, `POST`, `PUT`, `DELETE` | CRUD operations for Patient records |
| **Doctors** | `/api/doctor` | `GET`, `POST`, `PUT`, `DELETE` | Manage Doctors & Specializations |
| **Appointments**| `/api/appointment` | `GET`, `POST`, `PUT`, `DELETE` | Schedule & Update Appointments |
| **Departments** | `/api/department` | `GET`, `POST`, `PUT`, `DELETE` | Department Management |
| **Users** | `/api/user` | `GET`, `POST`, `PUT`, `DELETE` | User Authentication & Profiles |
| **Dashboard** | `/api/dahbard` | `GET` | System Overview & Statistics |

---

## License

This project is licensed under the [MIT License](LICENSE) - feel free to use and adapt for your needs.
