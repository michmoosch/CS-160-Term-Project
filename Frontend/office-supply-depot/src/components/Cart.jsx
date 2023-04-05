import React from 'react'
import { Link } from "react-router-dom";
const Cart = () => {
    return (
      <div>
          <div class="cart">
          <h2 className='login-title'><u><center>Your Shopping Cart</center></u></h2>

      <div class="item">
        <div class="buttons">
          <span class="delete-btn"></span>
          <span class="save-btn"></span>
        </div>

        <div class="image">
          <img src="ball-pen.jpeg" alt="" />
        </div>

        <div class="description">
          <span>Ball Pen</span>
          <span>Blue</span>
          <span>6 pack</span>
        </div>

        <div class="quantity">
          <button class="plus-btn" type="button" name="button">
            <img src="plus-btn.png" alt="" />
          </button>
          <input type="text" name="name" value="1"></input>
          <button class="minus-btn" type="button" name="button">
            <img src="minus-btn.png" alt="" />
          </button>
        </div>

        <div class="total-price">$5</div>
      </div>

      <div class="item">
        <div class="buttons">
          <span class="delete-btn"></span>
          <span class="save-btn"></span>
        </div>

        <div class="image">
          <img src="stapler.jpeg" alt=""/>
        </div>

        <div class="description">
          <span>Stapler</span>
          <span>Black</span>
          <span>100 Staples</span>
        </div>

        <div class="quantity">
          <button class="plus-btn" type="button" name="button">
            <img src="plus-btn.png" alt="" />
          </button>
          <input type="text" name="name" value="1"></input>
          <button class="minus-btn" type="button" name="button">
            <img src="minus.btn-png" alt="" />
          </button>
        </div>

        <div class="total-price">$14</div>
      </div>

      <div class="item">
        <div class="buttons">
          <span class="delete-btn"></span>
          <span class="save-btn"></span>
        </div>

        <div class="image">
          <img src="pencil.jpeg" alt="" />
        </div>

        <div class="description">
          <span>Pencils</span>
          <span>Mechanical</span>
          <span>2 Pack</span>
        </div>
          <div class="quantity">
           <button class="plus-btn" type="button" name="button">
            <img src="plus-btn.png" alt="" />
           </button>
            <input type="text" name="name" value="1"> </input>
           <button class="minus-btn" type="button" name="button">
            <img src="minus-btn.png" alt="" />
           </button>
          </div>
        <div class="total-price">$3</div>
        </div>
        </div>
        <div class = "buttons">
            <button class ="checkout" type="buttons" name="button"> Check Out </button>
        </div>        
      </div>
    )
  }
  
  export default Cart