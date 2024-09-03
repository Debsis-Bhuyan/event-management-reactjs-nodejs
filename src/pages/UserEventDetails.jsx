import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
import { EventHighlightLoader } from "../globals/EventDetailsLoader";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { APP_URL } from "../utils";

function UserEventDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.user.user);
  const [comments, setComments] = useState([]);
  const [event, setEvent] = useState(null);

  const [newComment, setNewComment] = useState({ message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [ticketSalesData, setTicketSalesData] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${APP_URL}/events/get-event/${id}`);

        setEvent(response.data?.event);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment({ message: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${APP_URL}/feedback/submit/${event?._id}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setComments([...comments, response.data?.feedback]);
        setNewComment({ message: "" });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchAllFeedback = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/userfeedback/event/${id}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${user?.token}`,
          //   },
          // }
        );
        console.log(response.data);
        setFeedback(response.data?.feedback);
      } catch (error) {
        console.error("Error retriving feedback", error);
      }
    };
    const fetchEventSalesData = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/ticket/ticket-sales/${id}`
        );
        setTicketSalesData(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    const fetchCommentData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/feedback/feed/${id}`);
        if (response.data?.feedbackDTOList) {
          setComments(response.data?.feedbackDTOList);
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };
    fetchCommentData();
    fetchAllFeedback();
    fetchEventSalesData();
  }, []);

  useEffect(() => {
    const sortedData = comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setComments(sortedData);
  }, [comments]);
  return (
    <div className="w-full  ">
      {loading ? (
        <EventHighlightLoader />
      ) : (
        event && (
          <>
            <div className="w-full flex flex-col sm:flex-row events-header  pt-16 imaage">
              <div className="w-full sm:w-3/4 text-white gap-8 flex flex-col px-12 sm:px-10 justify-center text-2xl ">
                <h1 className="text-2xl lg:text-4xl font-medium ">
                  {event?.title}
                </h1>
                <span className="flex gap-4">
                  <FaCalendarAlt />
                  <p className="text-white">
                    {new Date(event?.startTime).toLocaleString()} -
                    {new Date(event?.endTime).toLocaleString()}
                  </p>
                </span>
                <span className="flex gap-6">
                  <FaMapMarkerAlt />
                  <p>{event?.location}</p>
                </span>
                <span className="flex gap-6 mb-6">
                  <FaUser />
                  <p className="text-red-700 ">
                    Organized by: {event.organizer?.fullName}
                  </p>
                </span>
              </div>
              <div className="w-full  flex justify-center sm:w-1/2 mb-6  items-end mt-5 sm:mt-0">
                <div className="w-full  ">
                  <span className="flex gap-4 items-center pt-4">
                    <FaUsers />
                    <p className="text-red-600">
                      Registered attendee {ticketSalesData?.totalTicketsSold}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col mx-6 lg:flex-row">
              <div className="w-full  mb-6 lg:mb-0">
                <div className="bg-white shadow-md rounded mb-6 p-6">
                  <h2 className="text-2xl font-bold mb-4">Event Description</h2>
                  <p className="text-gray-700 mb-4">{event?.description}</p>

                  <h2 className="text-2xl font-bold mb-4">Schedule</h2>
                  <p className="text-gray-700 mb-4">
                    Details about the event schedule can be placed here.
                  </p>

                  <h2 className="text-2xl font-bold mb-4">Ticket Options</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">Basic</h3>
                      <p className="text-gray-700 mb-4">
                        Price: ₹ {event.ticketPricing?.basicPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Basic
                      </button>
                    </div>
                    <div className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">Standard</h3>
                      <p className="text-gray-700 mb-4">
                        Price: ₹ {event.ticketPricing?.standardPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Standard
                      </button>
                    </div>
                    <div className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">Premium</h3>
                      <p className="text-gray-700 mb-4">
                        Price: ₹ {event.ticketPricing?.premiumPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Premium
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
      <footer className="bg-white shadow-md rounded mt-6 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">All the Feedback</h2>
          <div className="mb-6">
            <div className="space-y-4">
              {feedback.length > 0 ? (
                feedback.map((feed, index) => (
                  <div key={index} className="p-4 border rounded">
                    <p className="text-gray-800">{feed?.message}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(feed.createdAt).toLocaleString()}{" "}
                      <span> send by- {feed?.userName}</span>
                    </p>
                  </div>
                ))
              ) : (
                <h1>No feedback available for this event</h1>
              )}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Comments & Discussion</h2>
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                className="w-full p-4 border rounded mb-4"
                placeholder="Add a comment..."
                value={newComment.message}
                onChange={handleCommentChange}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Post Comment"}
              </button>
            </form>
          )}
          <div className="mb-6">
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 border rounded">
                  <p className="text-gray-800">{comment?.message}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserEventDetails;
