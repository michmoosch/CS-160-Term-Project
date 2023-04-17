import React from "react";
import "./login.css";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios, { formToJSON } from "axios";

function Addprod() {

  const navigate = useNavigate();

  function handleSubmit(e) {


    e.preventDefault();

    const prodID = e.target.id.value;
    const prodName = e.target.name.value;
    const prodDescip = e.target.descip.value;
    const prodUnitPrice = e.target.unitPrice.value;
    const prodUnitInStock = e.target.unitInStock.value;
    const prodUnitWeight = e.target.unitWeight.value;
    const data = JSON.parse(`{"id" : "${prodID}", "name" : "${prodName}", "description" : "${prodDescip}", "unitPrice" : "${prodUnitPrice}", "unitWeight" : "${prodUnitWeight}", "unitInStock" : "${prodUnitInStock}"}`)



        const url = "/addProd"
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
        document.cookie = `product=${prodName};`;
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
  return (
    <div>
      <h1 className="add-product">Add Product Page</h1>
      <form onSubmit={handleSubmit} className="login-container">
        <h1>Add Product</h1>
        <label>Product ID</label>
        <input
          type="text"
          className="input-field"
          placeholder="Product ID"
          name="id"
        />
        <label>Product Name</label>
        <input
          type="text"
          className="input-field"
          placeholder="Product Name"
          name="name"
        />
        <label>Product Description</label>
        <input
          type="text"
          className="input-field"
          placeholder="Product Description"
          name="descip"
        />
        <label>Product Unit Price</label>
        <input
          type="double"
          className="input-field"
          placeholder="Product Unit Price"
          name="unitPrice"
        />
        <label>Product Unit In Stock</label>
        <input
          type="integer"
          className="input-field"
          placeholder="Product Unit In Stock"
          name="unitInStock"
        />
        <label>Product Unit Weight</label>
        <input
          type="double"
          className="input-field"
          placeholder="Product Unit Weight"
          name="unitWeight"
        />
        <input
          type="submit"
          value="add product"
          className="signup-submit"
        />
      </form>
    </div>
  );
}

export default Addprod;
