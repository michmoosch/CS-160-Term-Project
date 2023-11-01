import React from 'react'
import "./login.css"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <h1 className='login-title'>Welcome to Office Suppy Depot</h1>
        <img src={require('../images/logo.png')} className="logo-image"/>
        <form className="login-container">
            <h1>Login</h1>
            <input type="text" className="input-field" placeholder='Email'/>
            <input type="password" className="input-field" placeholder='Password'/>
            <a href="" className='forgot-password'>Forgot Password / Username?</a>
            <input type="submit" value="Login" className='submit-input'/>
            <p className='is-registered'>Don't Have An Account ? <Link className='sign-up-link' to="/signup">Sign Up</Link></p>
        </form>
        
    </div>
  )
}

export default Login