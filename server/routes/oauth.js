const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library'); 


async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log('data : ',data);
}


router.get('/',async (req,res)=>{
    
    const code = req.query.code;

    try {
        const redirectUrl = 'http://127.0.0.1:3000/oauth';
    
        const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,process.env.CLIENT_SECRET,redirectUrl)
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('tokens acquired');
        const user = await oAuth2Client.credentials;
        console.log('credentials',user)
        await getUserData(user.access_token);
    } catch (error) {
        console.log('Error with signing in with google : ',error);
        
    }


    



    res.json({url:authorizeUrl});

});
router.post('/',async (req,res)=>{
    res.header('Referrer-Policy','no-referrer-when-downgrade'); // remove this line of code when moving to https 


    const redirectUrl = 'http://127.0.0.1:3000/oauth';
    
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,process.env.CLIENT_SECRET,redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type:'offline',
        scope:'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt:'consent'
    })

    res.json({url:authorizeUrl});

});
module.exports = router;