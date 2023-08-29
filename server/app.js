require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser')
const connectToMongo = require('./db');
const cors = require("cors");

const  userRoutes  = require('./routes/User');
const  authRoutes  = require('./routes/Auth');
const  videoRoutes  = require('./routes/Video');
const  commentRoutes  = require('./routes/Comment');

const app = express()
const port = process.env.PORT;
connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

//Middleware
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))