import React, { useState } from 'react'

function Registration() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConf,setPasswordConf] = useState('');
    const [authentic,setAuthentic] = useState(false);
    

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handlePasswordConfirmation = (e)=>{
        setPasswordConf(e.target.value);
    }


  return (
    <div id='registration-page'>
        <main id='main1'>
        <div>
      <h1>Registration</h1>
      <p>Please enter your information, All the fields are required.</p>
    </div>
    <form action="">
      <div>
        <label for="name">Username</label>
        <input type="text" name="name" value={username} onChange={(e)=>{setUsername(e.target.value)}} id="name" tabIndex="1" placeholder="e.g. John Doe" required/>
      </div>
      <div>
        <label for="email">Email Address</label>
        <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" tabIndex="2" placeholder="e.g. johndoe@lorem.com" required/>
      </div>
      <div>
        <label for="passw">Password</label>
        <input type="password" name="passw" value={password} onChange={(e)=>{handlePassword(e)}} tabIndex="3" id="passw" required/>
      </div>
      <div>
        <label for="passwc">Confirm Password</label>
        <p className={password === '' || passwordConf === '' ? 'hide' : password !== passwordConf ? 'error-msg' : 'hide'}>The password and password confirmation must be identical</p>
        <input type="password" className={password === '' || passwordConf === '' ? '' : password === passwordConf ? 'validInput' : 'invalid'} tabIndex="4" name="passc" value={passwordConf} onChange={(e)=>{handlePasswordConfirmation(e)}}  id="passc" required/>
      </div>
    </form>
    <div>
        {
            true && (
                <button type='submit'>Sign up</button>
            )
        }
        
    </div>
        </main>
    </div>
  )
}

export default Registration
