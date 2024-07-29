require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dbConn = require('./config/dbConn');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;


dbConn();



const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3000/home'],
    credentials: true, 
  };


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));



const authRouter = require('./routes/auth');
const challengeRouter = require('./routes/challenges');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');
const refreshRouter = require('./routes/refresh');
const logoutRouter = require('./routes/logout');




app.use('/auth',authRouter);
app.use('/challenge',challengeRouter);
app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.use('/refresh',refreshRouter);
app.use('/logout',logoutRouter);


mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>{
        console.log('server running on port :',PORT);
    })
});
