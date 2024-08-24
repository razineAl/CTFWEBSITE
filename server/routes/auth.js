const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/register',async (req,res)=>{
    const {email,username,password} = req.body;

    const date = new Date();

    const foundUser = await User.findOne({email:email});

    if (foundUser) return res.json({error:'email already taken'});

    const foundUsername = await User.findOne({username:username});

    if (foundUsername) return res.json({error:'username already taken'});

    const hashedpwd = await bcrypt.hash(password,10);

    const users = await User.find().sort({ranking:-1});


    const user = await User.create({username:username,email:email,password:hashedpwd,creationDate:date,points:0,isPremium:false,ranking:users[0].ranking+1,role:'user'});

    res.json('success');

});

router.post('/login',async (req,res)=>{

    const {email,password} = req.body;

    const user = await User.findOne({email:email});

    if (!user) return res.status(404).json({error:'there is no user with this email !'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(403).json({error:'invalid email or password '});

    
    const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
    const refreshToken = jwt.sign({username:user.username,id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

    user.refreshToken = refreshToken;
    await user.save();

    
    res.cookie('jwt',refreshToken,{ httpOnly:true,maxAge:1000*3600*24,sameSite:'none',secure:true});

    res.json({refreshToken:refreshToken,accessToken:accessToken,username:user.username,id:user._id,role:user.role});


});

module.exports = router;