const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDatabase = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDatabase();

// Route files
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Set to your frontend URL (NO '*')
  credentials: true  // Allow cookies & auth headers
}));


// Set static folder
app.use(express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

// 404 routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});