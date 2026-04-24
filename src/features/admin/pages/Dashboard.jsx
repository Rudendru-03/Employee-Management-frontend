import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ChangePassword from "../../auth/components/ChangePassword";
import { adminModules } from "../data/adminModules";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Choose a module to manage records, review activity, and connect
              future API data for the admin panel.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              Welcome, <span className="font-semibold">{user?.email}</span>
            </div>
            <button
              onClick={() => setShowChangePassword(true)}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Change Password
            </button>
            <button
              onClick={logout}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Admin Options</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {adminModules.length}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Live Modules</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Dummy Pages Ready</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">5</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => (
            <button
              key={module.key}
              type="button"
              onClick={() => navigate(module.route)}
              className="group rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white ${module.accent}`}
                >
                  {module.badge}
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Open
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                {module.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {module.subtitle}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {module.description}
              </p>

              <div className="mt-6 grid gap-3">
                {module.stats.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 transition group-hover:text-indigo-800">
                View module
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </main>

      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default AdminDashboard;
