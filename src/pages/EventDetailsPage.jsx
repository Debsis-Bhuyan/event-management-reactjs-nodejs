import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUser } from "react-icons/fa";
import { EventHighlightLoader } from "../globals/EventDetailsLoader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APP_URL } from "../utils";
import LoginDialogBox from "../auth/LoginDialogBox";
import TicketBookingDialogBox from "../components/TicketBookingDialogBox";

function EventDetailPage({ eventId }) {
  const user = useSelector((state) => state.user.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketSalesData, setTicketSalesData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ message: "" });
  const openLoginDialog = () => setLoginDialogOpen(true);
  const closeLoginDialog = () => setLoginDialogOpen(false);

  const [event, setEvent] = useState(null);

  const handleFeedbackMessage = (e) => {
    setFeedbackMessage({ message: e.target.value });
  };
  const handleMessage = (e) => {
    setNewComment({ message: e.target.value });
  };

  useEffect(() => {
    setLoading(true);
    const getEvents = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/events/get-event/${eventId}`
        );
        console.log(response.data?.event);
        setEvent(response.data?.event);
      } catch (error) {
        console.log(error);
        setEvent({});
      }
    };
    getEvents();
    setLoading(false);
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${APP_URL}/userfeedback/create/${event?._id}`,
        feedbackMessage,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data?.responseStatus === 201) {
        alert("Feedback send Successfully");
        setFeedbackMessage({ message: "" });
      }
      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting Feedback:", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
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
      if (response.status === 200) {
        setComments([...comments, response.data?.feedback]);
        setNewComment({ message: "" });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUserRegisteredData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/ticket/attendee-events`, {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        });
        if (response.data?.events) {
          setUserEvents(response.data?.events);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setLoading(false);
      }
    };
    const fetchEventSalesData = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/ticket/ticket-sales/${eventId}`
        );
        setTicketSalesData(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };
    const fetchCommentData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/feedback/feed/${eventId}`);

        if (response.data?.feedbackDTOList) {
          setComments(response.data?.feedbackDTOList);
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };
    fetchEventSalesData();
    if (user?.token) {
      fetchUserRegisteredData();
    }
    fetchCommentData();
  }, []);

  useEffect(() => {
    if (user?.token) {
      setTimeout(() => {
        console.log(userEvents)
        const data = userEvents.filter((ele) => ele._id === event?._id);
        console.log("data",data)
        if (data.length > 0) {
          setRegistered(true);
        }
      }, 10);
    }
  }, [userEvents]);

  return (
    <div className="w-full  ">
      {loading ? (
        <EventHighlightLoader />
      ) : (
        event && (
          <>
            <div className="w-full flex flex-col sm:flex-row events-header  pt-16 imaage">
              <div className="w-full sm:w-3/4 text-white gap-8 flex flex-col px-12 pb-6 sm:px-10 justify-center text-2xl ">
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
                <span className="flex gap-6">
                  <FaUser />
                  <p className="text-red-600">
                    Organized by: {event.organizer.fullName}
                  </p>
                </span>
              </div>
              <div className="w-full  flex justify-center sm:w-1/2  items-center mt-5 sm:mt-0">
                <div className="w-full  ">
                  {registered ? (
                    <>
                      <button className="w-[200px] font-medium text-white uppercase py-3 px-5 border-0 bg-primary">
                        Registered
                      </button>
                      <span className="flex gap-4 items-center pt-4">
                        <FaUsers />
                        <p className="text-red-600">
                          Registered attendee{" "}
                          {ticketSalesData?.totalTicketsSold}
                        </p>
                      </span>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-[200px] font-medium text-white uppercase py-3 px-5 border-0 bg-primary"
                        onClick={() => {
                          openLoginDialog();
                        }}
                      >
                        Register
                      </button>
                      <span className="flex gap-4 items-center pt-4">
                        <FaUsers />
                        <p className="text-red-600">
                          Registered attendee{" "}
                          {ticketSalesData?.totalTicketsSold}
                        </p>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {isLoginDialogOpen &&
              (user?.token ? (
                <TicketBookingDialogBox
                  isOpen={openLoginDialog}
                  onClose={closeLoginDialog}
                  eventDetails={event}
                  user={user}
                />
              ) : (
                <LoginDialogBox
                  isOpen={openLoginDialog}
                  onClose={closeLoginDialog}
                />
              ))}

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
                        Price: ₹{event.ticketPricing?.basicPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Basic
                      </button>
                    </div>
                    <div className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">Standard</h3>
                      <p className="text-gray-700 mb-4">
                        Price: ₹{event.ticketPricing?.standardPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Standard
                      </button>
                    </div>
                    <div className="border p-4 rounded">
                      <h3 className="text-xl font-semibold">Premium</h3>
                      <p className="text-gray-700 mb-4">
                        Price: ₹{event.ticketPricing?.premiumPrice}
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Purchase Premium
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="bg-white shadow-md rounded mt-6 p-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Send Feedback</h2>
                {user ? (
                  <form onSubmit={handleFeedbackSubmit} className="mb-4">
                    <textarea
                      className="w-full p-4 border rounded mb-4"
                      placeholder="Write feedback..."
                      value={feedbackMessage.message}
                      onChange={handleFeedbackMessage}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={submitting}
                    >
                      {submitting ? "Feedback Submitting..." : "Post Feedback"}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between py-4 ">
                    <Link
                      to={"/login"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Login to Feedback in this event
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Comments & Discussion
                </h2>
                {user ? (
                  <form onSubmit={handleCommentSubmit} className="mb-4">
                    <textarea
                      className="w-full p-4 border rounded mb-4"
                      placeholder="Add a comment..."
                      value={newComment.message}
                      onChange={handleMessage}
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
                ) : (
                  <div className="flex items-center justify-between py-4 ">
                    <Link
                      to={"/login"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Login to comment in this event
                    </Link>
                  </div>
                )}
                <div className="mb-6">
                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="p-1 border rounded">
                        <p className="text-gray-800">{comment?.message}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                <div className="space-y-4">
                  <details className="border rounded-md p-4">
                    <summary className="font-semibold">
                      What is the refund policy?
                    </summary>
                    <p className="mt-2 text-gray-700">
                      Details about the refund policy.
                    </p>
                  </details>
                  <details className="border rounded-md p-4">
                    <summary className="font-semibold">
                      Is parking available?
                    </summary>
                    <p className="mt-2 text-gray-700">
                      Details about parking availability.
                    </p>
                  </details>
                  <details className="border rounded-md p-4">
                    <summary className="font-semibold">
                      Can I transfer my ticket?
                    </summary>
                    <p className="mt-2 text-gray-700">
                      Details about ticket transfer.
                    </p>
                  </details>
                </div>
              </div>
            </footer>
          </>
        )
      )}
    </div>
  );
}

export default EventDetailPage;
