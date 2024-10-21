import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import  userRoutes from './routes/user.route.js';
// Load environment variables from .env file
import authRoutes from './routes/auth.route.js';
import  postRoutes from'./routes/post.route.js';
import cookieParser from 'cookie-parser'
import cors from "cors"
import commentRoutes from './routes/comment.route.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors)
// Ensure that the MONGO environment variable is available
// app.use(cors({
//     origin: 'http://localhost:3001',  // Add the frontend URL here
//     credentials: true,  // If you're dealing with cookies
//   }));
  
const mongoUri = process.env.MONGO;

if (!mongoUri) {
    console.error("MongoDB connection string is missing in environment variables");
    process.exit(1);  // Exit the app if the connection string is missing
}

// Connect to MongoDB using mongoose without deprecated options
mongoose.connect(mongoUri)
    .then(() => console.log("Database is connected"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);  // Exit the app if the connection fails
    });

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000!!");
});
app.use('/user',userRoutes);
app.use('/auth',authRoutes);
app.use('/post',postRoutes);
app.use('/comment',commentRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });




