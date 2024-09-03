import React from "react";
import DashboardLayout from "./DashboardLayout";
import AttendeeeDataPage from "../components/AttendeeDetails";

const AttendeePage = () => {
  return (
    <DashboardLayout>
      <AttendeeeDataPage />
    </DashboardLayout>
  );
};

export default AttendeePage;
