import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './components/db.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.get("/" , (req, res) => {
    return res.status(200).json({ 
        message: 'Backend works',
        success: true 
    });
})

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});