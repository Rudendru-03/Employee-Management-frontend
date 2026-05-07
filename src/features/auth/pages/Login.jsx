import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      if (result.mustChangePassword) {
        navigate("/change-password-required");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_24%),radial-gradient(circle_at_20%_30%,_rgba(99,102,241,0.14),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(15,23,42,0.96))]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-20 w-20 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-24 top-28 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/85 px-2 py-2 shadow-[0_45px_120px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:px-12 sm:py-12">
            <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/60 ring-1 ring-white/10 shadow-xl">
              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="h-10 w-10 text-sky-400"
              >
                <defs>
                  <linearGradient
                    id="brandGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 6c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15Zm0 4a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm-1 4h2v7h7v2h-7v7h-2v-7h-7v-2h7v-7Z"
                  fill="url(#brandGradient)"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
                NexusPortal
              </h1>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Secure sign in for authorized employees.
              </p>
            </div>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-inner shadow-slate-950/70 focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-400">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Employee Email
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 6.5 8-5.5H4l8 5.5Zm8 1.5V8.2l-8 5.5-8-5.5V12h16Z" />
                      </svg>
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="employee@company.com"
                      className="w-full rounded-3xl border border-transparent bg-transparent px-12 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-inner shadow-slate-950/70 focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-400">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Security Key
                  </label>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M12 2a5 5 0 0 0-5 5v1H6a2 2 0 0 0-2 2v3h2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6h2v-3a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm1 10.5V16h-2v-3.5h2Zm0-4V12h-2V8.5h2Z" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter security key"
                      className="w-full rounded-3xl border border-transparent bg-transparent px-12 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* <div className="flex items-center justify-between text-sm text-slate-400">
                <div />
                <a
                  href="#"
                  className="font-medium text-sky-400 hover:text-sky-300"
                >
                  Forgot Access?
                </a>
              </div> */}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Authorize Access
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="mt-8 text-center text-xs uppercase tracking-[0.35em] text-slate-500">
              end-to-end encrypted tunnel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
