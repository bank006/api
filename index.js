import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import MemberRoutes from "./router/routerUser.js";
import BookingRoutes from "./router/routerBooking.js"
import bodyParser from "body-parser";
import barberRouter from "./router/routerBarber.js";
dotenv.config();
connectDB();

const app = express();
const { PORT } = process.env;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", //หน้าบ้าน
      "http://localhost:5174", //หลังบ้าน
      "http://localhost:5175", //หลังบ้าน
      "http://localhost:3000" //หลังบ้าน
    ],
    credentials: true,
  })
);

app.use("/api", MemberRoutes);
app.use("/api", barberRouter);
app.use("/api", BookingRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
  console.log(`http://localhost:${PORT}`);
});
