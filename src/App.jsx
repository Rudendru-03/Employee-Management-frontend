import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./features/admin/pages/Dashboard";
import Department from "./features/admin/pages/Department";
import Employee from "./features/admin/pages/Employee";
import Attendance from "./features/admin/pages/Attendance";
import Announcements from "./features/admin/pages/Announcements";
import LeaveManagement from "./features/admin/pages/LeaveManagement";
import Payroll from "./features/admin/pages/Payroll";
import Performance from "./features/admin/pages/Performance";
import Recruitment from "./features/admin/pages/Recruitment";
import DemoPage from "./features/admin/pages/DemoPage";
import ChangePasswordRequired from "./features/auth/pages/ChangePasswordRequired";
import Login from "./features/auth/pages/Login";
import EmployeeAttendance from "./features/employee/pages/Attendance";
import EmployeeDashboard from "./features/employee/pages/Dashboard";
import EmployeeLeave from "./features/employee/pages/Leave";
import Profile from "./features/employee/pages/Profile";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-light font-medium">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Demo route - no auth required */}
      <Route path="/demo" element={<DemoPage />} />
      
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/change-password-required"
        element={user ? <ChangePasswordRequired /> : <Navigate to="/login" />}
      />
      <Route
        path="/employee/profile"
        element={
          user?.role === "employee" ? <Profile /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/employee/attendance"
        element={
          user?.role === "employee" ? (
            <EmployeeAttendance />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/employee/leave"
        element={
          user?.role === "employee" ? (
            <EmployeeLeave />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/departments"
        element={
          user?.role === "admin" ? <Department /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/admin/employees"
        element={
          user?.role === "admin" ? <Employee /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/admin/attendance"
        element={
          user?.role === "admin" ? <Attendance /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/admin/announcements"
        element={
          user?.role === "admin" ? (
            <Announcements />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/leave-management"
        element={
          user?.role === "admin" ? (
            <LeaveManagement />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/payroll"
        element={
          user?.role === "admin" ? <Payroll /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/admin/performance"
        element={
          user?.role === "admin" ? (
            <Performance />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/recruitment"
        element={
          user?.role === "admin" ? (
            <Recruitment />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <EmployeeDashboard />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
