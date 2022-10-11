const Board = require("../Models/Board");
const Todo = require("../Models/Todo");
const User = require("../Models/User");

exports.getTodos = async (req, res) => {
  const userId = req.user._id;

  try {
    const todos = await Todo.find({ userId: userId });
    res.json(todos);
  } catch (error) {
    res.status(400).json({ message: "we can't get your todos" });
  }
};

exports.getTodosByBoardId = async (req, res) => {
  const boardId = req.params.boardId;
  console.log(boardId);
  try {
    const todos = await Todo.find({ boardId: boardId });
    res.json(todos);
  } catch (error) {
    console.log("No todos to show");
  }
};

exports.addTodo = async (req, res) => {
  const { title, description, status, boardId } = req.body;

  const userId = req.user._id;

  console.log(title, description, status, boardId);

  const newTodo = new Todo({
    title: title,
    description: description,
    status: status,
    userId: userId,
    boardId: boardId,
  });

  try {
    const board = await Board.findById(boardId);
    const todo = await newTodo.save();
    const user = await User.findById(userId);
    user.todos.push(todo);
    board.todos.push(todo);
    await user.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "we couldn't add your todo" });
  }
};
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Todo.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: "can't delete" });
  }
};
exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const body = req.body;

  try {
    const updated = await Todo.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: "we couldn't update" });
  }
};
