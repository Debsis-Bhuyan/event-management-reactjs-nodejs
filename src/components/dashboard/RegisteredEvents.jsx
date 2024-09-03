import React, { useEffect, useState } from "react";
import Event from "../Event";

import EventLoader from "../../globals/eventLoader";

import { useSelector } from "react-redux";
import { APP_URL } from "../../utils/index.js";
import axios from "axios";

const Events = () => {
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getUserEvents = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${APP_URL}/ticket/attendee-events`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        console.log(response?.data?.events);
        if (response.data?.events) {
          setEvents(response.data?.events);
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    getUserEvents();
  }, []);

  return (
    <div className="w-full pt-6">
      <h1 className="text-2xl">Events you have registered for</h1>
      <div className="grid grid-cols-1 mt-4 py-5 sm:grid-cols-2 md:grid-cols-3 mx-auto w-fit gap-10">
        {events?.map((event) => (
          <Event event={event} key={event.id} />
        ))}
        {loading ? <EventLoader count={8} /> : ""}
      </div>
      {!loading && !events?.length && (
        <h1 className="w-full text-lg">No events found!</h1>
      )}
    </div>
  );
};

export default Events;
