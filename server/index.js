require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dbConn = require('./config/dbConn');
const app = express();
const cors = require('cors');
const credentials = require('./middlewares/corsMiddleware');
const PORT = process.env.PORT;
// const corsOptions = require('./config/corsOptions');

dbConn();


app.use(credentials);


app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());


const authRouter = require('./routes/auth');
const challengeRouter = require('./routes/challenges');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');
const refreshRouter = require('./routes/refresh');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.use('/auth',authRouter);
app.use('/challenge',challengeRouter);
app.use('/admin',adminRouter);
app.use('/users',userRouter);
app.use('/refresh',refreshRouter);


mongoose.connection.once('open',()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>{
        console.log('server running on port :',PORT);
    })
});
