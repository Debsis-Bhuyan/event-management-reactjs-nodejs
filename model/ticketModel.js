import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  ticketType: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  noOfTickets: {
    type: Number,
    required: true,
    default: 1,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
