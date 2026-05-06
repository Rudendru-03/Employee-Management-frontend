import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, Users, Award, CheckCircle } from "lucide-react";

const DemoPage = () => {
  const navigate = useNavigate();

  const attendanceData = [
    { day: "Mon", present: 95, absent: 5 },
    { day: "Tue", present: 92, absent: 8 },
    { day: "Wed", present: 98, absent: 2 },
    { day: "Thu", present: 90, absent: 10 },
    { day: "Fri", present: 88, absent: 12 },
  ];

  const departmentStats = [
    { name: "Engineering", value: 45, color: "#3b82f6" },
    { name: "Sales", value: 28, color: "#10b981" },
    { name: "HR", value: 15, color: "#8b5cf6" },
    { name: "Marketing", value: 22, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-foreground">Design System Demo</h1>
          <p className="text-muted-light mt-2">Showing the new modern theme and components</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Color Palette */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-background h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Background</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-primary h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Primary</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-success h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Success</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-danger h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Danger</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-warning h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Warning</p>
            </div>
            <div className="rounded-lg overflow-hidden shadow">
              <div className="bg-info h-20"></div>
              <p className="p-3 bg-card text-foreground text-sm font-medium">Info</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Stat Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Employees", value: "248", icon: "👥" },
              { label: "Present Today", value: "223", icon: "✓" },
              { label: "Open Positions", value: "12", icon: "📋" },
              { label: "Pending Approvals", value: "18", icon: "⏳" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                />
                <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
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
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition">
              Primary Button
            </button>
            <button className="px-6 py-2.5 bg-success hover:bg-success text-white rounded-lg font-medium transition">
              Success Button
            </button>
            <button className="px-6 py-2.5 bg-danger hover:bg-danger text-white rounded-lg font-medium transition">
              Danger Button
            </button>
            <button className="px-6 py-2.5 bg-background border border-border text-foreground hover:bg-background/80 rounded-lg font-medium transition">
              Secondary Button
            </button>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Heading 1 - 4xl Bold</h1>
            <h2 className="text-3xl font-bold text-foreground">Heading 2 - 3xl Bold</h2>
            <h3 className="text-2xl font-bold text-foreground">Heading 3 - 2xl Bold</h3>
            <p className="text-lg text-card-foreground">Body text - Large (lg)</p>
            <p className="text-base text-card-foreground">Body text - Base/Normal</p>
            <p className="text-sm text-muted">Small text - Secondary</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-info/10 border border-info/30 rounded-xl p-6 text-info">
          <h3 className="font-bold mb-2">Design System Information</h3>
          <p className="text-sm leading-relaxed">
            This is a preview of the modern design system implemented across all pages. 
            The system includes dark theme support, responsive layouts, smooth animations, 
            and comprehensive component library built with Tailwind CSS and Recharts.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DemoPage;
