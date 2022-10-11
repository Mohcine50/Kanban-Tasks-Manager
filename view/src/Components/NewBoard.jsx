import React, { useState } from "react";
import "../Styles/newBoard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBoard } from "../features/BoardsSlice";
import { getBoards } from "../features/BoardsSlice";
import { useDispatch, useSelector } from "react-redux";
function NewBoard({ newBoardRef }) {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const boardAdded = useSelector((state) => state.boards.boardAdded);
  const AddBoard = async () => {
    dispatch(addBoard(title));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    newBoardRef.current.classList.remove("display");
    const result = await AddBoard();
    setTitle("");
  };
  return (
    <div ref={newBoardRef} className='newBoard'>
      <h1>Add New Board</h1>
      <form onSubmit={handleSubmit}>
        <label>Titile</label>
        <input
          type='text'
          placeholder='Board Name'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button type='submit'>Create Board</button>
        <button
          id='cancel'
          type='cancel'
          onClick={() => {
            newBoardRef.current.classList.remove("display");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewBoard;
