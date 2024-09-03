import { Router } from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { createFeedback, getFeedbackByEventId } from "../controller/userFeedbackController.js";

const router = Router();

router.post("/create/:eventId", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;
  const feedbackDTO = req.body;

  try {
    const response = await createFeedback(userId, eventId, feedbackDTO);
    res.status(response.responseStatus).json(response);
  } catch (error) {
    res.status(500).json({
      responseStatus: 500,
      responseMessage: "Internal Server Error",
      error: error.message,
    });
  }
});

router.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  try {
    const response = await getFeedbackByEventId(eventId);
    res.status(response.responseStatus).json(response);
  } catch (error) {
    res.status(500).json({
      responseStatus: 500,
      responseMessage: "Internal Server Error",
      error: error.message,
    });
  }
});

export default router;
