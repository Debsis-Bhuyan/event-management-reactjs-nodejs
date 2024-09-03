import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Event from "./Event";
import clap from "../assets/people.jpg";
import { IoSearch } from "react-icons/io5";
import { setEvent } from "../store/eventSlice";
import axios from "axios";
import { APP_URL } from "../utils";

const Events = ({ simplified, nosearch }) => {
  const eventsList = useSelector((state) => state.eventsList).eventsList;

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState("");
  const [eventFilter, setEventFilter] = useState("All");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${APP_URL}/events/get-all`);
        dispatch(setEvent(response.data?.events));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    setLoading(true);

    fetchEvents();
    setLoading(false);
  }, []);
  useEffect(() => {
    let filteredEvents = eventsList;

    if (simplified) {
      filteredEvents = filteredEvents?.slice(0, 8);
    } else {
      filteredEvents = filteredEvents?.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (location) {
        filteredEvents = filteredEvents.filter((event) =>
          event.location?.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (category) {
        filteredEvents = filteredEvents.filter(
          (event) => event.category?.toLowerCase() === category.toLowerCase()
        );
      }

      if (sortOption === "date") {
        filteredEvents = filteredEvents.sort((a, b) => {
          const dateA = new Date(a.startTime);
          const dateB = new Date(b.startTime);
          return dateA - dateB;
        });
      } else if (sortOption === "title") {
        filteredEvents = filteredEvents.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      const now = new Date();

      if (eventFilter === "upcoming") {
        filteredEvents = filteredEvents.filter(
          (event) => new Date(event.startTime) >= now
        );
      } else if (eventFilter === "past") {
        filteredEvents = filteredEvents.filter(
          (event) => new Date(event.startTime) < now
        );
      } else if (eventFilter === "All") {
        filteredEvents = filteredEvents;
      }
    }

    setEvents(filteredEvents);
  }, [
    eventsList,
    eventFilter,
    searchTerm,
    location,
    category,
    sortOption,
    simplified,
  ]);

  useEffect(() => {
   

    setEvents(eventsList);
  }, [eventsList]);

  useEffect(() => {
    if (events) {
      const uniqueLocations = [
        ...new Set(events.map((event) => event.location)),
      ];
      setLocationData(uniqueLocations);
    }
  }, [events]);

  return (
    <div className="w-full">
      {!loading && (
        <div>
          {!nosearch && (
            <div className="relative flex justify-center items-center text-center h-[50vh] w-full">
              <img src={clap} alt="" className="w-full h-full object-cover" />
              <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center flex-col">
                <h1 className="text-4xl font-medium text-primary">
                  All Events
                </h1>
                <div className="relative mt-4">
                  <input
                    type="text"
                    placeholder="Search for events"
                    className="p-2 w-[90vw] md:w-[40vw] rounded-e-3xl"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <button className="bg-[#e75022] rounded-3xl py-2 px-6 absolute right-0 top-0 flex text-white items-center font-bold">
                    <IoSearch className="mx-1" /> Search
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-wrap gap-4">
              <select
                className="p-2 border rounded-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locationData &&
                  locationData.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
              </select>

              <select
                className="p-2 border rounded-lg"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
              <select
                className="p-2 border rounded-lg"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
              >
                <option value="All">ALL Events</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="past">Past Events</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-4 px-6 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto w-fit gap-12">
            {events?.map((event) => (
              <Event event={event} key={event._id} />
            ))}
            {!events?.length && (
              <h1 className="w-full text-left text-3xl">No events found</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
