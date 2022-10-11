import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async ({ boardId }, thunkApi) => {
    const result = await fetch(`/api/todos/allTodos/${boardId}`);
    const todos = await result.json();

    return todos;
  }
);

export const addTodos = createAsyncThunk(
  "todos/addTodo",
  async ({ title, description, status, boardId }, thunkApi) => {
    const result = await fetch("/api/todos/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        boardId,
      }),
    });
    const todo = await result.json();
    return todo;
  }
);
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ status, id, prevStatus }, thunkApi) => {
    const result = await fetch(`/api/todos/updateTodo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });
    const todo = await result.json();
    return { todo, prevStatus };
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id, thunkApi) => {
    const result = await fetch(`/api/todos/deleteTodo/${id}`, {
      method: "DELETE",
    });
    const todo = await result.json();
    return todo;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    doing: [],
    done: [],
  },
  reducers: {},
  extraReducers: {
    [addTodos.fulfilled]: (state, action) => {
      const todo = action.payload;
      if (todo.status === "Todo") {
        state.todos.push(todo);
      } else if (todo.status === "Doing") {
        state.doing.push(todo);
      } else if (todo.status === "Done") {
        state.done.push(todo);
      }
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log(action.payload);
      const todos = action.payload.filter((todo) => todo.status === "Todo");
      const doing = action.payload.filter((todo) => todo.status === "Doing");
      const done = action.payload.filter((todo) => todo.status === "Done");
      state.todos = todos;
      state.doing = doing;
      state.done = done;
    },
    [removeTodo.fulfilled]: (state, action) => {
      const removedTodo = action.payload;
      if (removedTodo.status === "Todo") {
        const todos = state.todos.filter(
          (todo) => todo._id !== removedTodo._id
        );
        state.todos = todos;
      } else if (removedTodo.status === "Doing") {
        const doing = state.doing.filter(
          (todo) => todo._id !== removedTodo._id
        );
        state.done = doing;
      } else if (removedTodo.status === "Done") {
        const done = state.done.filter((todo) => todo._id !== removedTodo._id);
        state.done = done;
      }
    },
    [updateTodo.fulfilled]: (state, action) => {
      const prevStatus = action.payload.prevStatus;
      const _todo = action.payload.todo;
      if (prevStatus === "Todo") {
        const todos = state.todos.filter((todo) => todo._id !== _todo._id);
        state.todos = todos;
        if (_todo.status === "Doing") {
          state.doing.push(_todo);
        } else if (_todo.status === "Done") {
          state.done.push(_todo);
        }
      } else if (prevStatus === "Doing") {
        const doing = state.doing.filter((todo) => todo._id !== _todo._id);
        state.doing = doing;
        if (_todo.status === "Todo") {
          state.todos.push(_todo);
        } else if (_todo.status === "Done") {
          state.done.push(_todo);
        }
      } else if (prevStatus === "Done") {
        const done = state.done.filter((todo) => todo._id !== _todo._id);
        state.done = done;
        if (_todo.status === "Doing") {
          state.doing.push(_todo);
        } else if (_todo.status === "Todo") {
          state.todos.push(_todo);
        }
      }
    },
  },
});

export default todosSlice.reducer;
