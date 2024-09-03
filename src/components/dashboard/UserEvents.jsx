import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Event from "./Event";
import EventLoader from "../../globals/eventLoader";
import axios from "axios";
import { APP_URL } from "../../utils";

const Events = () => {
  const userEvents = useSelector((state) => state.userEvent.userEvent);
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [events, setEvents] =useState(userEvents)


  useEffect(() => {
    const getUserEvents = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${APP_URL}/events/get-events`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setEvents(response.data?.events)
        
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserEvents();
  }, []);

  useEffect(() => {
    const filterEvents = () => {
      const now = new Date();

      if (filter === "upcoming") {
        return events.filter((event) => new Date(event.startTime) >= now);
      } else if (filter === "past") {
        return events.filter((event) => new Date(event.startTime) < now);
      }
     

      return events;
    };

    const filtered = filterEvents();
    setFilteredEvents(filtered);
  }, [filter, events]);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="w-full pt-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Events you are managing</h1>
        <div>
          <button
            className={`mr-2 px-4 py-2 ${
              filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All Events
          </button>
          <button
            className={`mr-2 px-4 py-2 ${
              filter === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`px-4 py-2 ${
              filter === "past" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("past")}
          >
            Past Events
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-4 py-5 sm:grid-cols-2 md:grid-cols-3 mx-auto w-fit gap-10">
        {filteredEvents?.map((event) => (
          <Event event={event} key={event._id} />
        ))}
        {loading && <EventLoader count={8} />}
      </div>
      {!loading && !filteredEvents?.length && (
        <h1 className="w-full text-lg">No events found!</h1>
      )}
    </div>
  );
};

export default Events;
