import React from "react";

const targetClasses = {
  all: "bg-cyan-100 text-cyan-800",
  employee: "bg-sky-100 text-sky-800",
  department: "bg-violet-100 text-violet-800",
};

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getTargetLabel = (announcement) => {
  if (announcement.target === "department") {
    return announcement.department?.name || "Department";
  }
  if (announcement.target === "employee") return "Employees";
  return "All";
};

const AnnouncementTable = ({
  announcements,
  loading,
  onAddNew,
  onDelete,
  onEdit,
}) => {
  if (announcements.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center shadow">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.148-6.15M18 13a3 3 0 100-6M5.435 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.565-.317z" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">No announcements</h3>
        <p className="mt-1 text-sm text-gray-500">Publish an update for your team to get started.</p>
        <button
          type="button"
          onClick={onAddNew}
          className="mt-5 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Create Announcement
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Announcement</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Target</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {announcements.map((announcement) => (
              <tr key={announcement._id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {announcement.title}
                  </div>
                  <div className="mt-1 max-w-xl text-sm leading-6 text-gray-600">
                    {announcement.description}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${targetClasses[announcement.target] || "bg-gray-100 text-gray-800"}`}>
                    {getTargetLabel(announcement)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {announcement.createdBy?.email || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {formatDate(announcement.createdAt)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(announcement)}
                      disabled={loading}
                      className="text-cyan-700 hover:text-cyan-900 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(announcement)}
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

export default AnnouncementTable;
