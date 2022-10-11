import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../Styles/newTodo.css";
import { addTodos } from "../features/TodosSlice";
function NewTodo({ newTodoRef, boardId }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("Todo");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(addTodos({ title, description, status, boardId }));
    setTitle("");
    setDescription("");
    setStatus("Todo");
  };

  const removeTodoForm = () => {
    newTodoRef.current.classList.remove("display");
  };

  return (
    <div ref={newTodoRef} className='newTodo'>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type='text'
          placeholder='e.g. Take coffe break'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>Description</label>
        <textarea
          id='description'
          type='text'
          placeholder='e.g. Take coffe break, and do something'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <label>Status</label>
        <select
          name='status'
          id='status'
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          value={status}
        >
          <option value='Todo'>Todo</option>
          <option value='Doing'>Doing</option>
          <option value='Done'>Done</option>
        </select>
        <button
          onClick={() => {
            removeTodoForm();
          }}
          type='submit'
        >
          Create Task
        </button>
        <button
          id='cancel'
          type='cancel'
          onClick={() => {
            newTodoRef.current.classList.remove("display");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewTodo;
