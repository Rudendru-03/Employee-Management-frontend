import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPlaceholderPage = ({ title, subtitle, hero, sections = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </button>

        <div className="mb-8 rounded-3xl bg-slate-900/60 p-8 shadow-sm ring-1 ring-slate-800">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
            Admin Module
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">{title}</h1>
          <p className="mt-3 max-w-3xl text-base text-slate-300">{subtitle}</p>
          <div className="mt-6 rounded-2xl bg-slate-800/60 p-5 text-sm leading-7 text-slate-200 ring-1 ring-slate-700">
            {hero}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl bg-slate-900/60 p-6 shadow-sm ring-1 ring-slate-800"
            >
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
              <div className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-800 bg-slate-800/50 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPlaceholderPage;
