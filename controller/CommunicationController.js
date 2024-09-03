import User from "../model/userModel.js";
import Event from "../model/eventModel.js";
import Communication from "../model/communicationModel.js";

// Function to send a communication message
const sendCommunication = async (
  eventId,
  senderId,
  recipientId,
  feedbackMessageDTO
) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const sender = await User.findById(senderId);
    if (!sender) {
      throw new Error("Sender not found");
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      throw new Error("Recipient not found");
    }

    const communication = new Communication({
      event: event._id,
      sender: sender._id,
      recipient: recipient._id,
      message: feedbackMessageDTO.message,
      sentAt: new Date(),
    });

    await communication.save();

    return {
      statusCode: 201,
      message: "Message sent successfully",
    };
  } catch (error) {
    if (error.message.includes("not found")) {
      return {
        statusCode: 400,
        message: `Failed to send message: ${error.message}`,
      };
    }
    return {
      statusCode: 500,
      message: `An unexpected error occurred: ${error.message}`,
    };
  }
};

// Function to retrieve communications by eventId and senderId
const getCommunications = async (eventId, senderId) => {
  try {
    const communications = await Communication.find({
      event: eventId,
      sender: senderId,
    })
      .populate("recipient", "fullName")
      .populate("event", "title");

    const communicationDTOs = communications.map((comm) => ({
      message: comm.message,
      recipientName: comm.recipient.fullName,
      sentAt: comm.sentAt,
      eventTitle: comm.event.title,
    }));

    return communicationDTOs;
  } catch (error) {
    throw new Error("Error retrieving communications: " + error.message);
  }
};

// Function to retrieve communications by recipientId
const getCommunicationsByRecipientId = async (recipientId) => {
  try {
    const communications = await Communication.find({
      recipient: recipientId,
    })
      .populate("sender", "fullName")
      .populate("event", "title");

    const communicationDTOs = communications.map((comm) => ({
      message: comm.message,
      senderName: comm.sender.fullName,
      sentAt: comm.sentAt,
      eventTitle: comm.event.title,
    }));

    return communicationDTOs;
  } catch (error) {
    throw new Error("Error retrieving communications: " + error.message);
  }
};

export { getCommunications, getCommunicationsByRecipientId, sendCommunication };
