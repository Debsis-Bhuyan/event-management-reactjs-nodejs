import Event from "../model/eventModel.js";
import User from "../model/userModel.js";
import UserFeedback from "../model/userFeedbackModel.js";

async function createFeedback(userId, eventId, feedbackMessageDTO) {
  const feedbackResponse = {
    responseStatus: null,
    responseMessage: null,
    feedback: null,
  };

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const feedback = new UserFeedback({
      userName: user.fullName,
      eventId,
      message: feedbackMessageDTO.message,
      createdAt: new Date(),
    });
    const savedFeedback = await feedback.save();

    feedbackResponse.responseStatus = 201;
    feedbackResponse.responseMessage = "Feedback sent successfully";
    feedbackResponse.feedback = savedFeedback;
  } catch (error) {
    feedbackResponse.responseStatus = 500;
    feedbackResponse.responseMessage = `Failed to submit feedback: ${error.message}`;
    feedbackResponse.feedback = null;
  }

  return feedbackResponse;
}

async function getFeedbackByEventId(eventId) {
  const feedbackResponse = {
    responseStatus: null,
    responseMessage: null,
    feedback: null,
  };

  try {
    const feedbackList = await UserFeedback.find({ eventId });
    feedbackResponse.feedback = feedbackList.map((feed) => {
      let feedback = {
        userName: feed?.userName || feed?.userId,
        eventId: feed.eventId,
        message: feed.message,
        createdAt: feed.createdAt,
      };
      return feedback;
    });
    feedbackResponse.responseStatus = 200;
    feedbackResponse.responseMessage = "Feedback retrieved successfully";
  } catch (error) {
    feedbackResponse.responseStatus = 500;
    feedbackResponse.responseMessage = `Failed to retrieve feedback: ${error.message}`;
  }

  return feedbackResponse;
}

export { createFeedback, getFeedbackByEventId };
