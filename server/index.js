const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Product Manager' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    role
  };
  
  res.status(201).json(newUser);
});

app.get('/api/stats', (req, res) => {
  const stats = {
    totalUsers: 3,
    activeProjects: 5,
    completedTasks: 42,
    serverTime: new Date().toISOString()
  };
  res.json(stats);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
