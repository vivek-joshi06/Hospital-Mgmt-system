// ============================================================
// App.jsx — Root router — MediCore ERP
// ============================================================
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage    from './pages/dashboard/DashboardPage';
import PatientsPage     from './pages/patients/PatientsPage';
import DoctorsPage      from './pages/doctors/DoctorsPage';
import AppointmentsPage from './pages/appointments/AppointmentsPage';
import DepartmentsPage  from './pages/departments/DepartmentsPage';
import ReportsPage      from './pages/reports/ReportsPage';
import SettingsPage     from './pages/settings/SettingsPage';
import ActivityPage     from './pages/activity/ActivityPage';
import PlaceholderPage  from './pages/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<DashboardPage />} />

          {/* Pages to be built page-by-page */}
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page Not Found"
                description="The page you're looking for doesn't exist."
              />
            }
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
