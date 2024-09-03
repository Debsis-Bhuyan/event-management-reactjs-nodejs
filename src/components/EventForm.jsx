import React, { useState } from "react";
import { APP_URL } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";

function CreateEventForm() {
  const userData = useSelector((state) => state.user.user);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    capacity: "",
    ticketPricing: {
      id: "",
      basicPrice: "",
      standardPrice: "",
      premiumPrice: "",
    },
  });
  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      ticketPricing: {
        ...prevEvent.ticketPricing,
        [name]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${APP_URL}/events/create-event`,
        event,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvent({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        capacity: "",
        ticketPricing: {
          id: "",
          basicPrice: "",
          standardPrice: "",
          premiumPrice: "",
        },
      });
      console.log("Event created successfully:", response.data);
      setSuccessMessage("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Event creation failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4">Create Event</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Event Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event description"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event location"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            id="startTime"
            type="datetime-local"
            name="startTime"
            value={event.startTime}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            name="endTime"
            value={event.endTime}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="capacity"
          >
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            name="capacity"
            value={event.capacity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter event capacity"
            required
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ticket Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="basicPrice"
              >
                Basic Price
              </label>
              <input
                id="basicPrice"
                type="number"
                name="basicPrice"
                value={event.ticketPricing.basicPrice}
                onChange={handleTicketChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter basic ticket price"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="standardPrice"
              >
                Standard Price
              </label>
              <input
                id="standardPrice"
                type="number"
                name="standardPrice"
                value={event.ticketPricing.standardPrice}
                onChange={handleTicketChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter standard ticket price"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="premiumPrice"
              >
                Premium Price
              </label>
              <input
                id="premiumPrice"
                type="number"
                name="premiumPrice"
                value={event.ticketPricing.premiumPrice}
                onChange={handleTicketChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter premium ticket price"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Event Creating..." : " Create Event"}
          </button>
        </div>
        <div>{errorMessage && <p className="text-green-800" >{errorMessage}</p>}</div>
        <div>{succesMessage && <p className="text-green-800">{succesMessage}</p>}</div>
      </form>
    </div>
  );
}

export default CreateEventForm;
