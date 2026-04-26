import React from "react";

const statusClasses = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const typeClasses = {
  sick: "bg-rose-100 text-rose-800",
  casual: "bg-sky-100 text-sky-800",
  paid: "bg-violet-100 text-violet-800",
};

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getDays = (fromDate, toDate) => {
  if (!fromDate || !toDate) return "N/A";
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const days = Math.round((end - start) / 86400000) + 1;
  return `${Math.max(days, 1)} day${days === 1 ? "" : "s"}`;
};

const LeaveTable = ({
  leaves,
  loading,
  onAddNew,
  onDelete,
  onStatusChange,
}) => {
  if (leaves.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">No leave requests</h3>
        <p className="mt-1 text-sm text-gray-500">Create a request or adjust filters to see leave history.</p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Create Leave Request
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Approved By</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaves.map((leave) => (
              <tr key={leave._id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {leave.userId?.username || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500">{leave.userId?.email || "N/A"}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeClasses[leave.leaveType] || "bg-gray-100 text-gray-800"}`}>
                    {leave.leaveType}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  <div>{formatDate(leave.fromDate)} - {formatDate(leave.toDate)}</div>
                  <div className="mt-1 text-xs font-medium text-gray-500">{getDays(leave.fromDate, leave.toDate)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate text-sm text-gray-600" title={leave.reason}>
                    {leave.reason}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[leave.status] || "bg-gray-100 text-gray-800"}`}>
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {leave.approvedBy?.email || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex flex-wrap gap-3">
                    {leave.status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => onStatusChange(leave, "approved")}
                        disabled={loading}
                        className="text-green-700 hover:text-green-900 disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}
                    {leave.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => onStatusChange(leave, "rejected")}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                    {leave.status !== "pending" && (
                      <button
                        type="button"
                        onClick={() => onStatusChange(leave, "pending")}
                        disabled={loading}
                        className="text-amber-700 hover:text-amber-900 disabled:opacity-50"
                      >
                        Pending
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete(leave)}
                      disabled={loading}
                      className="text-gray-500 hover:text-gray-900 disabled:opacity-50"
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

export default LeaveTable;
