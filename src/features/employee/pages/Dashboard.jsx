import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../auth/components/ChangePassword";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="text-lg font-semibold tracking-[0.04em] text-white">
              NexusPortal
            </div>
            <nav className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
              <button className="rounded-full bg-white/5 px-4 py-2 font-medium text-white shadow-sm shadow-slate-950/20">
                Dashboard
              </button>
              {/* <button className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                Operations
              </button>
              <button className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                Intelligence
              </button> */}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400 hover:text-white">
              Notification
            </button>
            <button className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400 hover:text-white">
              Support
            </button>
            <button
              onClick={() => navigate("/change-password-required")}
              className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400 hover:text-white"
            >
              Change Password
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <section className="rounded-4xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="rounded-full border border-slate-700 bg-slate-950/70 p-2 text-slate-200">
                <div className="h-14 w-14 rounded-full bg-slate-800/70 flex items-center justify-center text-xl font-semibold text-sky-400">
                  A
                </div>
              </div>
              <button
                onClick={() => navigate("/employee/profile")}
                className="rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-300 transition hover:bg-sky-500/15"
              >
                Configure Profile
              </button>
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto mb-5 h-28 w-28 rounded-full border border-sky-400/20 bg-slate-950/80 ring-1 ring-slate-100/10" />
              <h2 className="text-2xl font-semibold text-white">
                {user?.username || "Employee"}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-sky-300">
                {user?.role || "Employee"}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-slate-950/70 p-4 border border-white/5">
                <p className="uppercase tracking-[0.3em] text-slate-500">
                  Department
                </p>
                <p className="mt-2 font-medium text-white">
                  {user?.department || "N/A"}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-4 border border-white/5">
                <p className="uppercase tracking-[0.3em] text-slate-500">
                  Interface
                </p>
                <p className="mt-2 font-medium text-white">
                  {user?.email || "a.thorne@nexus.portal"}
                </p>
              </div>
              {/* <div className="rounded-3xl bg-slate-950/70 p-4 border border-white/5">
                <p className="uppercase tracking-[0.3em] text-slate-500">
                  Terminal
                </p>
                <p className="mt-2 font-medium text-white">Sector 7G - HQ</p>
              </div> */}
            </div>
          </section>

          <section className="rounded-4xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xl font-semibold text-white">
                  Personal Performance Pulse
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Real-time velocity tracking for current sprint cycles.
                </p>
              </div>
              <span className="rounded-full bg-slate-950/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                High Performance
              </span>
            </div>

            <div className="mt-8 rounded-3xl bg-linear-to-b from-slate-950/80 to-slate-900/70 p-6 shadow-inner shadow-slate-950/30">
              <div className="flex h-72 items-end gap-4">
                {[
                  { label: "MON", height: "h-36" },
                  { label: "TUE", height: "h-28" },
                  { label: "WED", height: "h-44" },
                  { label: "THU", height: "h-32" },
                  { label: "FRI", height: "h-48" },
                  { label: "SAT", height: "h-40" },
                  { label: "SUN", height: "h-52" },
                ].map((bar) => (
                  <div key={bar.label} className="flex-1">
                    <div
                      className={`mx-auto flex h-full items-end justify-center ${bar.height}`}
                    >
                      <div className="w-14 rounded-t-3xl bg-slate-600/80 shadow-xl shadow-slate-950/20" />
                    </div>
                    <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
                      {bar.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div
            onClick={() => navigate("/employee/attendance")}
            className="cursor-pointer rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl transition hover:border-sky-500/40"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Attendance Score
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">98.2%</p>
                <p className="mt-2 text-sm text-slate-400">+2.4%</p>
              </div>
              <div className="h-16 w-16 rounded-full border border-slate-700/70 bg-slate-950/50 p-3">
                <div className="h-full w-full rounded-full border-2 border-sky-500/60" />
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/employee/leave")}
            className="cursor-pointer rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl transition hover:border-sky-500/40"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Leave Balance
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">14 Days</p>
                <p className="mt-2 text-sm text-slate-400">Safe</p>
              </div>
              <div className="h-16 w-16 rounded-full border border-slate-700/70 bg-slate-950/50 p-3">
                <div className="h-full w-full rounded-full border-2 border-violet-500/60" />
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Task Completion
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">89%</p>
                <p className="mt-2 text-sm text-slate-400">Optimal</p>
              </div>
              <div className="h-16 w-16 rounded-full border border-slate-700/70 bg-slate-950/50 p-3">
                <div className="h-full w-full rounded-full border-2 border-cyan-500/60" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChangePassword
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
};

export default EmployeeDashboard;
