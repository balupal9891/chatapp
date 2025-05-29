import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import connectToMongo from './db/connectToMongo.js';
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import { server,app } from './socket/socket.js';
dotenv.config();


// const app = express();

app.get('/', (req, res)=>{
    res.send("hello world");
})

app.use(express.json());
app.use(cookieParser());





app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);


server.listen(process.env.PORT || 5000, ()=>{
    connectToMongo();
    console.log("server is running on 5000");
});

