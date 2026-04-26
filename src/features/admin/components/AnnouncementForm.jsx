import React, { useState } from "react";

const AnnouncementForm = ({
  departments,
  initialData = null,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    target: initialData?.target || "all",
    department: initialData?.department?._id || initialData?.department || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "target" && value !== "department") {
        next.department = "";
      }
      return next;
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (formData.title.trim().length < 3) {
      nextErrors.title = "Title must be at least 3 characters";
    }
    if (formData.description.trim().length < 5) {
      nextErrors.description = "Description must be at least 5 characters";
    }
    if (formData.target === "department" && !formData.department) {
      nextErrors.department = "Department is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      target: formData.target,
    };

    if (formData.target === "department") {
      payload.department = formData.department;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Announcement" : "Create Announcement"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Publish updates for everyone, all employees, or a specific department.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Office holiday notice"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Target
          </label>
          <select
            name="target"
            value={formData.target}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 capitalize focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All</option>
            <option value="employee">Employees</option>
            <option value="department">Department</option>
          </select>
        </div>
      </div>

      {formData.target === "department" && (
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Department *
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
        </div>
      )}

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Write the announcement details"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData ? "Update Announcement" : "Publish Announcement"}
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

export default AnnouncementForm;
