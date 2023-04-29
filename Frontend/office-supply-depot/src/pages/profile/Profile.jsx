import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Appbar from "./../../components/appbar";
import ResponsiveAppBar from "../../components/appbar/ResponsisveAppBar";
import axios, { formToJSON } from "axios";
import "./profile.css";

function handleSubmit(e) {


  e.preventDefault();

  const fname = e.target.fname.value;
  const lname = e.target.lname.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const street = e.target.street.value;
  const city =  e.target.city.value;
  const state =  e.target.state.value;
  const zipcode =  e.target.zipcode.value;
  const data = JSON.parse(`{"email" : "${email}", "firName" : "${fname}", "lstName" : "${lname}", "userPsw" : "${password}" , "street" : "${street}", "city" : "${city}", "state" : "${state}", "zipcode" : "${zipcode}"}`)



      const url = "http://127.0.0.1:5000/register"
      const customHeader = {
        headers: {
          // Authorization: `Bearer ${getLocalStorageToken()}`,
          "Content-Type": 'application/json',
        },
      };
    
      return axios
  .post(url, data, customHeader)
  .then((res) => {
    if(res.status == 200) {
      console.log("Success!")
      document.cookie = `user=${fname + " " + lname};`;
      navigate("/home");
    }
  })
  .catch((err) => {
    return {
      status: err.response ? err.response.status : 0,
      data: {},
      error: err.message,
    };
  });
      

  
}

function Profile() {
   return (
      <div class="wrapper">
        <div class="profile">
          <div class="content">
            <h1>Your Profile</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                  <label for="fname">First Name</label>
                  <div class="grid">
                    <input type="text"
                      className="input-field"
                      placeholder="First Name"
                      name="fname" 
                    />
                  </div>
                  <label for="lname">Last Name</label>
                  <div class="grid">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Last Name"
                    name="lname"
                  />
                  </div>
              </fieldset>
      
              <fieldset>
                <label for="email">Email Address</label>
                <div class="grid">
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    name="email"
                  />
                </div>
              </fieldset>
      
              <fieldset>
                <label for="password">Password</label>
                <div class="grid">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    name="password"
                  />
                </div>
      
                <label for="password">Conform Password</label>
                <div class="grid">
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Confirm Password"
                  />
                </div>
              </fieldset>
      
              <fieldset>
                <label type="address">Address</label>
                <div>  

                  <label for="street">Street</label>
                  <div class="grid">
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="Street"
                    />
                  </div>
                  
                  <label for="city">City</label>
                  <div class="grid">
                    <input 
                      type="text"
                      className="input-field"
                      placeholder="City"
                    />
                  </div>
        
                  <label for="state">State</label>
                  <div class="grid">
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="State" 
                    />
                  </div>

                  <label for="zipcode">Zipcode</label>
                  <div class="grid">
                    <input 
                      type="text" 
                      className="input-field"
                      placeholder="Zipcode"
                    />
                  </div>

                </div>
              </fieldset>
        
              <input type="button" class="Btn cancel" value="Cancel"/>
              <input type="submit" class="Btn" value="Save Changes"/>
              <input type="Btn" class="delete-btn" value="Delete Profile" onClick={handleDelete}/>
      
            </form>
          </div>
        </div>
    </div>
  )
}
export default Profile;