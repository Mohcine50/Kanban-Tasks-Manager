const Board = require("../Models/Board");
const User = require("../Models/User");
const Todo = require("../Models/Todo");
const { deleteMany } = require("../Models/Board");

exports.getBoards = async (req, res) => {
  const userId = req.user._id;
  const boardId = req.body.boardId;
  try {
    const boards = await Board.find({ userId: userId, boardId: boardId });
    res.json(boards);
  } catch (error) {
    res.status(400).json({ message: "we can't get your boards" });
  }
};
exports.addBoard = async (req, res) => {
  const { title } = req.body;

  const userId = req.user._id;

  const newTodo = new Board({
    title: title,
    userId: userId,
  });

  try {
    const todo = await newTodo.save();

    const user = await User.findById(userId);

    user.boards.push(todo);
    await user.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "we couldn't add your Board" });
  }
};
exports.deleteBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Board.findByIdAndDelete(id);
    await Todo.deleteMany({ boardId: id });
    
    res.json(deleted);
  } catch (error) {
    res.status(400).json({ message: "can't delete" });
  }
};
exports.updateBoard = async (req, res) => {
  const { id } = req.params;

  const body = req.body;

  try {
    const updated = await Board.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: "we couldn't update" });
  }
};
