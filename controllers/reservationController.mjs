import Reservation from '../models/reservation.mjs';


// Tạo đặt chỗ mới
export const createReservation = async (req, res) => {
    const { service_id, date, time, number_of_people } = req.body;
    try {
      const reservation = new Reservation({
        user_id: req.user._id,
        service_id,
        date,
        time,
        number_of_people,
      });
      await reservation.save();
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: 'Error creating reservation', error });
    }
  };
  
  // Lấy danh sách đặt chỗ của người dùng
  export const getUserReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find({ user_id: req.user._id }).populate('service_id');
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reservations', error });
    }
  };
  
  // Xóa đặt chỗ
  export const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
      const reservation = await Reservation.findByIdAndDelete(id);
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json({ message: 'Reservation deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting reservation', error });
    }
  };
