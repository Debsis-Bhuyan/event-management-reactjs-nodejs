import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserFeedbackSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserFeedback = mongoose.model("UserFeedback", UserFeedbackSchema);

export default UserFeedback;
