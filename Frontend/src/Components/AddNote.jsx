
// AddNote.jsx - Form to create or update notes
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNote, updateNote } from "../features/Notes";

const AddNote = ({ editingNote, setEditingNote }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    files: null,
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        tags: editingNote.tags.join(", "),
        files: null,
      });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("tags", JSON.stringify(formData.tags.split(", ")));
    if (formData.files) {
      Array.from(formData.files).forEach((file) => data.append("files", file));
    }
    if (editingNote) {
      dispatch(updateNote({ id: editingNote._id, data }));
      setEditingNote(null);
    } else {
      dispatch(createNote(data));
    }
    setFormData({ title: "", content: "", tags: "", files: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input type="file" name="files" multiple onChange={handleFileChange} />
      <button type="submit">{editingNote ? "Update Note" : "Create Note"}</button>
    </form>
  );
};

export default AddNote;
