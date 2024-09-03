import React, { useEffect, useState } from "react";
import axios from "axios";
import { APP_URL } from "../utils";

const TicketBookingDialogBox = ({ isOpen, onClose, eventDetails, user }) => {
  const [ticketType, setTicketType] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(eventDetails?.ticketPricing?.basicPrice);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
    const booking = {
      eventId: eventDetails._id,
      ticketType,
      quantity,
      paymentMethod,
    };
    console.log(booking);

    const bookingData = {
      ticketType: ticketType,
      price: amount,
      payment: {
        paymentType: paymentMethod,
        amount: amount,
        paymentStatus: "Completed",
      },
    };
    console.log("Hii" ,bookingData)

    try {
      const response = await axios.post(
        `${APP_URL}/ticket/register/${eventDetails?._id}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data?.ticketDTO) {
        alert("Ticket booked successfully!")
        setSuccessMessage("Ticket booked successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
        console.log(error)
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (ticketType == 1) {
      setAmount(eventDetails?.ticketPricing?.basicPrice);
    }
    if (ticketType == 2) {
      setAmount(eventDetails?.ticketPricing?.standardPrice);
    }
    if (ticketType == 2) {
      setAmount(eventDetails?.ticketPricing?.premiumPrice);
    }
  }, [ticketType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl">Book Tickets</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-3xl hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Ticket Type</label>
            <select
              value={ticketType}
              onChange={handleTicketTypeChange}
              className="w-full h-[40px] border border-gray-300 rounded-md px-2"
            >
              <option value={1}>
                Basic - ₹{eventDetails?.ticketPricing?.basicPrice}
              </option>
              <option value={2}>
                Standard - ₹{eventDetails?.ticketPricing?.standardPrice}
              </option>
              <option value={3}>
                Premium - ₹{eventDetails?.ticketPricing?.premiumPrice}
              </option>
            </select>
          </div>
          {/* ticketPricing: {
      id: 13,
      basicPrice: 200,
      standardPrice: 250,
      premiumPrice: 400
    } */}

          {/* <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="10"
              className="w-full h-[40px] border border-gray-300 rounded-md px-2"
            />
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full h-[40px] border border-gray-300 rounded-md px-2"
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full h-[40px] bg-black text-white rounded-md hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TicketBookingDialogBox;
