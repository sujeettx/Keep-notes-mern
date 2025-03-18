import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5500/notes";

// Fetch all notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,  // Adding withCredentials: true
      });
      return response.data.data; // Extracting "data" array from API response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create a new note
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, noteData, {
        withCredentials: true,  // Adding withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create note");
    }
  }
);

// Update a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, {
        withCredentials: true,  // Adding withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update note");
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,  // Adding withCredentials: true
      });
      return id; // Returning the deleted note ID
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete note");
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    isLoading: false,
    isError: false,
    notes: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload);
      });
  },
});

export default noteSlice.reducer;
