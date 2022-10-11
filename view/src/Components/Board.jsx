import React, { useRef } from "react";
import "../Styles/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { deleteBoard } from "../features/BoardsSlice";
import { useDispatch } from "react-redux";

function Board({ board, key, active }) {
  const boardRef = useRef();
  const linkRef = useRef();

  const dispatch = useDispatch();

  const deleteBoard_ = () => {
    dispatch(deleteBoard(board._id));
  };

  return (
    <div className='board' ref={boardRef}>
      <FontAwesomeIcon icon={faTableList} />
      <Link to={`/${board._id}`} className='tags' ref={linkRef}>
        <h2>{board.title}</h2>
      </Link>
      <FontAwesomeIcon
        icon={faMinus}
        style={{ marginLeft: "auto", color: "#e60e56" }}
        onClick={() => {
          deleteBoard_();
        }}
      />
    </div>
  );
}

export default Board;
