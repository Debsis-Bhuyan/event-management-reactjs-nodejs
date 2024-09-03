import Feedback from "../model/feedbackModel.js";

export const submitFeedback = async (userId, eventId, feedbackMessageDTO) => {
  const feedbackResponse = {
    statusCode: null,
    message: null,
    feedback: null,
  };

  try {
    // Validate inputs
    if (!userId || !eventId || !feedbackMessageDTO.message) {
      throw new Error(
        "Invalid input: userId, eventId, and message are required."
      );
    }
    console.log(feedbackMessageDTO.message);
    const feedback = new Feedback({
      userId,
      eventId,
      message: feedbackMessageDTO.message,
    });
    const savedFeedback = await feedback.save();
    feedbackResponse.feedback = {
      userId: savedFeedback.userId,
      eventId: savedFeedback.eventId,
      message: savedFeedback.message,
      createdAt: savedFeedback.createdAt,
    };
    feedbackResponse.statusCode = 200;
    feedbackResponse.message = "Message sent successfully";
  } catch (error) {
    feedbackResponse.statusCode = error.message.startsWith("Invalid input")
      ? 400
      : 500;
    feedbackResponse.message = error.message;
  }

  return feedbackResponse;
};

export const getFeedbacksByEventId = async (eventId) => {
  const response = {
    statusCode: null,
    message: null,
    feedbackDTOList: [],
  };

  try {
    const feedbacks = await Feedback.find({ eventId });

    response.feedbackDTOList = feedbacks;

    response.statusCode = 200;
    response.message = "Feedback retrieved successfully.";
  } catch (error) {
    response.statusCode = 500;
    response.message = `Failed to retrieve feedback: ${error.message}`;
  }
  return response;
};

export const getFeedbacksByUserId = async (userId) => {
  const response = {
    statusCode: null,
    message: null,
    feedbackDTOList: [],
  };

  try {
    const feedbacks = await Feedback.find({ userId });

    response.feedbackDTOList = feedbacks;
    response.statusCode = 200;
    response.message = "Feedback retrieved successfully.";
  } catch (error) {
    response.statusCode = 500;
    response.message = `Failed to retrieve feedback: ${error.message}`;
  }

  return response;
};
