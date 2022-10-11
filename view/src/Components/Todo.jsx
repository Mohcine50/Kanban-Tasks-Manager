import React from "react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "../Styles/todo.css";
import { faX, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeTodo, updateTodo } from "../features/TodosSlice";
import { useEffect } from "react";
function Todo({ todo, title }) {
  const descRef = useRef();

  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();
  const showDesc = () => {
    if (display === "none") {
      descRef.current.style.display = "block";
      setDisplay("block");
    } else {
      descRef.current.style.display = "none";
      setDisplay("none");
    }
  };

  const removeTodo_ = () => {
    dispatch(removeTodo(todo._id));
  };
  const status = ["Todo", "Doing", "Done"].filter((statu) => statu !== title);

  const [newStatus, setNewStatus] = useState("newStats");

  useEffect(() => {
    if (newStatus !== "newStats") {
      dispatch(
        updateTodo({ status: newStatus, id: todo._id, prevStatus: todo.status })
      );
    }
  }, [newStatus]);

  return (
    <div className='todo'>
      <div>
        <h1
          onClick={() => {
            showDesc();
          }}
        >
          {todo.title}
        </h1>
        <FontAwesomeIcon
          icon={faX}
          style={{ cursor: "pointer", color: "#e60e56" }}
          onClick={() => {
            removeTodo_();
          }}
        />

        <select
          name='status'
          id='status'
          title='Status'
          onChange={(e) => {
            if (e.target.value !== "STATUS") {
              setNewStatus(e.target.value);
            }
          }}
        >
          <option default>STATUS</option>
          {status.map((statu) => {
            return <option value={statu}>{statu}</option>;
          })}
        </select>
      </div>
      <h2 ref={descRef}>{todo.description}</h2>
    </div>
  );
}

export default Todo;
