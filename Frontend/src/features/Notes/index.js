import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_url = "http://localhost:5000/notes";

export const fetchNotes = createAsyncThunk(
  "Fetching Notes",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get(API_url);
      return await responce.json();
    } catch (error) {
      return rejectWithValue(error.responce.data || "something went wrong");
    }
  }
);

const noteSlice = createSlice({
  name: "Notes",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        (state.isError = false), (state.isLoading = true);
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        (state.isError = false),
          (state.isLoading = false),
          (state.data = action.payload);
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        (state.isError = true),
          (state.data = action.payload),
          (state.isLoading = false);
      });
  },
});

export default noteSlice.reducer;
