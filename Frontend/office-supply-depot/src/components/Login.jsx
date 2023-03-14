import React from 'react'
import "./login.css"
import Signup from './Signup'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <h1 className='login-title'>Welcome to Office Suppy Depot</h1>
        <img src={require('../images/logo.png')} className="logo-image"/>
        <form className="login-container">
          <h1>Login</h1>
          <label>User Name</label>
          <input type="text" className="input-field" placeholder='Username or email'/>
          <label>Password</label>
          <input type="password" className="input-field" placeholder='Password'/>
          <a href="" className='forgot-password'>Forgot Password / Username?</a>
          <input type="submit" value="Login" className='login-submit'/>
          <p className='register'>Don't Have An Account ? <Link to="/signup"><a href="./Signup.js">Sign Up</a></Link></p>
        </form>
        
    </div>
  )
}

export default Login