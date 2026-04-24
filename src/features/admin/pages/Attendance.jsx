import React from "react";
import AdminPlaceholderPage from "../components/AdminPlaceholderPage";
import { adminModules } from "../data/adminModules";

const Attendance = () => {
  const module = adminModules.find((item) => item.key === "attendance");

  return (
    <AdminPlaceholderPage
      title={module.title}
      subtitle={module.description}
      hero={module.placeholder.hero}
      sections={module.placeholder.sections}
    />
  );
};

export default Attendance;
