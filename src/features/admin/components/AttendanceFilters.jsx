import React from "react";

const AttendanceFilters = ({ filters, users, onChange, onReset, loading }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Employee
          </label>
          <select
            name="userId"
            value={filters.userId}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
          >
            <option value="">All employees</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} - {user.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
          >
            <option value="">All statuses</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
            <option value="holiday">Holiday</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 disabled:opacity-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
