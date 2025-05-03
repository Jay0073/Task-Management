const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDatabase = require('./config/database');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Define a basic route
app.get('/', (req, res) => {
  res.send('Task Management Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});