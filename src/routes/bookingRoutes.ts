import { Router } from 'express';
import { bookingController } from '../controllers/bookingController';
import { validateBody } from '../middlewares/validateRequest';
import { createBookingSchema, updateStatusSchema } from '../schemas/bookingSchemas';

const router = Router();

router.get('/bookings', bookingController.getBookings.bind(bookingController));
router.get('/bookings/availability', bookingController.getAvailability.bind(bookingController));
router.get('/bookings/:id', bookingController.getBookingById.bind(bookingController));
router.post('/bookings', validateBody(createBookingSchema), bookingController.createBooking.bind(bookingController));
router.patch('/bookings/:id/status', validateBody(updateStatusSchema), bookingController.updateStatus.bind(bookingController));
router.post('/bookings/:id/cancel', bookingController.cancelBooking.bind(bookingController));

export default router;
