import React from "react";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatMonth = (value) => {
  if (!value) return "N/A";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, 1));
};

const PayrollTable = ({ payrolls, loading, onAddNew, onEdit, onDelete }) => {
  if (payrolls.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">No payroll records</h3>
        <p className="mt-1 text-sm text-gray-500">Create a payroll record to start tracking salaries.</p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Create Payroll
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Month</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Basic</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Bonus</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Deductions</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Net Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {payrolls.map((payroll) => (
              <tr key={payroll._id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {payroll.userId?.username || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500">{payroll.userId?.email || "N/A"}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                  {formatMonth(payroll.month)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">
                  {money(payroll.basicSalary)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-green-700">
                  {money(payroll.bonus)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-red-700">
                  {money(payroll.deductions)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold text-gray-900">
                  {money(payroll.netSalary)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(payroll)}
                      disabled={loading}
                      className="text-rose-700 hover:text-rose-900 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(payroll)}
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

export default PayrollTable;
