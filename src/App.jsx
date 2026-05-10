import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./features/auth/pages/Login";

const ChangePasswordRequired = lazy(
  () => import("./features/auth/pages/ChangePasswordRequired"),
);
const AdminDashboard = lazy(() => import("./features/admin/pages/Dashboard"));
const Department = lazy(() => import("./features/admin/pages/Department"));
const Employee = lazy(() => import("./features/admin/pages/Employee"));
const Attendance = lazy(() => import("./features/admin/pages/Attendance"));
const Announcements = lazy(
  () => import("./features/admin/pages/Announcements"),
);
const LeaveManagement = lazy(
  () => import("./features/admin/pages/LeaveManagement"),
);
const Payroll = lazy(() => import("./features/admin/pages/Payroll"));
const Performance = lazy(() => import("./features/admin/pages/Performance"));
const Recruitment = lazy(() => import("./features/admin/pages/Recruitment"));
const EmployeeAttendance = lazy(
  () => import("./features/employee/pages/Attendance"),
);
const EmployeeDashboard = lazy(
  () => import("./features/employee/pages/Dashboard"),
);
const EmployeeLeave = lazy(() => import("./features/employee/pages/Leave"));
const Profile = lazy(() => import("./features/employee/pages/Profile"));

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
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
          user?.role === "employee" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/employee/attendance"
        element={
          user?.role === "employee" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeAttendance />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/employee/leave"
        element={
          user?.role === "employee" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <EmployeeLeave />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/departments"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Department />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/employees"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Employee />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/attendance"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Attendance />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/announcements"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Announcements />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/leave-management"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <LeaveManagement />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/payroll"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Payroll />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/performance"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Performance />
            </Suspense>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/admin/recruitment"
        element={
          user?.role === "admin" ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Recruitment />
            </Suspense>
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
              <Suspense fallback={<div>Loading...</div>}>
                <AdminDashboard />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <EmployeeDashboard />
              </Suspense>
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
