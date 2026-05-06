import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceFilters from "../components/AttendanceFilters";
import AttendanceForm from "../components/AttendanceForm";
import AttendancePagination from "../components/AttendancePagination";
import AttendanceTable from "../components/AttendanceTable";
import Modal from "../../../components/Modal";
import { attendanceService } from "../services/attendanceService";
import { userService } from "../services/userService";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, Plus, CheckCircle, XCircle, Calendar } from "lucide-react";

const defaultFilters = {
  userId: "",
  status: "",
  date: "",
};

const defaultPagination = {
  total: 0,
  limit: 10,
  offset: 0,
  hasNext: false,
  hasPrev: false,
};

const buildQuery = (filters, offset) => {
  const query = {
    limit: defaultPagination.limit,
    offset,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });

  return query;
};

const Attendance = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(defaultPagination);
  const [filters, setFilters] = useState(defaultFilters);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const lastFetchKey = useRef("");
  const hasFetchedUsers = useRef(false);

  const summary = useMemo(() => {
    return records.reduce(
      (acc, record) => {
        acc[record.status] = (acc[record.status] || 0) + 1;
        return acc;
      },
      { present: 0, absent: 0, leave: 0, holiday: 0 },
    );
  }, [records]);

  const fetchAttendance = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await attendanceService.getAttendance(
        buildQuery(nextFilters, nextOffset),
      );
      setRecords(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load attendance records");
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message || "Failed to load users");
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchAttendance(filters, offset);
  }, [filters, offset]);

  useEffect(() => {
    if (hasFetchedUsers.current) return;
    hasFetchedUsers.current = true;
    fetchUsers();
  }, []);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setOffset(0);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setOffset(0);
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsFormOpen(true);
    setError("");
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsFormOpen(true);
    setError("");
  };

  const handleCancel = () => {
    setEditingRecord(null);
    setIsFormOpen(false);
    setError("");
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingRecord) {
        await attendanceService.updateAttendance(editingRecord._id, formData);
        setSuccess("Attendance updated successfully!");
      } else {
        await attendanceService.createAttendance(formData);
        setSuccess("Attendance marked successfully!");
      }

      setEditingRecord(null);
      setIsFormOpen(false);
      await fetchAttendance(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save attendance");
      console.error("Error saving attendance:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record) => {
    if (!window.confirm(`Delete attendance for ${record.userId?.email || "this employee"}?`)) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await attendanceService.deleteAttendance(record._id);
      setSuccess("Attendance deleted successfully!");
      await fetchAttendance(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete attendance");
      console.error("Error deleting attendance:", err);
    } finally {
      setSaving(false);
    }
  };

  // Hardcoded analytics data
  const attendanceTrendData = [
    { date: "Mon", present: 220, absent: 28 },
    { date: "Tue", present: 225, absent: 23 },
    { date: "Wed", present: 235, absent: 13 },
    { date: "Thu", present: 218, absent: 30 },
    { date: "Fri", present: 210, absent: 38 },
  ];

  const statusDistribution = [
    { name: "Present", value: summary.present },
    { name: "Absent", value: summary.absent },
    { name: "Leave", value: summary.leave },
    { name: "Holiday", value: summary.holiday },
  ];

  const chartColors = ["#10b981", "#ef4444", "#f59e0b", "#3b82f6"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-background rounded-lg transition text-muted hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="slide-up">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Attendance Management</h1>
                <p className="text-muted-light mt-2">Mark daily attendance and track employee presence with analytics</p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              disabled={loading || isFormOpen}
              className="flex items-center gap-2 px-4 py-2.5 bg-success hover:bg-success text-white rounded-lg font-medium transition disabled:opacity-50 slide-up"
            >
              <Plus className="w-4 h-4" />
              Mark Attendance
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Messages */}
        {success && (
          <div className="mb-6 p-4 bg-success/10 border border-success/30 rounded-lg text-success text-sm font-medium fade-in">
            ✓ {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium fade-in">
            ✕ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 slide-up">
            <p className="text-muted text-sm font-medium">Total Marked</p>
            <p className="text-3xl font-bold text-foreground mt-2">{records.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Present</p>
                <p className="text-3xl font-bold text-success mt-2">{summary.present}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium">Absent</p>
                <p className="text-3xl font-bold text-danger mt-2">{summary.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-danger" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 slide-up" style={{ animationDelay: "150ms" }}>
            <p className="text-muted text-sm font-medium">Leave / Holiday</p>
            <p className="text-3xl font-bold text-warning mt-2">{summary.leave + summary.holiday}</p>
          </div>
        </div>

        {/* Analytics */}
        {records.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Attendance Trend */}
            <div className="bg-card border border-border rounded-2xl p-6 slide-up">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Trend
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted)" />
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

            {/* Status Distribution */}
            <div className="bg-card border border-border rounded-2xl p-6 slide-up" style={{ animationDelay: "100ms" }}>
              <h2 className="text-xl font-bold text-foreground mb-4">Status Distribution</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusDistribution.filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index]} />
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
          </div>
        )}

        {/* Filters and Table */}
        <div className="space-y-6">
          <AttendanceFilters
            filters={filters}
            users={users}
            loading={loading}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          {loading ? (
            <div className="bg-card border border-border rounded-2xl py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-light font-medium">Loading attendance...</p>
            </div>
          ) : (
            <>
              <AttendanceTable
                records={records}
                loading={saving}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={handleAddNew}
              />
              <AttendancePagination
                pagination={pagination}
                loading={loading}
                onPageChange={setOffset}
              />
            </>
          )}
        </div>
      </main>

      {/* Modal for Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCancel}
        title={editingRecord ? 'Edit Attendance' : 'Mark Attendance'}
        size="lg"
      >
        <AttendanceForm
          users={users}
          initialData={editingRecord}
          loading={saving}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Attendance;
