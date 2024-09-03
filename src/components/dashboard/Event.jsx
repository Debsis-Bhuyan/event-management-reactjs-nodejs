import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaEdit,
  FaEye,
  FaUser,
  FaUsers
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {  formatDate } from "../../helpers/utils.js";
import { useDispatch, useSelector } from "react-redux";

import bannerImage from "../../assets/events-image.jpg";
import axios from "axios";
import { APP_URL } from "../../utils/index.js";
import { setUserEvent } from "../../store/userEventSlice.js";


const Event = ({ event }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [errorMsg, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUserData, setUserLoadingUserData] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
  
      const response = await axios.delete(`${APP_URL}/events/delete/${event?._id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
  
      if (response.status === 200) {
        alert("Event deleted successfully");
      }
      console.log(response.data);
      setUserLoadingUserData(true);
    } catch (error) {
      console.error("Error while deleting events:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (loadingUserData) {
      const getUserEvents = async () => {
        setLoading(true);

        try {
          const response = await axios.get(`${APP_URL}/event/get-events`,
            {
              headers:{
                Authorization:"Bearer "+user?.token
              }
            }
          );
          console.log(response.data);
          dispatch(setUserEvent(response.data?.events));
        } catch (error) {
          console.error("Error fetching user events:", error);
        } finally {
          setLoading(false);
        }
      };
      getUserEvents();
      setUserLoadingUserData(false)
    }
  }, [loadingUserData]);

  return (
    <div className="border border-gray-200 w-[320px] p-0 rounded-md shadow-md">
      <img
        src={event?.banner_url || bannerImage}
        alt={event?.title}
        className="w-full h-[200px] object-cover rounded-t-md"
      />

      <div className="flex flex-col gap-3 p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <span
              className="p-2 bg-gray-900 text-white font-bold cursor-pointer rounded"
              title="Edit"
              onClick={() => navigate(`/dashboard/my-events/${event._id}`)}
            >
              <FaEdit />
            </span>
            <span
              className="p-2 bg-red-600 text-white font-bold cursor-pointer rounded"
              onClick={handleDelete}
              title="Delete"
            >
              <FaTrashAlt />
            </span>
            <Link
              className="p-2 bg-white border-2 font-bold cursor-pointer rounded"
              title="Preview"
              to={`/dashboard/my-events/preview/${event._id}`}
              state={{ event }}
            >
              <FaEye />
            </Link>
            <Link
              className="p-2 bg-white border-2 font-bold cursor-pointer rounded"
              title="Attendee List"
              to={`/dashboard/my-events/attendee/${event._id}`}
            >
              <FaUsers />
            </Link>
          </div>
          
        </div>
        <h2 className="font-medium text-xl line-clamp-2">{event?.title}</h2>
        <p className="line-clamp-4">{event.description}</p>
        <div className="flex gap-2 items-center">
          <FaCalendarAlt size={18} />
          <p>{formatDate(event?.startTime)}</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaMapMarkerAlt size={18} />
          <p>{event?.location}</p>
        </div>
        {/* <div className="flex gap-2 items-center">
          <FaUser size={18} />
          <p>Organizer- {event?.organizer?.fullName}</p>
        </div> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">
              Event Attendees - {event.title}
            </h3>
            <ol className="list-decimal">
              {event?.attendees.map((user, index) => (
                <li key={index}>
                  <strong>{user?.fullName}</strong> - {user.email}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
