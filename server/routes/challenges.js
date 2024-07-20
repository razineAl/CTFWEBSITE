const express = require('express');
const Challenge = require('../model/Challenge');
const router = express.Router();
const validateToken = require('../middlewares/authMiddleware');
const User = require('../model/User');

router.get('/all',validateToken,async(req,res)=>{
    const challenges = await Challenge.find();
    res.json(challenges);
});

router.get('/:id',validateToken,async(req,res)=>{
    const id = req.params.id;

    const challenge = await Challenge.findById(id);

    res.json(challenge);
});


router.get('/newest/:number',async(req,res)=>{
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        return res.status(400).json("not a number");
    }
    try {
        const challenges = await Challenge.find()
        .sort({_id:-1})
        .limit(number);
        res.json(challenges);
    } catch (error) {
        return res.status(500).json("some error occured in the server-side");
    }   
})



router.get('/category/:category',validateToken,async(req,res)=>{

    const category = req.params.category;

    const challenges = await Challenge.find({category:category});

    res.json(challenges);
});

router.get('/difficulty/:difficulty',validateToken,async(req,res)=>{

    const difficulty = req.params.difficulty;

    const challenges = await Challenge.find({difficulty:difficulty});

    res.json(challenges);
});

router.put('/submit/:challengeId/:userId',async (req,res)=>{
    const {flag} = req.body;
    if(!req.params.challengeId) return res.sendStatus(400);
    if(!req.params.userId) return res.sendStatus(400);


    const challenge = await Challenge.findById(req.params.challengeId);

    if (!challenge) return res.json('no such challenge');

    if (challenge.flag !== flag) return res.json({err:"the flag isn't correct !"}); 

    const currentUser = await User.findById(req.params.userId);

    if (challenge.solves.includes(currentUser._id) || currentUser.challenges.includes(challenge._id)) return res.json("challenge already solved"); 
    
    
    challenge.solves = [...challenge.solves,currentUser._id];
    const newChallenge = await challenge.save();
    currentUser.points += challenge.points;
    currentUser.challenges = [...currentUser.challenges,req.params.challengeId];  
    await currentUser.save();
    return res.json("successful");

});


module.exports = router;

/**/