import express from "express";
import path from "path";
import "dotenv/config";
import authRouter from "./routes/authRouter.mjs"
import serviceRouter from "./routes/serviceRouter.mjs";
import reservationRouter from "./routes/reservationRouter.mjs";

import  connectDB from './config/connectDB.mjs';

// import expressLayouts from "express-ejs-layouts";
connectDB();
import { fileURLToPath } from "url";
import session from "express-session";
// Định nghĩa __dirname để sử dụng với module ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.listen(8000);
// Cấu hình đường dẫn tới các file tĩnh
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

// app.use(expressLayouts);
// // app.set("layout", "layout"); // Chỉ định file layout.ejs làm layout mặc định
// app.set("layout", "./layouts/layout");

// Cấu hình view engine là EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// miiddleware to parse JSON data in the request body
app.use(express.json());
// Sử dụng express để phân tích URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use('/auth', authRouter);
app.use('/services', serviceRouter);
app.use('/reservations', reservationRouter);

// Trang chủ
app.get('/', (req, res) => {
  res.render('index');  // Giao diện trang chủ
});

// Trang danh sách dịch vụ
app.get('/services', async (req, res) => {
  const services = await Service.find();
  res.render('services', { services });
});

// Trang đăng ký
app.get('/register', (req, res) => {
  res.render('register');
});

// Trang đăng nhập
app.get('/login', (req, res) => {
  res.render('login');
});

// Trang danh sách đặt chỗ
app.get('/reservations', async (req, res) => {
  const reservations = await Reservation.find({ user_id: req.user._id }).populate('service_id');
  res.render('reservations', { reservations });
});

app.listen(2004, () => console.log(`Server running on http://localhost:8000`));
