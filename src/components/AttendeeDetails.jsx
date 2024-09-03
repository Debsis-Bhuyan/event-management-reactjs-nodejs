import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_URL } from "../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import DialogBox from "./DialogBox";

const AttendeeeDataPage = () => {
  const user = useSelector((state) => state.user.user);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [ticketSalesData, setTicketSalesData] = useState(null);

  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (attendee) => {
    setSelectedAttendee(attendee);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedAttendee(null);
  };

  const sendMessage = async (message) => {
    try {
      const response = await axios.post(
        `${APP_URL}/events/${id}/communicate`,
        {message} ,
        {
          params: {
            recipientId: selectedAttendee,
          },

          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
    closeDialog();
  };

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(`${APP_URL}/ticket/attendees/${id}`, {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        });
        console.log(response.data);
        setAttendees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setLoading(false);
      }
    };
    const fetchEventSalesData = async () => {
      try {
        const response = await axios.get(
          `${APP_URL}/ticket/ticket-sales/${id}`
        );
        console.log(response.data);
        setTicketSalesData(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };
    fetchEventSalesData();
    fetchAttendees();
  }, [id]);

  const ticketType = (input) => {
    if (input == 1) {
      return "Basic";
    } else if (input == 2) {
      return "Standard";
    }
    return "Premium";
  };

  if (loading) {
    return <div className="text-center py-5">Loading attendees...</div>;
  }

  return (
    <div className="container   py-8">
      {attendees[0]?.eventName ? (
        <h1 className="text-2xl font-bold text-orange mb-6">
          Attendee List This event {attendees[0]?.eventName}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold text-orange mb-6">
          Attendee List of This event
        </h1>
      )}

      {ticketSalesData && (
        <div className="mb-6 text-lg font-semibold">
          <div className="grid grid-cols-5 gap-4">
            <div>Total Tickets Sold:</div>
            <div>Total Payment:</div>
            <div>Basic Tickets Sold:</div>
            <div>Standard Tickets Sold:</div>
            <div>Premium Tickets Sold:</div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div>{ticketSalesData.totalTicketsSold}</div>
            <div>₹ {ticketSalesData.totalPayment}</div>
            <div>{ticketSalesData.basicTicketsSold} </div>
            <div>{ticketSalesData.standardTicketsSold}</div>
            <div>{ticketSalesData.premiumTicketsSold}</div>
          </div>
        </div>
      )}
      {attendees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full mx-6  bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Ticket Type</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 border-b">{attendee.fullName}</td>
                  <td className="py-2 px-4 border-b">{attendee.email}</td>
                  <td className="py-2 px-4 border-b">
                    {ticketType(attendee.ticketType)}
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={() => openDialog(attendee.userId)}
                  >
                    <BsThreeDotsVertical />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedAttendee && (
            <DialogBox
              isOpen={isDialogOpen}
              onClose={closeDialog}
              onSend={sendMessage}
              recipientName={selectedAttendee}
            />
          )}
        </div>
      ) : (
        <p className="text-center">No attendees registered for this event.</p>
      )}
    </div>
  );
};

export default AttendeeeDataPage;
