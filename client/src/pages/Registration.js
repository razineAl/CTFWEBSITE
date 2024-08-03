import React from 'react'

function Registration() {
  return (
    <div id='registration-page'>
        <main id='main1'>
        <div>
      <h1>Registration</h1>
      <p>Please provide your name, email address, and phone number</p>
    </div>
    <form action="">
      <div>
        <label for="name">Username</label>
        <p class="error-msg hide">this field is required</p>
        <input type="text" name="name" id="name" placeholder="e.g. Stephen King" required/>
      </div>
      <div>
        <label for="email">Email Address</label>
        <p class="error-msg hide">this field is required</p>
        <input type="email" name="email" id="email" placeholder="e.g. stephenking@lorem.com" required/>
      </div>
      <div>
        <label for="phone">Phone Number</label>
        <p class="error-msg hide">this field is required</p>
        <input type="tel" name="phone" id="phone" placeholder="e.g. +1 234 567 890" required/>
      </div>
    </form>
        </main>
    </div>
  )
}

export default Registration
