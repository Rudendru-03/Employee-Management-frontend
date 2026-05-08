import React from 'react';

const DepartmentList = ({ departments, onEdit, onDelete, loading, onAddNew }) => {
  const handleDeleteClick = (dept) => {
    if (window.confirm(`Are you sure you want to delete "${dept.name}" department?`)) {
      onDelete(dept._id);
    }
  };

  if (departments.length === 0) {
    return (
      <div className="bg-slate-900/60 rounded-2xl shadow p-12 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-white">No departments</h3>
        <p className="mt-1 text-sm text-slate-300">Get started by creating a new department.</p>
        <button
          onClick={onAddNew}
          className="mt-4 px-6 py-2 bg-sky-400 text-slate-900 rounded-3xl hover:bg-sky-300 transition"
        >
          Create Department
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-900/40 divide-y divide-slate-800">
            {departments.map((dept) => (
              <tr key={dept._id} className="hover:bg-slate-800/40 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{dept.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-300 truncate max-w-xs">{dept.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{dept.manager?.email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button
                    onClick={() => onEdit(dept)}
                    disabled={loading}
                    className="text-sky-300 hover:text-sky-200 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(dept)}
                    disabled={loading}
                    className="text-rose-400 hover:text-rose-300 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
