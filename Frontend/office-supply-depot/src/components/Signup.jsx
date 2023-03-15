import React from 'react'
import "./login.css"
import "./signup.css"
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div>
        <h1 className='signup-title'>Create your Account</h1>
        <img src={require('../images/logo.png')} className="logo-image"/>
        <form className="login-container">
          <h1>Sign Up</h1>
          <label>Last Name</label>
          <input type="text" className="input-field" placeholder='Last Name'/>
          <label>First Name</label>
          <input type="text" className="input-field" placeholder='First Name'/>
          <label>Email</label>
          <input type="email" className="input-field" placeholder='Email'/>
          <label>Password</label>
          <input type="password" className="input-field" placeholder='Password'/>
          <label>Confirm Password</label>
          <input type="password" className="input-field" placeholder='Confirm Password'/>
          <input type="submit" value="create my account" className='signup-submit'/>
          <p className='register'>Already have an account? <Link to="/login"><a href="./Login.js">Log In</a></Link></p>
        </form>
    </div>
  )
}

export default Signup