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



router.get('/solved/category/:userID',async(req,res)=>{

    const user = await User.findOne({_id:req.params.userID});
    


    const challenges = await Challenge.find();
    const usefulChallenges = challenges.filter(challenge=>user.challenges.indexOf(challenge._id)!==-1);


    const categories = {};
    const difficulties = {};

    usefulChallenges.forEach(challenge => {
      const category = challenge.category;
      if (categories[category]) {
        categories[category]++;
      } else {
        categories[category] = 1;
      }
    });
    usefulChallenges.forEach(challenge => {
      const difficulty = challenge.difficulty;
      if (difficulties[difficulty]) {
        difficulties[difficulty]++;
      } else {
        difficulties[difficulty] = 1;
      }
    });

    res.json({categories,difficulties});
});

router.get('/difficulty/:difficulty',validateToken,async(req,res)=>{

    const difficulty = req.params.difficulty;

    const challenges = await Challenge.find({difficulty:difficulty});

    res.json(challenges);
});

router.put('/submit/:challengeId/:userId',validateToken, async (req, res) => {
    const { challengeId, userId } = req.params;
    const  {flag}  = req.body;


    if (!challengeId) return res.status(400).json({ error: 'Challenge ID is required' });
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    try {
        const users = await User.find().sort({points:-1});
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ error: 'No such challenge' });


        const currentUser = await User.findById(userId);
        if (!currentUser) return res.status(404).json({ error: 'User not found' });

    

        if (challenge.flag !== flag) return res.status(200).json({ answer: false });

        

        if (challenge.solves.includes(currentUser._id) || currentUser.challenges.includes(challenge._id)) {
            return res.status(200).json({ error: 'Challenge already solved' });
        }

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            user.ranking = i+1;
            await user.save();
            
        }

        challenge.solves.push(currentUser._id);
        currentUser.points += challenge.points;
        currentUser.challenges.push(challengeId);

        await challenge.save();
        await currentUser.save();

        return res.status(200).json({ answer: true });
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

/**/