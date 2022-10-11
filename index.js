const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoute = require("./Routes/auth-route");
const todosRoute = require("./Routes/todos-route");
const boardsRoute = require("./Routes/board-route");
const { authentication } = require("./utils/middlewares");
const app = express();
const PORT = process.env.PORT;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/todos", authentication, todosRoute);
app.use("/api/boards", authentication, boardsRoute);

app.use(express.static(path.join(__dirname, "/view/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/view/build", "index.html"));
});

//Listen Server and Connect to database
mongoose.connect(MONGODB_CLUSTER, () => {
  console.log("Mongo connected");
});
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
