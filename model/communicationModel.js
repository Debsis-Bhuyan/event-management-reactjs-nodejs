import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the CommunicationModel schema
const CommunicationSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Communication model
const CommunicationModel = mongoose.model('CommunicationModel', CommunicationSchema);

export default CommunicationModel;
