//// đặt chỗ 
import mongoose from'mongoose';

const reservationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  number_of_people: { type: Number, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;