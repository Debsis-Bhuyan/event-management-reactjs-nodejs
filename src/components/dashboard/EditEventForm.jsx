import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { APP_URL } from "../../utils/index.js";
import { useSelector } from "react-redux";

const EditEventForm = ({ eventId }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [infoMsg, setInfoMessage] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getEventById = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/events/get-event/${eventId}`
        );
        setEvent(response.data?.event);
      } catch (error) {
        console.log("Error retriving the event");
        setEvent([]);
      }
    };
    getEventById();
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setEvent({ ...event, [name]: dayjs(value).format("YYYY-MM-DDTHH:mm:ss") });
  };

  const handleSave = async () => {
    setErrorMessage("");
    setInfoMessage("");

    try {
      const response = await axios.put(
        `${APP_URL}/events/update/${eventId}`,
        event,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setEvent(response.data?.event);
      alert("Event updated successfully");
      console.log(response.data);
      setInfoMessage("Event updated successfully");
      console.log("Updated Event:", response.data);
    } catch (error) {
      console.log("Event update failed", error);
      setErrorMessage("Event update failed");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/my-events");
  };

  return (
    <>
      {!loading && (
        <div className="flex flex-col lg:flex-row justify-between w-full px-4 py-4">
          <div className="lg:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-4 text-orange">Edit Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={event?.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={event?.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={event.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={dayjs(event.startTime).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    handleDateChange("startTime", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={dayjs(event.endTime).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) => handleDateChange("endTime", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={event.capacity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ticket Pricing
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="number"
                      name="basicPrice"
                      value={event.ticketPricing?.basicPrice}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          ticketPricing: {
                            ...event.ticketPricing,
                            basicPrice: e.target.value,
                          },
                        })
                      }
                      placeholder="Basic Price"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="standardPrice"
                      value={event.ticketPricing?.standardPrice}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          ticketPricing: {
                            ...event.ticketPricing,
                            standardPrice: e.target.value,
                          },
                        })
                      }
                      placeholder="Standard Price"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="premiumPrice"
                      value={event.ticketPricing?.premiumPrice}
                      onChange={(e) =>
                        setEvent({
                          ...event,
                          ticketPricing: {
                            ...event.ticketPricing,
                            premiumPrice: e.target.value,
                          },
                        })
                      }
                      placeholder="Premium Price"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              {infoMsg && <div className="text-green-500 mt-4">{infoMsg}</div>}
              {errorMsg && <div className="text-red-500 mt-4">{errorMsg}</div>}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEventForm;
