import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function TicketingRegistrationPage() {
  const location = useLocation();

  const [tickets, setTickets] = useState({
    basic: 0,
    standard: 0,
    premium: 0,
  });
  const [event, setEvent] = useState(location.state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleTicketChange = (type, quantity) => {
    setTickets((prevTickets) => ({
      ...prevTickets,
      [type]: quantity,
    }));
  };

  const calculateTotalPrice = () => {
    const finalPrice =
      tickets.basic * event.ticketPricing.basicPrice +
      tickets.standard * event.ticketPricing.standardPrice +
      tickets.premium * event.ticketPricing.premiumPrice;

    setTotalPrice(finalPrice);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [tickets]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      // Replace with your payment processing API
      const response = await axios.post("/api/processPayment", {
        tickets,
        totalPrice,
        paymentDetails,
      });

      if (response.status === 200) {
        alert("Payment successful! Thank you for your purchase.");
        // Additional logic for successful payment (e.g., redirect to a confirmation page)
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="w-full px-6 mt-20">
      
      <h1 className="text-3xl font-bold mb-6">Ticketing & Registration</h1>

     
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select Your Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["basic", "standard", "premium"].map((type) => (
            <div key={type} className="p-4 border rounded">
              <h3 className="text-xl font-semibold capitalize">{type}</h3>
              <p className="text-gray-700 mb-4">
                Price: ₹{event?.ticketPricing[`${type}Price`]}
              </p>
              <div className="flex items-center">
                <label htmlFor={`${type}-quantity`} className="mr-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id={`${type}-quantity`}
                  value={tickets[type]}
                  onChange={(e) =>
                    handleTicketChange(type, parseInt(e.target.value, 10))
                  }
                  className="border rounded p-2 w-20"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="p-4 border rounded">
          <p className="mb-2">Basic Tickets: {tickets.basic}</p>
          <p className="mb-2">Standard Tickets: {tickets.standard}</p>
          <p className="mb-2">Premium Tickets: {tickets.premium}</p>
          <h3 className="text-xl font-bold mt-4">
            Total Price: ₹ {totalPrice}
          </h3>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <form onSubmit={handleCheckout} className="p-4 border rounded">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handlePaymentChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handlePaymentChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={paymentDetails.nameOnCard}
              onChange={handlePaymentChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Proceed to Checkout
          </button>
        </form>
      </div>

      {totalPrice > 0 && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
          <p>
            Please review your order and payment details before proceeding. You
            will receive a confirmation message once your payment is successful.
          </p>
        </div>
      )}
    </div>
  );
}

export default TicketingRegistrationPage;
