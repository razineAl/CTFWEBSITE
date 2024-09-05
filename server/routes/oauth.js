const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library'); 



router.post('/',async (req,res)=>{
    res.header('Referrer-Policy','no-referrer-when-downgrade'); // remove this line of code when moving to http 

})
module.exports = router;