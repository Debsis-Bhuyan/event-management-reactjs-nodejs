import { Router } from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  createEvent,
  deleteEventById,
  findAllEvents,
  findEventById,
  getAllUserEvents,
  updateEventById,
} from "../controller/eventController.js";

const router = Router();

router.post("/create-event", authenticateToken, async (req, res) => {
  try {
    const eventDTO = req.body;
    const currentUser = req.user.id;
    const newEvent = await createEvent(eventDTO, currentUser);

    res.status(newEvent.statusCode).json(newEvent);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while creating event",
        error: error.message,
      });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const eventList = await findAllEvents();
    res.status(200).json(eventList);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while fetching all events",
        error: error.message,
      });
  }
});

router.get("/get-events", authenticateToken, async (req, res) => {
  try {
    const currentUser = req.user.id;
    const response = await getAllUserEvents(currentUser);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while fetching user events",
        error: error.message,
      });
  }
});

router.get("/get-event/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await findEventById(eventId);
    res.status(event.statusCode).json(event);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while fetching event by ID",
        error: error.message,
      });
  }
});

router.put("/update/:eventId", authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventDetails = req.body;
    const currentUser = req.user.id;

    const updatedEventResponse = await updateEventById(
      currentUser,
      eventId,
      eventDetails
    );
    res.status(updatedEventResponse.statusCode).json(updatedEventResponse);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while updating event",
        error: error.message,
      });
  }
});

router.delete("/delete/:eventId", authenticateToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const currentUser = req.user.id;

    const deleteResponse = await deleteEventById(currentUser, eventId);
    res.status(deleteResponse.statusCode).json(deleteResponse);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error occurred while deleting event",
        error: error.message,
      });
  }
});

export default router;
