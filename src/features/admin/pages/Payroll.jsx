import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayrollFilters from "../components/PayrollFilters";
import PayrollForm from "../components/PayrollForm";
import PayrollPagination from "../components/PayrollPagination";
import PayrollTable from "../components/PayrollTable";
import AdminModal from '../components/AdminModal';
import { payrollService } from "../services/payrollService";
import { userService } from "../services/userService";

const defaultFilters = {
  userId: "",
  month: "",
};

const defaultPagination = {
  total: 0,
  limit: 10,
  offset: 0,
  hasNext: false,
  hasPrev: false,
};

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

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

const Payroll = () => {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState(defaultPagination);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);
  const lastFetchKey = useRef("");
  const hasFetchedUsers = useRef(false);

  const summary = useMemo(() => {
    return payrolls.reduce(
      (acc, payroll) => {
        acc.basicSalary += Number(payroll.basicSalary || 0);
        acc.bonus += Number(payroll.bonus || 0);
        acc.deductions += Number(payroll.deductions || 0);
        acc.netSalary += Number(payroll.netSalary || 0);
        return acc;
      },
      { basicSalary: 0, bonus: 0, deductions: 0, netSalary: 0 },
    );
  }, [payrolls]);

  const fetchPayrolls = async (nextFilters = filters, nextOffset = offset) => {
    try {
      setLoading(true);
      setError("");
      const result = await payrollService.getPayrolls(buildQuery(nextFilters, nextOffset));
      setPayrolls(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Failed to load payroll records");
      console.error("Error fetching payrolls:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message || "Failed to load users");
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    const fetchKey = JSON.stringify({ filters, offset });
    if (lastFetchKey.current === fetchKey) return;
    lastFetchKey.current = fetchKey;
    fetchPayrolls(filters, offset);
  }, [filters, offset]);

  useEffect(() => {
    if (hasFetchedUsers.current) return;
    hasFetchedUsers.current = true;
    fetchUsers();
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
    setEditingPayroll(null);
    setIsFormOpen(true);
    setError("");
  };

  const handleEdit = (payroll) => {
    setEditingPayroll(payroll);
    setIsFormOpen(true);
    setError("");
  };

  const handleCancel = () => {
    setEditingPayroll(null);
    setIsFormOpen(false);
    setError("");
  };

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingPayroll) {
        await payrollService.updatePayroll(editingPayroll._id, formData);
        setSuccess("Payroll updated successfully!");
      } else {
        await payrollService.createPayroll(formData);
        setSuccess("Payroll created successfully!");
      }

      setEditingPayroll(null);
      setIsFormOpen(false);
      await fetchPayrolls(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save payroll");
      console.error("Error saving payroll:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (payroll) => {
    if (!window.confirm(`Delete payroll for ${payroll.userId?.email || "this employee"}?`)) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await payrollService.deletePayroll(payroll._id);
      setSuccess("Payroll deleted successfully!");
      await fetchPayrolls(filters, offset);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to delete payroll");
      console.error("Error deleting payroll:", err);
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
              className="mb-4 inline-flex items-center font-medium text-rose-700 hover:text-rose-900"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Payroll Management</h1>
            <p className="mt-2 text-gray-600">
              Create salary records, track bonuses and deductions, and review monthly payouts.
            </p>
          </div>

          {!isFormOpen && (
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="rounded-3xl bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-300 disabled:opacity-50"
            >
              + Create Payroll
            </button>
          )}
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Visible Records</p>
            <p className="mt-2 text-3xl font-bold text-white">{payrolls.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Gross Salary</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {money(summary.basicSalary + summary.bonus)}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Deductions</p>
            <p className="mt-2 text-2xl font-bold text-rose-400">
              {money(summary.deductions)}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/75 p-5 shadow">
            <p className="text-sm font-medium text-slate-400">Net Payout</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {money(summary.netSalary)}
            </p>
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
            <AdminModal isOpen={isFormOpen} onClose={handleCancel} title={editingPayroll ? 'Edit Payroll' : 'Create Payroll'}>
              <PayrollForm
                users={users}
                initialData={editingPayroll}
                loading={saving}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            </AdminModal>
          ) : (
            <>
              <PayrollFilters
                filters={filters}
                users={users}
                loading={loading}
                onChange={handleFiltersChange}
                onReset={handleResetFilters}
              />

              {loading ? (
                <div className="rounded-lg bg-white py-12 text-center shadow">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-rose-600"></div>
                  <p className="mt-4 font-medium text-gray-600">Loading payroll records...</p>
                </div>
              ) : (
                <>
                  <PayrollTable
                    payrolls={payrolls}
                    loading={saving}
                    onAddNew={handleAddNew}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                  <PayrollPagination
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

export default Payroll;
