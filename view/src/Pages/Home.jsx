import React, { useEffect, useRef } from "react";
import "../Styles/home.css";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Todos from "../Components/Todos";
import NewTodo from "../Components/NewTodo";
import NewBoard from "../Components/NewBoard";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../features/TodosSlice";
import { useState } from "react";
import { APIURL } from "../config";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newTodoRef = useRef();
  const newBoardRef = useRef();
  const location = useLocation();
  const boardId = location.pathname.slice(1);
  const boardsSelector = useSelector((state) => state.boards.boards);
  const [boardName, setBoardName] = useState("No Board Selected");

  useEffect(() => {
    if (boardId.length > 0) {
      const boardName = boardsSelector.find((board) => board._id === boardId);
      setBoardName(boardName?.title);
    } else {
      setBoardName("No Board Selected");
    }
  }, [boardId]);

  const logout = async () => {
    const result = await fetch(`${APIURL}/api/auth/logOut`);
    const json = await result.json();
    console.log(json);
    if (json.message === "Successfully logged out") {
      navigate("/welcome");
    }
  };

  const todos = useSelector((state) => state.todos.todos);
  const doing = useSelector((state) => state.todos.doing);
  const done = useSelector((state) => state.todos.done);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch(`${APIURL}/api/auth`);
      const user = await result.json();
      return user;
    };
    fetchUser().then((result) => {
      if (result.message) {
        navigate("/welcome");
      }
    });
  }, []);

  useEffect(() => {
    if (boardId.length > 0) {
      dispatch(getTodos({ boardId: boardId }));
    }
  }, [boardId]);

  const spanRef = useRef();
  const displayTodoForm = () => {
    if (boardId !== "") {
      newTodoRef.current.classList.add("display");
    } else {
      spanRef.current.style.color = "red";
    }
  };

  return (
    <div className='home'>
      <Sidebar newBoardRef={newBoardRef} />
      <div className='todos-home'>
        <div className='header'>
          <h1>{boardName}</h1>
          <div>
            <button
              onClick={() => {
                displayTodoForm();
              }}
            >
              Add new Task
            </button>
            <span style={{ color: "transparent" }} ref={spanRef}>
              Please select or Add a board
            </span>
          </div>
          <button
            id='logout'
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </button>
        </div>
        <div className='todos-list'>
          <Todos todos={todos} title={"Todo"} />
          <Todos todos={doing} title={"Doing"} />
          <Todos todos={done} title={"Done"} />
        </div>
      </div>
      <NewTodo boardId={boardId} newTodoRef={newTodoRef} />
      <NewBoard newBoardRef={newBoardRef} />
    </div>
  );
}

export default Home;
