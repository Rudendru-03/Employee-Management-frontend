import React, { useMemo, useState } from "react";

const formatDateInput = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  return new Date(value).toISOString().slice(0, 10);
};

const formatTimeInput = (value, fallback) => {
  if (!value) return fallback;
  return new Date(value).toTimeString().slice(0, 5);
};

const toIsoDateTime = (date, time) => new Date(`${date}T${time}`).toISOString();

const AttendanceForm = ({
  users,
  initialData = null,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    userId: initialData?.userId?._id || initialData?.userId || "",
    date: formatDateInput(initialData?.date),
    checkIn: formatTimeInput(initialData?.checkIn, "09:00"),
    checkOut: formatTimeInput(initialData?.checkOut, "18:00"),
    status: initialData?.status || "present",
  });
  const [errors, setErrors] = useState({});

  const activeUsers = useMemo(
    () => users.filter((user) => user.status !== "inactive"),
    [users],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.userId) nextErrors.userId = "Employee is required";
    if (!formData.date) nextErrors.date = "Date is required";
    if (!formData.checkIn) nextErrors.checkIn = "Check-in time is required";
    if (!formData.checkOut) nextErrors.checkOut = "Check-out time is required";
    if (formData.checkIn && formData.checkOut && formData.checkOut <= formData.checkIn) {
      nextErrors.checkOut = "Check-out must be after check-in";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      userId: formData.userId,
      date: toIsoDateTime(formData.date, "00:00"),
      checkIn: toIsoDateTime(formData.date, formData.checkIn),
      checkOut: toIsoDateTime(formData.date, formData.checkOut),
      status: formData.status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Attendance" : "Mark Attendance"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Record a daily attendance entry for an employee.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Employee *
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select employee</option>
            {activeUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} - {user.email}
              </option>
            ))}
          </select>
          {errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Check In *
          </label>
          <input
            type="time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.checkIn && <p className="mt-1 text-sm text-red-600">{errors.checkIn}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Check Out *
          </label>
          <input
            type="time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors.checkOut && <p className="mt-1 text-sm text-red-600">{errors.checkOut}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="grid gap-3 sm:grid-cols-4">
          {["present", "absent", "leave", "holiday"].map((status) => (
            <label
              key={status}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold capitalize transition ${
                formData.status === status
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
              }`}
            >
              <input
                type="radio"
                name="status"
                value={status}
                checked={formData.status === status}
                onChange={handleChange}
                className="sr-only"
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Attendance" : "Save Attendance"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;
