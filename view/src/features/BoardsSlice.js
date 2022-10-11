import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURL } from "../config";

export const getBoards = createAsyncThunk(
  "boards/getBoards",

  async (thunkAPI) => {
    const result = await fetch(`${APIURL}/api/boards/allBoards`);
    const boards = await result.json();
    return boards;
  }
);

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (title, thunkApi) => {
    const result = await fetch(`${APIURL}/api/boards/addBoard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
    const board = await result.json();
    return board;
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id, thunkApi) => {
    const result = await fetch(`${APIURL}/api/boards/deleteBoard/${id}`, {
      method: "DELETE",
    });
    const board = await result.json();
    return board;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    boardAdded: false,
  },
  reducers: {},
  extraReducers: {
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload;
    },
    [addBoard.fulfilled]: (state, action) => {
      state.boards.push(action.payload);
    },
    [deleteBoard.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      const updatedBoards = state.boards.filter((board) => board._id !== _id);
      state.boards = updatedBoards;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = boardsSlice.actions;

export default boardsSlice.reducer;
