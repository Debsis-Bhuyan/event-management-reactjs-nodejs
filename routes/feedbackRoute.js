import {Router} from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getFeedbacksByEventId, getFeedbacksByUserId, submitFeedback } from '../controller/feedbackController.js';

const router = Router();

router.post('/submit/:eventId',authenticateToken , async (req, res) => {
    try {
        const feedbackMessageDTO = req.body;
        const { eventId } = req.params;
        const userId = req.user.id;
        console.log(userId)
        console.log(eventId)

        const response = await submitFeedback(userId, eventId, feedbackMessageDTO);
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message || 'An error occurred while submitting feedback.',
        });
    }
});

router.get('/feed/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const response = await getFeedbacksByEventId(eventId);
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message || 'An error occurred while retrieving feedbacks.',
        });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const response = await getFeedbacksByUserId(userId);
        res.status(response.statusCode).json(response);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message || 'An error occurred while retrieving feedbacks.',
        });
    }
});

export default router;
