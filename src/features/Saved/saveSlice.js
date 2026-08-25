import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: [],
  status: "idle",
};

const saveSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addToSaved(state, action) {
      state.saved.push(action.payload);
    },
    deleteToSaved(state, action) {
      state.saved = state.saved.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addToSaved, deleteToSaved } = saveSlice.actions;
export default saveSlice.reducer;

export const getSavedMovies = (state) => state.saved.saved;
