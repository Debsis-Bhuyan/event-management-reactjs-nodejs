import React from "react";
import EditEventForm from "../components/dashboard/EditEventForm.jsx";
import DashboardLayout from "./DashboardLayout";
import { useParams } from "react-router-dom";

// ok

const EditEvent = () => {
  const eventId = useParams().id;
  return (
    <DashboardLayout>
      <EditEventForm eventId={eventId} />
    </DashboardLayout>
  );
};

export default EditEvent;
