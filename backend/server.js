// Central Server

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { setupSocket } = require("./socketController");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://furrfriends.alexlevkov.com",
    "https://weightwin.alexlevkov.com",
    "https://codesync.alexlevkov.com",
    "https://code-sync-app.onrender.com",
  ],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";

const session = expressSession({
  name: "connect.sid",
  secret: "coding is amazing",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction ? true : "", // https only
    domain: isProduction ? ".alexlevkov.com" : "",
    sameSite: isProduction ? "none" : "",
    httpOnly: true,
    path: "/",
  },
});

const userRoutes = require("./ff/routes/userRoutes");
const petRoutes = require("./ff/routes/petRoutes.js");
const authRoutes = require("./ff/routes/authRoutes.js");
const orderRoutes = require("./ff/routes/orderRoutes.js");

server.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`);
});

app.use(cors(corsOptions));
app.use(session);
app.use(express.json());

//ff
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/order", orderRoutes);

setupSocket(io);
