import React, { useState } from 'react';
import axios from 'axios';

function Registration() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConf,setPasswordConf] = useState('');
    const [validUsername,setValidUsername] = useState(false);
    const [authenticUsername,setAuthenticUsername] = useState(true);
    
    const [validEmail,setValidEmail] = useState(false);
    const [readyForm,setReadyForm] = useState(false);
    

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handlePasswordConfirmation = (e)=>{
        setPasswordConf(e.target.value);
    }
    const handleUsername = (e)=>{
      setUsername(e.target.value);
      if (e.target.value.length > 4 && e.target.value.length < 15) {
        setValidUsername(true);
      } else{
        setValidUsername(false);
      }
    }



    const handleEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    
      
      const atIndex = email.indexOf('@');
      if (atIndex > 0 && email.indexOf('.', atIndex) > atIndex + 1) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    };

    const usernameValidity = (e)=>{
      if (username.length > 4 && username.length < 15) {
        axios.post('http://localhost:3001/users/validity/username',{username:username})
        .then((res)=>{
          setAuthenticUsername(res.data.valid)
        })
      }
      
    }



  return (
    <div id='registration-page'>
        <main id='main1'>
        <div>
      <h1>Sign Up</h1>
      <p>Please enter your information, All the fields are required.</p>
    </div>
    <form action="">
      <div>
        <label for="name">Username</label>
        <input type="text" name="name" className={username === '' ? '' : validUsername ? 'validInput' : 'invalid'} value={username} onChange={(e)=>{handleUsername(e)}} id="name" tabIndex="1" placeholder="e.g. John Doe" onBlur={(e)=>{usernameValidity(e)}} required/>
        <p className={username === '' ? 'hide' : !validUsername ? 'error-msg' : 'hide'}>The username must have between 4 and 15 characters</p>
      </div>
      <div>
        <label for="email">Email Address</label>
        <input type="email" name="email" className={email === '' ? '' : validEmail ? 'validInput' : 'invalid'} value={email} onChange={(e)=>{handleEmail(e)}} id="email" tabIndex="2" placeholder="e.g. johndoe@lorem.com" required/>
        {
          email !== '' && !validEmail &&(
          <p className='error-msg'>You must provide an email</p>
          )
        }
      </div>
      <div>
        <label for="passw">Password</label>
        <input type="password" className={password === '' || passwordConf === '' ? '' : password === passwordConf ? 'validInput' : 'invalid'} name="passw" value={password} onChange={(e)=>{handlePassword(e)}} tabIndex="3" id="passw" required/>
      </div>
      <div>
        <label for="passwc">Confirm Password</label>
        <input type="password" className={password === '' || passwordConf === '' ? '' : password === passwordConf ? 'validInput' : 'invalid'} tabIndex="4" name="passc" value={passwordConf} onChange={(e)=>{handlePasswordConfirmation(e)}}  id="passc" required/>
        <p className={password === '' || passwordConf === '' ? 'hide' : password !== passwordConf ? 'error-msg' : 'hide'}>The password and the confirmation must be identical</p>
      </div>
    </form>
    <div>
        {
            password !== '' && (
                <button type='submit'>Sign up</button>
            )
        }
        
    </div>
        </main>
    </div>
  )
}

export default Registration
