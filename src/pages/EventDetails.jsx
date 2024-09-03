import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "./Layout";
import EventDetailPage from "./EventDetailsPage";


const EventDetails = () => {

  const {id} = useParams();
  console.log(id);

  return (
    <Layout>
      <EventDetailPage eventId={id} />
    </Layout>
  );
};

export default EventDetails;
