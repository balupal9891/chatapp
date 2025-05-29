import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import connectToMongo from './db/connectToMongo.js';
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import { server,app } from './socket/socket.js';
dotenv.config();

const __dirname = path.resolve();
// const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res)=>{
//     res.send("hello world");
// })

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT || 5000 , ()=>{
    connectToMongo();
    console.log("server is running on 5000");
});

