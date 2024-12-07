import express from 'express';
import { createReservation, getUserReservations, deleteReservation } from '../controllers/reservationController.mjs';  // Đảm bảo đường dẫn đúng
import authMiddleware from '../middleware/accountMiddleware.mjs';  // Đảm bảo đường dẫn đúng

const router = express.Router();

// Các route cho đặt chỗ
router.post('/', authMiddleware, createReservation);
router.get('/', authMiddleware, getUserReservations);
router.delete('/:id', authMiddleware, deleteReservation);

export default router;

