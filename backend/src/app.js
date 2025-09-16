const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const googleAuthRoutes = require('./routes/oauth.routes'); // ✅ import Google auth routes
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
}));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/oauth', googleAuthRoutes); // ✅ Mount Google auth router

module.exports = app;
