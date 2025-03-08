import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }], // Categories/Tags
    images: [{ type: String }], // AWS S3 URLs
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
