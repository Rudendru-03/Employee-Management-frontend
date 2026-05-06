import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowLeft, Briefcase, Users, Clock, CheckCircle } from "lucide-react";

const Recruitment = () => {
  const navigate = useNavigate();

  // Hardcoded recruitment data
  const openPositions = [
    { position: "Senior Engineer", applications: 24, stage: "Interview" },
    { position: "Product Manager", applications: 18, stage: "Screening" },
    { position: "UX Designer", applications: 14, stage: "Interview" },
    { position: "Data Analyst", applications: 11, stage: "Offer" },
    { position: "Sales Executive", applications: 22, stage: "Screening" },
  ];

  const recruitmentFunnel = [
    { name: "Applied", value: 320 },
    { name: "Screening", value: 180 },
    { name: "Interview", value: 75 },
    { name: "Offer", value: 24 },
    { name: "Hired", value: 18 },
  ];

  const candidateStages = [
    { name: "Applied", value: 140, color: "#94a3b8" },
    { name: "Screening", value: 105, color: "#f59e0b" },
    { name: "Interview", value: 51, color: "#3b82f6" },
    { name: "Offer", value: 6, color: "#10b981" },
  ];

  const upcomingInterviews = [
    { candidate: "Alex Chen", position: "Senior Engineer", time: "Today 2:00 PM", interviewer: "Sarah" },
    { candidate: "Emma Wilson", position: "UX Designer", time: "Tomorrow 10:00 AM", interviewer: "Mike" },
    { candidate: "James Lee", position: "Product Manager", time: "May 8, 11:00 AM", interviewer: "John" },
    { candidate: "Lisa Johnson", position: "Data Analyst", time: "May 9, 3:00 PM", interviewer: "Sarah" },
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Recruitment Pipeline</h1>
              <p className="text-muted-light mt-2">Manage candidates, track job openings, and schedule interviews</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Open Positions</p>
                <p className="text-4xl font-bold text-primary mt-2">5</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Applications</p>
                <p className="text-4xl font-bold text-info mt-2">320</p>
              </div>
              <Users className="w-8 h-8 text-info" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">In Interview</p>
                <p className="text-4xl font-bold text-warning mt-2">75</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Hired YTD</p>
                <p className="text-4xl font-bold text-success mt-2">18</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recruitment Funnel */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up">
            <h2 className="text-xl font-bold text-foreground mb-4">Recruitment Funnel</h2>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart data={recruitmentFunnel}>
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
                />
                <Funnel dataKey="value" data={recruitmentFunnel} fill="#3b82f6" />
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Candidate Stages */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Candidates by Stage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={candidateStages}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {candidateStages.map((entry, index) => (
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

          {/* Open Positions */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Open Positions</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={openPositions}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="position" width={100} stroke="var(--muted)" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="applications" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Interviews</h2>
            <div className="space-y-3">
              {upcomingInterviews.map((interview, idx) => (
                <div key={idx} className="p-4 bg-background rounded-lg hover:border-primary border border-transparent transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{interview.candidate}</p>
                      <p className="text-sm text-muted">{interview.position}</p>
                      <p className="text-xs text-muted-light mt-1">With: {interview.interviewer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-primary">{interview.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Openings Details */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden slide-up" style={{ animationDelay: "400ms" }}>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Job Openings Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Applications</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Current Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-light">Status</th>
                </tr>
              </thead>
              <tbody>
                {openPositions.map((pos, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-background/50 transition">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-foreground">{pos.position}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-foreground">{pos.applications}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted text-sm">{pos.stage}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                        Open
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recruitment;
