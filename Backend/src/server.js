import app from "./index.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
