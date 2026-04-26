import React from "react";

const LeavePagination = ({ pagination, loading, onPageChange }) => {
  const { total = 0, limit = 10, offset = 0, hasNext = false, hasPrev = false } = pagination;
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, total);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white px-5 py-4 shadow sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{start}</span> to{" "}
        <span className="font-semibold text-gray-900">{end}</span> of{" "}
        <span className="font-semibold text-gray-900">{total}</span> requests
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(0, offset - limit))}
          disabled={loading || !hasPrev}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(offset + limit)}
          disabled={loading || !hasNext}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeavePagination;
