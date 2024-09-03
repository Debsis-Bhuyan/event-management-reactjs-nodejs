import Event from "../model/eventModel.js";
import User from "../model/userModel.js";
import Payment from "../model/paymentModel.js";
import Ticket from "../model/ticketModel.js";

const TicketService = {
  // Register an attendee for an event
  registerAttendee: async (eventId, userId, ticketDTO) => {
    const ticketResponse = {};

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const ticket = await getTicket(ticketDTO, event, user);

      const savedTicket = await ticket.save();

      ticketResponse.statusCode = 201;
      ticketResponse.message = "Attendee registered successfully";
      ticketResponse.ticketDTO = mapTicketEntityToTicketDTO(savedTicket);
    } catch (error) {
      if (
        error.message.includes("Event not found") ||
        error.message.includes("User not found")
      ) {
        ticketResponse.statusCode = 400;
        ticketResponse.message = `Registration failed: ${error.message}`;
      } else {
        ticketResponse.statusCode = 500;
        ticketResponse.message = `Registration failed due to a server error: ${error.message}`;
      }
      ticketResponse.ticketDTO = null;
    }

    return ticketResponse;
  },

  // Get the list of attendees for an event
  getAttendeeList: async (eventId) => {
    try {
      const tickets = await Ticket.find({ event: eventId }).populate(
        "user",
        "fullName email"
      );

      return tickets.map((ticket) => ({
        id: ticket.user._id,
        fullName: ticket.user.fullName,
        email: ticket.user.email,
        ticketType: ticket.ticketType,
        eventTitle: ticket.event.title,
      }));
    } catch (error) {
      throw new Error("Failed to retrieve attendees list");
    }
  },

  // Get ticket sales for an event
  getTicketSales: async (eventId) => {
    try {
      const tickets = await Ticket.find({ event: eventId });

      const totalTicketsSold = tickets.length;
      const totalPayment = tickets.reduce(
        (sum, ticket) => sum + ticket.price,
        0
      );

      const basicTicketsSold = tickets.filter((t) => t.ticketType === 1).length;
      const standardTicketsSold = tickets.filter(
        (t) => t.ticketType === 2
      ).length;
      const premiumTicketsSold = tickets.filter(
        (t) => t.ticketType === 3
      ).length;

      return {
        totalTicketsSold,
        totalPayment,
        basicTicketsSold,
        standardTicketsSold,
        premiumTicketsSold,
      };
    } catch (error) {
      throw new Error("Failed to retrieve ticket sales");
    }
  },

  // Get events where the user is an attendee
  getEventsByUserAsAttendee: async (userId) => {
    try {
      const tickets = await Ticket.find({ user: userId }).populate(
        "event",
        "title date"
      );

      const events = tickets
        .map((ticket) => ticket.event)
        .filter((v, i, a) => a.indexOf(v) === i);

      return {
        statusCode: 200,
        message: "Event data retrieved successfully",
        events,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: `Failed to retrieve events: ${error.message}`,
      };
    }
  },
};

// Helper function to create a Ticket object
async function getTicket(ticketDTO, event, user) {
  const payment = new Payment({
    paymentType: ticketDTO.payment.paymentType,
    amount: ticketDTO.payment.amount,
    paymentStatus: ticketDTO.payment.paymentStatus,
  });

  await payment.save();

  const ticket = new Ticket({
    event: event._id,
    user: user._id,
    ticketType: ticketDTO.ticketType,
    price: ticketDTO.price,
    payment: payment._id,
  });

  return ticket;
}

// Helper function to map Ticket entity to TicketDTO
function mapTicketEntityToTicketDTO(ticket) {
  return {
    eventId: ticket.event._id,
    userId: ticket.user._id,
    ticketType: ticket.ticketType,
    price: ticket.price,
    payment: {
      paymentType: ticket.payment.paymentType,
      amount: ticket.payment.amount,
      paymentStatus: ticket.payment.paymentStatus,
    },
  };
}

export default TicketService;
