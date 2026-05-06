import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ChangePassword from "../../auth/components/ChangePassword";
import { adminModules } from "../data/adminModules";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LogOut, Lock, Users, TrendingUp, Clock, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Hardcoded analytics data
  const departmentStats = [
    { name: "Engineering", value: 45, color: "#3b82f6" },
    { name: "Sales", value: 28, color: "#10b981" },
    { name: "HR", value: 15, color: "#8b5cf6" },
    { name: "Marketing", value: 22, color: "#f59e0b" },
  ];

  const attendanceData = [
    { day: "Mon", present: 95, absent: 5 },
    { day: "Tue", present: 92, absent: 8 },
    { day: "Wed", present: 98, absent: 2 },
    { day: "Thu", present: 90, absent: 10 },
    { day: "Fri", present: 88, absent: 12 },
  ];

  const performanceData = [
    { name: "Excellent", value: 35 },
    { name: "Good", value: 45 },
    { name: "Average", value: 15 },
    { name: "Needs Improvement", value: 5 },
  ];

  const performanceColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary mb-3">
                <TrendingUp className="w-4 h-4" />
                Administration Panel
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-muted-light max-w-2xl">
                Manage your organization, track performance, and monitor key metrics all in one place.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="rounded-lg bg-background border border-border px-4 py-3 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-light">Welcome,</span>
                <span className="font-semibold text-foreground">{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-accent-secondary/20 hover:bg-accent-secondary/30 border border-accent-secondary/30 text-accent-secondary rounded-lg font-medium transition"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-danger/20 hover:bg-danger/30 border border-danger/30 text-danger rounded-lg font-medium transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[
            { label: "Total Employees", value: "248", icon: "👥", trend: "+12" },
            { label: "Departments", value: "12", icon: "🏢", trend: "+2" },
            { label: "Present Today", value: "223", icon: "✓", trend: "89.9%" },
            { label: "Pending Leaves", value: "15", icon: "📅", trend: "-3" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              <div className="mt-3 inline-block px-2.5 py-1 bg-success/20 rounded text-xs font-semibold text-success">
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Weekly Attendance</h2>
                <p className="text-muted text-sm mt-1">Employee presence tracking</p>
              </div>
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Employees by Department</h2>
                <p className="text-muted text-sm mt-1">Headcount distribution</p>
              </div>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Ratings */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Performance Ratings</h2>
                <p className="text-muted text-sm mt-1">Employee performance distribution</p>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={performanceColors[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Mark Attendance", action: () => navigate("/admin/attendance"), icon: "📊" },
                { label: "Review Leave Requests", action: () => navigate("/admin/leave-management"), icon: "📋" },
                { label: "Check Payroll", action: () => navigate("/admin/payroll"), icon: "💰" },
                { label: "View Recruitment", action: () => navigate("/admin/recruitment"), icon: "🎯" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-background/80 border border-border transition group"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-foreground font-medium group-hover:text-primary transition">{item.label}</span>
                  <span className="ml-auto text-muted">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Management Modules</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module, idx) => (
            <button
              key={module.key}
              type="button"
              onClick={() => navigate(module.route)}
              className="text-left group slide-up transition"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-glow-blue transition">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold text-white bg-gradient-to-br ${
                      module.accent.includes("violet")
                        ? "from-violet-500 to-violet-600"
                        : module.accent.includes("sky")
                        ? "from-sky-500 to-sky-600"
                        : module.accent.includes("emerald")
                        ? "from-emerald-500 to-emerald-600"
                        : module.accent.includes("amber")
                        ? "from-amber-500 to-amber-600"
                        : module.accent.includes("rose")
                        ? "from-rose-500 to-rose-600"
                        : module.accent.includes("cyan")
                        ? "from-cyan-500 to-cyan-600"
                        : module.accent.includes("indigo")
                        ? "from-indigo-500 to-indigo-600"
                        : "from-fuchsia-500 to-fuchsia-600"
                    }`}
                  >
                    {module.badge}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30">
                    Active
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">
                  {module.title}
                </h3>
                <p className="text-muted text-sm mt-1">{module.subtitle}</p>
                <p className="text-muted-light text-sm mt-3 line-clamp-2">
                  {module.description}
                </p>

                <div className="mt-5 flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition">
                  Access Module
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default AdminDashboard;
