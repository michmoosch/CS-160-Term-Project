import React from 'react'
import PaymentForm from '../../components/checkout'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import { Container, Paper, Stepper } from '@mui/material';
import Appbar from '../../components/checkout/Appbar';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe('pk_test_51Mw15WKqLmqC1u8HOHhwMbaM4pSYyI1qRexDloI3NpheSd5pTlsEKmEe0XQDk69DqETZjlpAllDs08ISRBbXXcCg00C7SK0CY8');

function Checkout() {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{sk_test_51Mw15WKqLmqC1u8HsIzzCHDVltosxOOglnfEYO8HqoikByssoGUNUAyTQpEo6nOwan0lsr3F5K7bJo3xQJA1fuKf00JePj8g4L}}',
  };

  return (
    // className={classes.container} 
    <Container maxWidth="md"> 
     <Appbar/>
     <Paper elevation={5}>
		 <Elements stripe={stripe}>
        <CheckoutForm/>
        <Stepper />
		 </Elements>
     </Paper>
    </Container>
  )
}

export default Checkout