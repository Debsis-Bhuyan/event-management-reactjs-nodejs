import { Router } from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  getCommunications,
  getCommunicationsByRecipientId,
  sendCommunication,
} from "../controller/CommunicationController.js";

const router = Router();

// POST /api/events/:eventId/communicate
router.post("/communicate/:eventId", authenticateToken, async (req, res) => {
  const { eventId } = req.params;
  const { recipientId } = req.query;
  const { message } = req.body;

  try {
    const currentUser = req.user; // From `verifyUser` middleware

    const response = await sendCommunication(
      eventId,
      currentUser.id,
      recipientId,
      message
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 500, message: "Server Error: " + error.message });
  }
});

// GET /api/events/:eventId/communications/:senderId
router.get("/:eventId/communications/:senderId", async (req, res) => {
  const { eventId, senderId } = req.params;

  try {
    const communications = await getCommunications(eventId, senderId);
    return res.status(200).json(communications);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve communications: " + error.message });
  }
});

// GET /api/events/recipient
router.get("/recipient", authenticateToken, async (req, res) => {
  try {
    const currentUser = req.user;
    const communications = await getCommunicationsByRecipientId(currentUser.id);
    return res.status(200).json(communications);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve communications: " + error.message });
  }
});

export default router;
