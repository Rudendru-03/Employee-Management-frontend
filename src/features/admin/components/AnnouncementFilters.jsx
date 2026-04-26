import React from "react";

const AnnouncementFilters = ({
  departments,
  filters,
  loading,
  onChange,
  onReset,
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Exact title search"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Target
          </label>
          <select
            name="target"
            value={filters.target}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          >
            <option value="">All targets</option>
            <option value="all">All</option>
            <option value="employee">Employees</option>
            <option value="department">Department</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100"
          >
            <option value="">All departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
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

export default AnnouncementFilters;
