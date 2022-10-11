import React from "react";
import "../Styles/todos.css";
import Todo from "./Todo";
function Todos({ title, todos }) {
  return (
    <div className='todos'>
      <h1 className='title'>
        <span
          style={{
            backgroundColor:
              title === "Todo"
                ? "#49C3EB"
                : title === "Doing"
                ? "#846FF8"
                : title === "Done"
                ? "#5FE4AC"
                : "white",
          }}
        ></span>
        {title}
      </h1>
      {todos.map((todo) => {
        return <Todo todo={todo} title={title} />;
      })}
    </div>
  );
}

export default Todos;
