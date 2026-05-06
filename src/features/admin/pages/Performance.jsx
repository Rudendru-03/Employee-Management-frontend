import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, Users, Award } from "lucide-react";

const Performance = () => {
  const navigate = useNavigate();

  // Hardcoded performance data
  const performanceData = [
    { name: "Q1 2024", overall: 78, target: 85 },
    { name: "Q2 2024", overall: 82, target: 85 },
    { name: "Q3 2024", overall: 85, target: 85 },
    { name: "Q4 2024", overall: 88, target: 85 },
  ];

  const departmentPerformance = [
    { name: "Engineering", score: 88, employees: 45 },
    { name: "Sales", score: 82, employees: 28 },
    { name: "Marketing", score: 85, employees: 22 },
    { name: "HR", score: 90, employees: 15 },
    { name: "Operations", score: 83, employees: 18 },
  ];

  const performanceDistribution = [
    { name: "Excellent (85+)", value: 35, color: "#10b981" },
    { name: "Good (75-84)", value: 45, color: "#3b82f6" },
    { name: "Average (65-74)", value: 15, color: "#f59e0b" },
    { name: "Needs Improvement (<65)", value: 5, color: "#ef4444" },
  ];

  const employeeRatings = [
    { name: "John Doe", score: 92, department: "Engineering" },
    { name: "Jane Smith", score: 88, department: "Sales" },
    { name: "Mike Johnson", score: 85, department: "Marketing" },
    { name: "Sarah Williams", score: 90, department: "HR" },
    { name: "Tom Brown", score: 78, department: "Operations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-background rounded-lg transition text-muted hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="slide-up">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Performance Management</h1>
              <p className="text-muted-light mt-2">Monitor employee performance, ratings, and goal progress</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Overall Score</p>
                <p className="text-4xl font-bold text-primary mt-2">88%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-success mt-3">↑ +3% from last quarter</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Top Performers</p>
                <p className="text-4xl font-bold text-accent mt-2">34</p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xs text-muted-light mt-3">Employees with 85+ score</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Team Average</p>
                <p className="text-4xl font-bold text-warning mt-2">82%</p>
              </div>
              <Users className="w-8 h-8 text-warning" />
            </div>
            <p className="text-xs text-muted-light mt-3">Across all departments</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up">
            <h2 className="text-xl font-bold text-foreground mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  formatter={(value) => `${value}%`}
                />
                <Legend />
                <Line type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 6 }} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Distribution */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Rating Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
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
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Department Scores</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  formatter={(value) => `${value}/100`}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Employees */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Top Performers</h2>
            <div className="space-y-3">
              {employeeRatings.map((emp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted">{emp.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{emp.score}%</p>
                    <div className="w-20 h-2 bg-background rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-light"
                        style={{ width: `${emp.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Cycles */}
        <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "400ms" }}>
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Review Cycles</h2>
          <div className="space-y-3">
            {[
              { cycle: "Annual 2024", status: "Completed", employees: 248, date: "Mar 15, 2024" },
              { cycle: "Mid-year 2024", status: "In Progress", employees: 248, date: "June 30, 2024" },
              { cycle: "Q4 Review", status: "Scheduled", employees: 248, date: "Dec 15, 2024" },
            ].map((review, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background/80 transition">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{review.cycle}</p>
                  <p className="text-sm text-muted">{review.employees} employees</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    review.status === 'Completed' ? 'bg-success/20 text-success' :
                    review.status === 'In Progress' ? 'bg-warning/20 text-warning' :
                    'bg-info/20 text-info'
                  }`}>
                    {review.status}
                  </span>
                  <p className="text-xs text-muted mt-1">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Performance;
