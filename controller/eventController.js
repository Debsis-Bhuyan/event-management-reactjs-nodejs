import Event from "../model/eventModel.js";
import User from "../model/userModel.js";
import TicketPricing from "../model/ticketPricingModel.js";
import EventException from "../exception/EventException.js";
import UserException from "../exception/UserException.js";

async function createEvent(eventDTO, userId) {
  try {
    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new EventException("User not found");
    }

    const event = new Event({
      title: eventDTO.title,
      description: eventDTO.description,
      location: eventDTO.location,
      startTime: eventDTO.startTime,
      endTime: eventDTO.endTime,
      capacity: eventDTO.capacity,
      organizer: organizer._id,
      ticketPricing: eventDTO.ticketPricing
        ? await TicketPricing.create(eventDTO.ticketPricing)
        : null,
    });

    const savedEvent = await event.save();

    return {
      statusCode: 201,
      message: "Event created successfully",
      event: savedEvent,
    };
  } catch (error) {
    return {
      statusCode: error instanceof EventException ? 400 : 500,
      message: error.message || "Event creation failed",
    };
  }
}

async function getAllUserEvents(userId) {
  try {
    const events = await Event.find({ organizer: userId });
    return {
      statusCode: 200,
      message: "User data retrieved successfully",
      events,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: error.message || "Error getting user events",
    };
  }
}

async function findEventById(eventId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new EventException(`Event not found with this eventId: ${eventId}`);
    }
    const organiserData = await User.findById(event.organizer._id);
    const eventTiketData = await TicketPricing.findById(
      event.ticketPricing._id
    );

    event.organizer = organiserData;
    event.ticketPricing = eventTiketData;

    return {
      statusCode: 200,
      message: "Event retrieved successfully",
      event,
    };
  } catch (error) {
    return {
      statusCode: error instanceof EventException ? 400 : 500,
      message: error.message || "Server error",
    };
  }
}

async function deleteEventById(userId, eventId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new UserException(`User not found with ID: ${userId}`);
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new EventException(`Event not found with ID: ${eventId}`);
    }

    await Event.findByIdAndDelete(eventId);

    return {
      statusCode: 200,
      message: "Event deleted successfully",
    };
  } catch (error) {
    return {
      statusCode:
        error instanceof EventException || error instanceof UserException
          ? 400
          : 500,
      message: error.message || "Event deletion failed",
    };
  }
}

async function updateEventById(userId, eventId, eventDetails) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new UserException(`User not found with ID: ${userId}`);
    }

    let event = await Event.findById(eventId);
    if (!event) {
      throw new EventException(`Event not found with ID: ${eventId}`);
    }

    event.title = eventDetails.title;
    event.description = eventDetails.description;
    event.location = eventDetails.location;
    event.startTime = eventDetails.startTime;
    event.endTime = eventDetails.endTime;
    event.capacity = eventDetails.capacity;

    if (eventDetails.ticketPricing) {
      const ticketPricingData = await TicketPricing.findById(
        eventDetails.ticketPricing?._id
      );
      // const newPricing = await TicketPricing.create(eventDetails.ticketPricing);
      ticketPricingData.basicPrice = eventDetails.ticketPricing.basicPrice;
      ticketPricingData.standardPrice =
        eventDetails.ticketPricing.standardPrice;
      ticketPricingData.premiumPrice = eventDetails.ticketPricing.premiumPrice;
      await ticketPricingData.save;
      console.log(ticketPricingData);
      event.ticketPricing = ticketPricingData._id;
    }

    event = await event.save();

    return {
      statusCode: 200,
      message: "Event updated successfully",
      event,
    };
  } catch (error) {
    return {
      statusCode:
        error instanceof EventException || error instanceof UserException
          ? 400
          : 500,
      message: error.message || "Event update failed",
    };
  }
}

async function findAllEvents() {
  try {
    const events = await Event.find();
    return {
      statusCode: 200,
      message: "All events retrieved successfully",
      events,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Error retrieving all events",
    };
  }
}

export {
  createEvent,
  getAllUserEvents,
  findEventById,
  deleteEventById,
  updateEventById,
  findAllEvents,
};
