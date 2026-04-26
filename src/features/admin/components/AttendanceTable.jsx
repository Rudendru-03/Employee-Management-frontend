import React from "react";

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
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const AttendanceTable = ({ records, loading, onEdit, onDelete, onAddNew }) => {
  if (records.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 11h14M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">No attendance records</h3>
        <p className="mt-1 text-sm text-gray-500">Mark attendance to start tracking the day.</p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Mark Attendance
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {records.map((record) => (
              <tr key={record._id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {record.userId?.username || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500">{record.userId?.email || "N/A"}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {formatDate(record.date)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {formatTime(record.checkIn)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {formatTime(record.checkOut)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {getDuration(record.checkIn, record.checkOut)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[record.status] || "bg-gray-100 text-gray-800"}`}>
                    {record.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(record)}
                      disabled={loading}
                      className="text-emerald-700 hover:text-emerald-900 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(record)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
