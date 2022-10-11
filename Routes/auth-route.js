const express = require("express");
const route = express.Router();
const { register, login, logOut } = require("../Controller/auth-controllers");
const { authentication } = require("../utils/middlewares");

const cookieParser = require("cookie-parser");
route.use(cookieParser());
route.get("/", authentication, (req, res) => {
  const user = req.user;
  res.json(user);
});

route.post("/register", register);
route.post("/login", login);
route.get("/logOut", logOut);

module.exports = route;
