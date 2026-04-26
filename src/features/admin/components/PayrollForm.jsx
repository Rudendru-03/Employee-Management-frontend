import React, { useMemo, useState } from "react";

const currentMonth = () => new Date().toISOString().slice(0, 7);
const toNumber = (value) => Number(value || 0);

const PayrollForm = ({
  users,
  initialData = null,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    userId: initialData?.userId?._id || initialData?.userId || "",
    month: initialData?.month || currentMonth(),
    basicSalary: initialData?.basicSalary ?? "",
    deductions: initialData?.deductions ?? 0,
    bonus: initialData?.bonus ?? 0,
  });
  const [errors, setErrors] = useState({});

  const activeUsers = useMemo(
    () => users.filter((user) => user.status !== "inactive"),
    [users],
  );

  const netSalary =
    toNumber(formData.basicSalary) + toNumber(formData.bonus) - toNumber(formData.deductions);

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
    if (!formData.month) nextErrors.month = "Month is required";
    if (formData.basicSalary === "" || toNumber(formData.basicSalary) < 0) {
      nextErrors.basicSalary = "Basic salary must be zero or more";
    }
    if (toNumber(formData.deductions) < 0) {
      nextErrors.deductions = "Deductions must be zero or more";
    }
    if (toNumber(formData.bonus) < 0) {
      nextErrors.bonus = "Bonus must be zero or more";
    }
    if (netSalary < 0) {
      nextErrors.netSalary = "Net salary cannot be negative";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      userId: formData.userId,
      month: formData.month,
      basicSalary: toNumber(formData.basicSalary),
      deductions: toNumber(formData.deductions),
      bonus: toNumber(formData.bonus),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData ? "Edit Payroll" : "Create Payroll"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter salary details and the system will calculate net salary.
          </p>
        </div>
        <div className="rounded-lg bg-rose-50 px-5 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
            Net Salary
          </p>
          <p className="mt-1 text-2xl font-bold text-rose-900">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(netSalary)}
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
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
            Month *
          </label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.month && <p className="mt-1 text-sm text-red-600">{errors.month}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Basic Salary *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.basicSalary && <p className="mt-1 text-sm text-red-600">{errors.basicSalary}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bonus
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.bonus && <p className="mt-1 text-sm text-red-600">{errors.bonus}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Deductions
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.deductions && <p className="mt-1 text-sm text-red-600">{errors.deductions}</p>}
          {errors.netSalary && <p className="mt-1 text-sm text-red-600">{errors.netSalary}</p>}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Payroll" : "Create Payroll"}
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

export default PayrollForm;
