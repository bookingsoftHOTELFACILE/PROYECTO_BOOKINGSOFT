import { Router } from 'express';
import { serviceController } from '../controllers/serviceController';
import { validateBody } from '../middlewares/validateRequest';
import { createServiceSchema } from '../schemas/bookingSchemas';

const router = Router();

router.get('/services', serviceController.getServices.bind(serviceController));
router.get('/services/:id', serviceController.getServiceById.bind(serviceController));
router.post('/services', validateBody(createServiceSchema), serviceController.createService.bind(serviceController));

export default router;
