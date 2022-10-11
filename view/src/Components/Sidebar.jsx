import React, { useEffect } from "react";
import "../Styles/sidebar.css";
import Board from "./Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../features/BoardsSlice";

function Sidebar({ newBoardRef, setBoardName }) {
  const boardsSelector = useSelector((state) => state.boards.boards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const addBoard = () => {
    newBoardRef.current.classList.add("display");
  };

  return (
    <div className='sidebar'>
      <div className='logo'>
        <h1>
          KANBAN<span>TASKS</span>
        </h1>
      </div>
      <div className='boards'>
        <h1>All Boards</h1>
        {boardsSelector.length > 0 &&
          boardsSelector.map((board, index) => {
            return (
              <Board
                board={board}
                key={index}
                active
                setBoardName={setBoardName}
              />
            );
          })}
      </div>
      <div
        onClick={() => {
          addBoard();
        }}
        className='add-board'
      >
        <FontAwesomeIcon icon={faTableList} />
        <h1>create new Board</h1>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
