const express = require('express');
const User = require('../model/User');
const validateToken = require('../middlewares/authMiddleware');
const router = express.Router();
const bcrypt = require('bcrypt');



router.get('/', async (req,res)=>{
    const users = await User.find();
    res.json(users);
});


router.get('/byId/:id',validateToken ,async (req,res)=>{
    const user = await User.findOne({_id:req.params.id});
    res.json(user);
});

router.get('/challengeId/:challenge',validateToken, async (req,res)=>{
    const challenge = req.params.challenge;
    const users = await User.find();
    const SolvedUsers = users.filter(user=>{user.challenges.includes(challenge)}); 
    res.json(SolvedUsers);
});

router.get('/top/:number',validateToken,async (req,res)=>{
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        return res.status(400).json("not a number !");
    }
    try {
        const users = await User.find()
        .sort({points:-1})
        .limit(number);
        res.json(users);

    } catch (error) {
        res.status(500).json("some error occured in the backend !");
    }
});

router.get('/newest/:number',validateToken,async (req,res)=>{
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        return res.status(400).json("not a number !");
    }
    try {
        const users = await User.find()
        .sort({creationDate:-1})
        .limit(number);
        res.json(users);

    } catch (error) {
        res.status(500).json("some error occured in the backend !");
    }
});


router.put('/update/username/:userID', validateToken, async (req, res) => {
    try {
        const userID = req.params.userID;
        const { username } = req.body;

        
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: "Invalid username" });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.username = username;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/validity/username', async (req, res) => {
    try {
        const { username } = req.body;

        
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: "Invalid input" });
        }

        const user = await User.findOne({username:username});
        if (!user) {
            return res.status(200).json({validity:true});
        }
        return res.status(200).json({validity:false});

        
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/password/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const password = req.body.currentPassword; 
        const firstPass  = req.body.newPassword;
        const secondPass  = req.body.passwordConfirmation;

        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!firstPass || !secondPass || typeof firstPass !== 'string' || typeof secondPass !== 'string') {
            return res.status(400).json({error:'some information missing or unexpected'});
        }

        if (firstPass !== secondPass) {
            return res.status(400).json({error:'the two passwords have to be equal !'});
        }

        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            return res.status(403).json({error:'invalid password'});
        }


        const newHashedPwd = await bcrypt.hash(firstPass,10);
        user.password = newHashedPwd;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put('/account/delete/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const password = req.body.account; 


        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!password || typeof password !== 'string') {
            return res.status(400).json({error:'invalid password !'});
        }


        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            return res.status(403).json({error:'invalid password'});
        }


        await User.deleteOne(user);


        res.json('deleted with success');
    } catch (error) {
        console.error("Error updating Password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;


