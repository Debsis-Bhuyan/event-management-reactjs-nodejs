// models/Event.js
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// Define the Event schema
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticketPricing: {
    type: Schema.Types.ObjectId,
    ref: 'TicketPricing',
  },
});

// Create the Event model
const Event = mongoose.model('Event', EventSchema);

export default Event