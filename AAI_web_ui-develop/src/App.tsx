import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import { MainLayout } from '@layouts/MainLayout';
import { HomePage } from '@pages/HomePage';
import Index from '@/pages/Index';
import About from '@/pages/About';
import ServiceDetail from '@/pages/ServiceDetail';
import FAQ from '@/pages/FAQ';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Contact from '@/pages/Contact';
import Industries from '@/pages/Industries';
import Solutions from '@/pages/Solutions';
import LegacyNotFound from '@/pages/NotFound';
import AdminSubmissions from '@/pages/AdminSubmissions';
import EmployeePortalLayout from '@/pages/employee-portal/EmployeePortalLayout';
import EmployeePortalProfilePage from '@/pages/employee-portal/EmployeePortalProfilePage';
import EmployeePortalTimesheetPage from '@/pages/employee-portal/EmployeePortalTimesheetPage';
import EmployeePortalHistoryPage from '@/pages/employee-portal/EmployeePortalHistoryPage';
import EmployeePortalNotificationsPage from '@/pages/employee-portal/EmployeePortalNotificationsPage';
import UpdatePassword from '@/pages/UpdatePassword';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/update-password" element={<UpdatePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminSubmissions />} />
        <Route path="/portal" element={<EmployeePortalLayout />}>
          <Route index element={<Navigate to="timesheet" replace />} />
          <Route path="profile" element={<EmployeePortalProfilePage />} />
          <Route path="timesheet" element={<EmployeePortalTimesheetPage />} />
          <Route path="history" element={<EmployeePortalHistoryPage />} />
          <Route path="notifications" element={<EmployeePortalNotificationsPage />} />
        </Route>
        <Route path="/portal/timesheets" element={<Navigate to="/portal/timesheet" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route
          path="/ui-kit"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route path="*" element={<LegacyNotFound />} />
      </Routes>
    </>
  );
}
