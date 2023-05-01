import React from 'react'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { TextField } from '@mui/material';

function CheckoutForm() {
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
        <CardNumberElement/>
    </>
  )
}

export default CheckoutForm