import {Router} from 'express'
import authenticateToken from '../middleware/authMiddleware.js';
import TicketService from '../controller/ticketController.js';

const router = Router()

router.post('/register/:eventId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { eventId } = req.params;
        const ticketDTO = req.body;

        const ticketResponse = await TicketService.registerAttendee(eventId, userId, ticketDTO);

        return res.status(ticketResponse.statusCode).json(ticketResponse);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to register attendee', error: error.message });
    }
});

router.get('/attendees/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendees = await TicketService.getAttendeeList(eventId);

        return res.status(200).json(attendees);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve attendees list', error: error.message });
    }
});


router.get('/ticket-sales/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const ticketSalesDTO = await TicketService.getTicketSales(eventId);

        return res.status(200).json(ticketSalesDTO);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve ticket sales', error: error.message });
    }
});

router.get('/attendee-events', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; 
        const eventResponse = await TicketService.getEventsByUserAsAttendee(userId);

        return res.status(eventResponse.statusCode).json(eventResponse);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve attendee events', error: error.message });
    }
});

export default router
