import React, {  useState } from "react";

import {
  EventHighlightLoader,
  EventContentLoader,
  EventOrganizerLoader,
} from "../globals/EventDetailsLoader.jsx";
import { formatDate } from "../helpers/utils";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const Event = ({ eventId, eventData }) => {
  console.log(eventData?.event);
  const userData = useSelector((state) => state.user.user);

  const [event, setEvent] = useState(eventData?.event);
  
  
  const [loading, setLoading] = useState(false);

  

  return (
    <div>
      {loading ? (
        <EventHighlightLoader />
      ) : (
        <div className="w-full flex flex-col sm:flex-row events-header  pt-20 imaage">
          <div className="w-full sm:w-1/2 text-white gap-8 flex flex-col px-16 sm:px-12 justify-center text-2xl ">
            <h1 className="text-2xl lg:text-4xl font-medium ">
              {event?.title}
            </h1>
            <span className="flex gap-6">
              <FaCalendarAlt />
              <p>{formatDate(event?.startTime)}</p>
            </span>
            <span className="flex gap-6">
              <FaMapMarkerAlt />
              <p>{event?.location}</p>
            </span>
          </div>
        </div>
      )}

      <div className="p-5 px-16 box-content">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          {loading ? (
            <EventContentLoader />
          ) : (
            <div className="w-full sm:w-[70%] mr-5 flex flex-col gap-5">
              <h1 className="uppercase text-gray-600 text-xl">Description</h1>
              <p className="text-base mt-3 w-full">{event?.description}</p>
            </div>
          )}
          {loading ? (
            <EventOrganizerLoader />
          ) : (
            <div className="w-full sm:w-[30%] mt-5 sm:mt-0 text-sm flex flex-col gap-4 border-s-2 border-primary p-3">
              <h1 className="uppercase text-gray-600 text-xl">Organizer</h1>
              <p className="text-xl">{event?.organizer?.fullName}</p>

              <span className="flex gap-4">
                <FaEnvelope size={18} />
                <p>{event?.organizer?.email}</p>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
