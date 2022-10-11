import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./features/TodosSlice";
import BoardReducer from "./features/BoardsSlice";
export const store = configureStore({
  reducer: {
    todos: TodoReducer,
    boards: BoardReducer,
  },
});
