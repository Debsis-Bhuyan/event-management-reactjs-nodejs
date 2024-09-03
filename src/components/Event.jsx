import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import bannerImage from "../assets/events-image.jpg";

const Event = ({ event }) => {

 
  return (
    <div
      className="border border-gray-200 w-[320px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      <Link to={`/events/${event._id}`} state={{ event }}>
        <img
          src={event?.banner_url || bannerImage}
          alt={event?.title}
          className="w-full h-[200px] object-cover"
        />
        <div className="p-4">
          <h2 className="font-semibold text-xl mb-2 line-clamp-2">
            {event?.title}
          </h2>
          <p className="text-gray-700 mb-4 line-clamp-4">
            {event?.description}
          </p>
          <div className="text-sm text-gray-600 mb-2 flex items-center">
            <span className="material-icons">Event day: </span>
            <p className="ml-2">
              {moment(event?.startTime).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <div className="text-sm text-gray-600 mb-2 flex items-center">
            <span className="material-icons">Event day: </span>
            <p className="ml-2">
              {moment(event?.endTime).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="material-icons">Location: </span>
            <p className="ml-2">{event?.location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Event;
