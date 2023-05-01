import React from 'react'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { TextField } from '@mui/material';

/*
    
*/

function PaymentForm() {
  return (
    <>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
      />
    </>
  )
}

export default PaymentForm