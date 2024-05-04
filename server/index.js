const express = require('express');
const app = express();
const userRoutes = require('./User/user.routes');
const messageRoutes = require('./Message/message.routes');
const { Server } = require("socket.io");


// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
