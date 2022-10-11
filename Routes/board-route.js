const express = require("express");
const route = express.Router();

const {
  getBoards,
  addBoard,
  deleteBoard,
  updateBoard,
} = require("../Controller/board-controllers");

route.get("/", (req, res) => {
  const userId = req.user._id;

  res.json({ userId, message: "boards route woorking fine" });
});

route.get("/allBoards", getBoards);
route.post("/addBoard", addBoard);
route.delete("/deleteBoard/:id", deleteBoard);
route.patch("/updateBoard/:id", updateBoard);

module.exports = route;
