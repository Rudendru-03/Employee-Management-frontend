import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceFilters from "../components/AttendanceFilters";
import AttendanceForm from "../components/AttendanceForm";
import AttendancePagination from "../components/AttendancePagination";
import AttendanceTable from "../components/AttendanceTable";
import AdminModal from '../components/AdminModal';
import { attendanceService } from "../services/attendanceService";
import { userService } from "../services/userService";

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 inline-flex items-center font-medium text-emerald-700 hover:text-emerald-900"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Attendance Management</h1>
            <p className="mt-2 text-gray-600">
              Mark daily attendance, review working hours, and keep employee records current.
            </p>
          </div>

          {!isFormOpen && (
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="rounded-3xl bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-300 disabled:opacity-50"
            >
              + Mark Attendance
            </button>
          )}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Visible Records</p>
            <p className="mt-2 text-3xl font-bold text-white">{records.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Present</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">{summary.present}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Absent</p>
            <p className="mt-2 text-3xl font-bold text-rose-400">{summary.absent}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Leave / Holiday</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {summary.leave + summary.holiday}
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {isFormOpen ? (
            <AdminModal isOpen={isFormOpen} onClose={handleCancel} title={editingRecord ? 'Edit Attendance' : 'Mark Attendance'}>
              <AttendanceForm
                users={users}
                initialData={editingRecord}
                loading={saving}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            </AdminModal>
          ) : (
            <>
              <AttendanceFilters
                filters={filters}
                users={users}
                loading={loading}
                onChange={handleFiltersChange}
                onReset={handleResetFilters}
              />

              {loading ? (
                <div className="rounded-lg bg-white py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600"></div>
                  <p className="mt-4 font-medium text-gray-600">Loading attendance...</p>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
