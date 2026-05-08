import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnnouncementFilters from "../components/AnnouncementFilters";
import AnnouncementForm from "../components/AnnouncementForm";
import AnnouncementPagination from "../components/AnnouncementPagination";
import AnnouncementTable from "../components/AnnouncementTable";
import AdminModal from '../components/AdminModal';
import { announcementService } from "../services/announcementService";
import { departmentService } from "../services/departmentService";

const defaultFilters = {
  title: "",
  target: "",
  department: "",
};

const defaultPagination = {
  total: 0,
  limit: 10,
  offset: 0,
  hasNext: false,
  hasPrev: false,
};

const buildQuery = (filters, offset) => {
  const query = {
    limit: defaultPagination.limit,
    offset,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) query[key] = value;
  });

  return query;
};

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState(defaultPagination);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const lastFetchKey = useRef("");
  const hasFetchedDepartments = useRef(false);

  const summary = useMemo(() => {
    return announcements.reduce(
      (acc, announcement) => {
        acc[announcement.target] = (acc[announcement.target] || 0) + 1;
        return acc;
      },
      { all: 0, employee: 0, department: 0 },
    );
  }, [announcements]);

  const fetchAnnouncements = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await announcementService.getAnnouncements(
        buildQuery(nextFilters, nextOffset),
      );
      setAnnouncements(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load announcements");
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const departmentsData = await departmentService.getAllDepartments();
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || "Failed to load departments");
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchAnnouncements(filters, offset);
  }, [filters, offset]);

  useEffect(() => {
    if (hasFetchedDepartments.current) return;
    hasFetchedDepartments.current = true;
    fetchDepartments();
  }, []);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setOffset(0);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setOffset(0);
  };

  const handleAddNew = () => {
    setEditingAnnouncement(null);
    setIsFormOpen(true);
    setError("");
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
    setError("");
  };

  const handleCancel = () => {
    setEditingAnnouncement(null);
    setIsFormOpen(false);
    setError("");
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingAnnouncement) {
        await announcementService.updateAnnouncement(editingAnnouncement._id, formData);
        setSuccess("Announcement updated successfully!");
      } else {
        await announcementService.createAnnouncement(formData);
        setSuccess("Announcement published successfully!");
      }

      setEditingAnnouncement(null);
      setIsFormOpen(false);
      await fetchAnnouncements(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save announcement");
      console.error("Error saving announcement:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (announcement) => {
    if (!window.confirm(`Delete "${announcement.title}"?`)) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await announcementService.deleteAnnouncement(announcement._id);
      setSuccess("Announcement deleted successfully!");
      await fetchAnnouncements(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete announcement");
      console.error("Error deleting announcement:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-4 inline-flex items-center font-medium text-cyan-700 hover:text-cyan-900"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Announcements</h1>
            <p className="mt-2 text-gray-600">
              Publish company updates and target them to everyone, employees, or departments.
            </p>
          </div>

          {!isFormOpen && (
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="rounded-3xl bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-300 disabled:opacity-50"
            >
              + Create Announcement
            </button>
          )}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Visible Posts</p>
            <p className="mt-2 text-3xl font-bold text-white">{announcements.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">All Company</p>
            <p className="mt-2 text-3xl font-bold text-sky-300">{summary.all}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Employees</p>
            <p className="mt-2 text-3xl font-bold text-sky-400">{summary.employee}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Departments</p>
            <p className="mt-2 text-3xl font-bold text-violet-400">{summary.department}</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {isFormOpen ? (
            <AdminModal isOpen={isFormOpen} onClose={handleCancel} title={editingAnnouncement ? 'Edit Announcement' : 'Create Announcement'}>
              <AnnouncementForm
                departments={departments}
                initialData={editingAnnouncement}
                loading={saving}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            </AdminModal>
          ) : (
            <>
              <AnnouncementFilters
                departments={departments}
                filters={filters}
                loading={loading}
                onChange={handleFiltersChange}
                onReset={handleResetFilters}
              />

              {loading ? (
                <div className="rounded-lg bg-white py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-600"></div>
                  <p className="mt-4 font-medium text-gray-600">Loading announcements...</p>
                </div>
              ) : (
                <>
                  <AnnouncementTable
                    announcements={announcements}
                    loading={saving}
                    onAddNew={handleAddNew}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                  <AnnouncementPagination
                    pagination={pagination}
                    loading={loading}
                    onPageChange={setOffset}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
