import React from 'react'
import "../../Styles/login.css"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1 className='login-title'>Welcome to Office Supply Depot</h1>
      <img src='/images/logo/logo.png' className="logo-image" />
      <form className="login-container">
        <h1>Login</h1>
        <input type="text" className="input-field" placeholder='Email' />
        <input type="password" className="input-field" placeholder='Password' />
        <a href="" className='forgot-password'>Forgot Password / Username?</a>
        <Link to="/home">
          <input type="submit" value="Login" className='submit-input' />
        </Link>
        <p className='is-registered'>Don't Have An Account ? <Link className='sign-up-link' to="/signup">Sign Up</Link></p>
      </form>

    </div>
  )
}

export default Login