const express = require('express');
const Challenge = require('../model/Challenge');
const router = express.Router();
const validateToken = require('../middlewares/authMiddleware');

router.get('/all',validateToken,async(req,res)=>{
    const challenges = await Challenge.find();
    res.json(challenges);
});

router.get('/:id',validateToken,async(req,res)=>{
    const id = req.params.id;

    const challenge = await Challenge.findById(id);

    res.json(challenge);
});



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

router.post('/submit/:id',validateToken,async (req,res)=>{
    const flag = req.body;

    const challenge = Challenge.findById(req.params.id);

    if (challenge.flag === flag) return res.send('well done !');
    
    else return res.json({err:'wrong answer !'});
});


module.exports = router;

/**/