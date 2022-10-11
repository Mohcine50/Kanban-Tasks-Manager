const express = require("express");
const route = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodosByBoardId,
} = require("../Controller/todo-controllers");

route.get("/", (req, res) => {
  const userId = req.user._id;

  res.json({ userId });
});
route.get("/allTodos/:boardId", getTodosByBoardId);
route.post("/addTodo", addTodo);
route.delete("/deleteTodo/:id", deleteTodo);
route.patch("/updateTodo/:id", updateTodo);

module.exports = route;
