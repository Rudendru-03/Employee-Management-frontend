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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 22%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.14), transparent 28%), radial-gradient(circle at 20% 80%, rgba(59,130,246,0.08), transparent 22%)',
        }}
      />
      <div className="pointer-events-none absolute left-0 top-16 h-90 w-90 rounded-full bg-slate-700/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-105 w-105 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 overflow-hidden rounded-4xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300 shadow-sm shadow-slate-950/20">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/15 text-lg text-sky-300">
                  N
                </span>
                NexusPortal
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10">
                Admin Dashboard
              </button>
              <button className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10">
                Analytics
              </button>
              <button className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10">
                Nodes
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-300/20">
                System status: online
              </span>
              <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-300">
                  A
                </div>
                <div className="min-w-40 text-left">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Admin User</p>
                  <p className="text-sm font-semibold text-white">{user?.email || "admin@test.com"}</p>
                </div>
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-400"
                >
                  Change
                </button>
                <button
                  onClick={logout}
                  className="rounded-full border border-slate-600 bg-slate-900/90 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-400"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-4xl bg-slate-900/80 p-6 ring-1 ring-white/10 shadow-xl shadow-slate-950/20">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Total Admin Options
            </p>
            <p className="mt-5 text-4xl font-semibold text-white">
              {adminModules.length}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              All available admin modules remain available for navigation.
            </p>
          </div>
          <div className="rounded-4xl bg-slate-900/80 p-6 ring-1 ring-white/10 shadow-xl shadow-slate-950/20">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Live Modules
            </p>
            <p className="mt-5 text-4xl font-semibold text-white">18</p>
            <p className="mt-3 text-sm text-slate-400">
              Active modules represent the current system surface.
            </p>
          </div>
          <div className="rounded-4xl bg-slate-900/80 p-6 ring-1 ring-white/10 shadow-xl shadow-slate-950/20">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Ready Pages
            </p>
            <p className="mt-5 text-4xl font-semibold text-white">124</p>
            <p className="mt-3 text-sm text-slate-400">
              Placeholder pages are ready for future feature integrations.
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="rounded-4xl bg-slate-900/80 p-8 ring-1 ring-white/10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">
                  System Activity
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Global engagement & pulse over 24h
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  This panel is styled for the analytics surface. The actual
                  charts and realtime flows can be added later while the UX is
                  already in place.
                </p>
              </div>

              <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Real-time
              </div>
            </div>

            <div className="mt-10 space-y-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-slate-300 shadow-inner shadow-slate-950/20">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    CPU Load
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    12.4%
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Node Uptime
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    99.98%
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    Latency
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    14 ms
                  </p>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl bg-slate-950/40 p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <span>Analytics module</span>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
                    Coming soon
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Node system notifications</span>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
                    Option ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6 rounded-4xl bg-slate-900/80 p-6 ring-1 ring-white/10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="rounded-[1.75rem] bg-slate-950/50 p-6 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                System Summary
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                Node notifications
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                Quick actions for future analytics and node alert management.
              </p>
              <div className="mt-6 grid gap-3">
                <button className="rounded-3xl bg-sky-500/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                  View analytics
                </button>
                <button className="rounded-3xl border border-slate-600 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400">
                  Manage node alerts
                </button>
              </div>
            </div>
            <div className="grid gap-4 rounded-[1.75rem] bg-slate-950/50 p-5 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>System notifications</span>
                <span className="text-slate-300">Enabled</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Event logging</span>
                <span className="text-slate-300">Scheduled</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Reporting</span>
                <span className="text-slate-300">Live</span>
              </div>
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                System Modules
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Manage core portal areas
              </h2>
            </div>
            <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
              {adminModules.length} Modules
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {adminModules.map((module) => (
              <button
                key={module.key}
                type="button"
                onClick={() => navigate(module.route)}
                className="group rounded-4xl border border-white/10 bg-slate-900/75 p-6 text-left shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-sky-500/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-3xl text-2xl font-semibold text-white ${module.accent}`}
                  >
                    {module.badge}
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition group-hover:bg-sky-500/15">
                    Open
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400">{module.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {module.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {module.stats.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition group-hover:text-sky-200">
                  View module
                  <svg
                    className="h-4 w-4"
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
        </section>
      </div>

      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default AdminDashboard;
