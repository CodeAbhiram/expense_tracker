// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
const port = process.env.PORT || 5000;

// Connect to local MongoDB
connectDB();

// ------------------ CORS ------------------ //
// Allow requests from React frontend
const allowedOrigins = ["http://localhost:3000","https://expense-tracker-3-ezv2.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/curl
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS error: This origin is not allowed"), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies if using sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// ---------------- Middleware ---------------- //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// ---------------- Routes ---------------- //
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

// ---------------- Start Server ---------------- //
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
