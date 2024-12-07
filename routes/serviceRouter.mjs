import express from 'express';
const router = express.Router();
import { getServices } from '../controllers/serviceController.mjs';

router.get('/', getServices);

export default router;
