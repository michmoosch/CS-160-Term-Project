import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES, imageImports } from "./util";
import Signup from "./Signup";
import { Link, useNavigate, useLocation } from "react-router-dom";



const Checkout = () => {

    const {state} = useLocation();
    // const { id, color } = state; // Read values passed on state
    console.log(state);
    return(<div>
        <h1>Checkout</h1>
        <div>
            {Object.keys(state).map((key) => {
                return <p>{key}: {state[key]}</p>
})}
        </div>
    </div>)
}

export default Checkout;