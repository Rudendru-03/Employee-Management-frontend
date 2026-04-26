import React, { useState } from "react";

const today = () => new Date().toISOString().slice(0, 10);
const toIsoDate = (value) => new Date(`${value}T00:00`).toISOString();

const LeaveForm = ({ loading, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    leaveType: "casual",
    fromDate: today(),
    toDate: today(),
    reason: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fromDate) nextErrors.fromDate = "From date is required";
    if (!formData.toDate) nextErrors.toDate = "To date is required";
    if (formData.fromDate && formData.toDate && formData.toDate < formData.fromDate) {
      nextErrors.toDate = "To date cannot be before from date";
    }
    if (formData.reason.trim().length < 5) {
      nextErrors.reason = "Reason must be at least 5 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      leaveType: formData.leaveType,
      fromDate: toIsoDate(formData.fromDate),
      toDate: toIsoDate(formData.toDate),
      reason: formData.reason.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Leave Request</h2>
        <p className="mt-1 text-sm text-gray-500">
          This creates a leave request for the currently signed-in account.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            From Date *
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {errors.fromDate && <p className="mt-1 text-sm text-red-600">{errors.fromDate}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            To Date *
          </label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {errors.toDate && <p className="mt-1 text-sm text-red-600">{errors.toDate}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Reason *
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="4"
          placeholder="Add a clear reason for this leave request"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Leave Request"}
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

export default LeaveForm;
