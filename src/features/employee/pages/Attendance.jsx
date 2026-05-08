import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeePagination from "../components/EmployeePagination";
import { employeeService } from "../services/employeeService";

const defaultFilters = {
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

const statusClasses = {
  present: "bg-green-100 text-green-800",
  absent: "bg-red-100 text-red-800",
  leave: "bg-amber-100 text-amber-800",
  holiday: "bg-sky-100 text-sky-800",
};

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatTime = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const getDuration = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return "N/A";
  const minutes = Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 60000));
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const buildQuery = (filters, offset) => {
  const query = { limit: defaultPagination.limit, offset };
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });
  return query;
};

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState(defaultPagination);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lastFetchKey = useRef("");

  const summary = useMemo(
    () =>
      records.reduce(
        (acc, record) => {
          acc[record.status] = (acc[record.status] || 0) + 1;
          return acc;
        },
        { present: 0, absent: 0, leave: 0, holiday: 0 },
      ),
    [records],
  );

  const fetchAttendance = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await employeeService.getMyAttendance(buildQuery(nextFilters, nextOffset));
      setRecords(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load attendance records");
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchAttendance(filters, offset);
  }, [filters, offset]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setOffset(0);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setOffset(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 inline-flex items-center font-medium text-sky-300 hover:text-sky-200"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white">My Attendance</h1>
          <p className="mt-2 text-slate-300">Check your attendance records, timings, and status history.</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Visible Records</p>
            <p className="mt-2 text-3xl font-bold text-white">{records.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Present</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">{summary.present}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Absent</p>
            <p className="mt-2 text-3xl font-bold text-rose-400">{summary.absent}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Leave / Holiday</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">{summary.leave + summary.holiday}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-700 px-4 py-2 capitalize bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
                >
                  <option value="">All statuses</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Date</label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-700 px-4 py-2 bg-slate-800/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={loading}
                  className="w-full rounded-3xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:opacity-50"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

              {loading ? (
            <div className="rounded-3xl bg-slate-900/60 py-12 text-center shadow">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-sky-300"></div>
              <p className="mt-4 font-medium text-slate-300">Loading attendance...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="rounded-3xl bg-slate-900/60 p-12 text-center shadow">
              <h3 className="text-lg font-medium text-white">No attendance records</h3>
              <p className="mt-1 text-sm text-slate-400">Your attendance records will appear here once marked.</p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl bg-slate-900/50 shadow">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Check In</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Check Out</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Hours</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                      {records.map((record) => (
                        <tr key={record._id} className="hover:bg-slate-800/40">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{formatDate(record.date)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{formatTime(record.checkIn)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{formatTime(record.checkOut)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{getDuration(record.checkIn, record.checkOut)}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[record.status] || "bg-slate-700 text-slate-200"}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <EmployeePagination
                label="attendance records"
                loading={loading}
                pagination={pagination}
                onPageChange={setOffset}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
