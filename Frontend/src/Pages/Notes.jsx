// Notes.jsx - Display all notes with Edit & Delete options
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../features/Notes";
import AddNote from "../Components/AddNote";

const Notes = () => {
  const dispatch = useDispatch();
  const { data: notes, isLoading, isError } = useSelector((state) => state.Notes);
  const [editingNote, setEditingNote] = useState(null);
  console.log(notes);
  

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error fetching notes.</p>;

  return (
    <div>
      <h2>Notes</h2>
      <AddNote editingNote={editingNote} setEditingNote={setEditingNote} />
      {notes?.data?.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleEdit(note)}>Edit</button>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
