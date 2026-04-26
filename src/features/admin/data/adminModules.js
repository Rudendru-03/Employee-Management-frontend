export const adminModules = [
  {
    key: "departments",
    title: "Departments",
    subtitle: "Manage company departments",
    description:
      "Create departments, assign managers, and keep the organization structure up to date.",
    route: "/admin/departments",
    badge: "D",
    accent: "bg-violet-600",
    stats: ["Department list", "Manager mapping", "Structure updates"],
    placeholder: {
      hero:
        "Department APIs are already connected here. This module is ready for real data and future enhancements.",
      sections: [
        {
          title: "What Admin Can Do",
          items: ["Add new departments", "Assign department managers", "Edit and remove departments"],
        },
        {
          title: "Planned Integrations",
          items: ["Department analytics", "Department-wise headcount", "Department budget overview"],
        },
      ],
    },
  },
  {
    key: "employees",
    title: "Employees",
    subtitle: "Manage employees and user accounts",
    description:
      "Create users, maintain employee profiles, and connect people with the right departments.",
    route: "/admin/employees",
    badge: "E",
    accent: "bg-sky-600",
    stats: ["Employee records", "User access", "Department assignment"],
    placeholder: {
      hero:
        "Employee and user management is already available here. We can plug in additional APIs later as needed.",
      sections: [
        {
          title: "What Admin Can Do",
          items: ["Create new users", "Create employee profiles", "Control activation status"],
        },
        {
          title: "Planned Integrations",
          items: ["Bulk import", "Role-based filters", "Employee document center"],
        },
      ],
    },
  },
  {
    key: "attendance",
    title: "Attendance",
    subtitle: "Track presence and working hours",
    description:
      "Review attendance summaries, late check-ins, and attendance-related metrics for all employees.",
    route: "/admin/attendance",
    badge: "A",
    accent: "bg-emerald-600",
    stats: ["Present/absent counts", "Late logins", "Shift summary"],
    placeholder: {
      hero:
        "This is a dummy attendance page for now. API integration can later fetch daily logs, monthly summaries, and team trends.",
      sections: [
        {
          title: "Data To Show",
          items: ["Daily attendance records", "Monthly attendance summary", "Late and missing punch alerts"],
        },
        {
          title: "API Integration Plan",
          items: ["Fetch attendance list", "Filter by department/date", "Attendance export support"],
        },
      ],
    },
  },
  {
    key: "leave-management",
    title: "Leave Management",
    subtitle: "Review and approve leave requests",
    description:
      "Handle leave applications, approval workflows, leave balances, and holiday planning in one place.",
    route: "/admin/leave-management",
    badge: "L",
    accent: "bg-amber-500",
    stats: ["Pending approvals", "Leave balance", "Holiday calendar"],
    placeholder: {
      hero:
        "This dummy page is ready for future leave APIs. Later we can connect approvals, balances, and leave history here.",
      sections: [
        {
          title: "Data To Show",
          items: ["Pending leave requests", "Approved and rejected history", "Employee leave balance"],
        },
        {
          title: "API Integration Plan",
          items: ["Leave request listing", "Approve or reject action", "Leave balance calculation"],
        },
      ],
    },
  },
  {
    key: "payroll",
    title: "Payroll",
    subtitle: "Salary and payment overview",
    description:
      "Keep payroll status visible with salary cycles, payment slips, and deduction summaries for employees.",
    route: "/admin/payroll",
    badge: "P",
    accent: "bg-rose-600",
    stats: ["Salary cycle", "Payslips", "Deductions"],
    placeholder: {
      hero:
        "This payroll screen is a placeholder for now. Once payroll APIs are ready, we can render salary data and reports here.",
      sections: [
        {
          title: "Data To Show",
          items: ["Current payroll cycle", "Generated payslips", "Bonus and deduction summary"],
        },
        {
          title: "API Integration Plan",
          items: ["Payroll run status", "Monthly salary details", "Download salary reports"],
        },
      ],
    },
  },
  {
    key: "announcements",
    title: "Announcements",
    subtitle: "Publish team updates",
    description:
      "Create company-wide, employee, and department-specific announcements for the portal.",
    route: "/admin/announcements",
    badge: "N",
    accent: "bg-cyan-600",
    stats: ["Company updates", "Department notices", "Targeted messaging"],
    placeholder: {
      hero:
        "Announcements are connected to the API and ready for publishing portal updates.",
      sections: [
        {
          title: "What Admin Can Do",
          items: ["Create announcements", "Target departments", "Edit and remove notices"],
        },
        {
          title: "Employee Visibility",
          items: ["Company-wide messages", "Employee notices", "Department-specific updates"],
        },
      ],
    },
  },
  {
    key: "performance",
    title: "Performance",
    subtitle: "Monitor employee performance",
    description:
      "Track reviews, ratings, goals, and feedback to support better employee growth and management decisions.",
    route: "/admin/performance",
    badge: "R",
    accent: "bg-indigo-600",
    stats: ["Review cycle", "Ratings", "Goals and feedback"],
    placeholder: {
      hero:
        "This is a placeholder performance page. It can later show review cycles, ratings, and manager feedback through APIs.",
      sections: [
        {
          title: "Data To Show",
          items: ["Performance review list", "Goal tracking", "Manager feedback summary"],
        },
        {
          title: "API Integration Plan",
          items: ["Review cycle endpoint", "Employee rating history", "Goal progress metrics"],
        },
      ],
    },
  },
  {
    key: "recruitment",
    title: "Recruitment",
    subtitle: "Hiring and candidate pipeline",
    description:
      "Manage open roles, candidate stages, interview scheduling, and hiring progress from one dashboard.",
    route: "/admin/recruitment",
    badge: "H",
    accent: "bg-fuchsia-600",
    stats: ["Open positions", "Candidate stages", "Interview schedule"],
    placeholder: {
      hero:
        "This dummy recruitment page is ready for later integration with candidate, jobs, and interview APIs.",
      sections: [
        {
          title: "Data To Show",
          items: ["Open job positions", "Candidate pipeline", "Upcoming interviews"],
        },
        {
          title: "API Integration Plan",
          items: ["Job posting endpoint", "Candidate stage updates", "Interview calendar sync"],
        },
      ],
    },
  },
];
