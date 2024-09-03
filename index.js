// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
const app = express();


const frontendUrl = 'http://localhost:5173';


const corsOptions = {
  origin: frontendUrl,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// import errorHandler from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(errorHandler);

import connectDB from "./config/dbConfig.js";
connectDB();

import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import CommunicationRoute from "./routes/communicationRoute.js";
import UserFeedback from "./routes/userFeedbackRoute.js";
import TicketRoute from "./routes/ticketRoute.js";

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/message", CommunicationRoute);
app.use("/api/userfeedback", UserFeedback);
app.use("/api/ticket", TicketRoute);



app.get("/", (req, res) => {
  res.send("Event Management System API");
});

app.listen(port, () => {
  console.log(`Server running on port- http://localhost:${port}`);
});
