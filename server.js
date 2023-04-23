//Secret_key=sk_test_51Mw15WKqLmqC1u8HsIzzCHDVltosxOOglnfEYO8HqoikByssoGUNUAyTQpEo6nOwan0lsr3F5K7bJo3xQJA1fuKf00JePj8g4L
//publishable_key=pk_test_51Mw15WKqLmqC1u8HOHhwMbaM4pSYyI1qRexDloI3NpheSd5pTlsEKmEe0XQDk69DqETZjlpAllDs08ISRBbXXcCg00C7SK0CY8

// Super Backpack: price_1MyPpLKqLmqC1u8HU4Ro53YA
// File Folder, Letter Size: price_1MyPqmKqLmqC1u8HlhbwYKNF
// Energizer Industrial Alkaline Batteries: price_1MyPsRKqLmqC1u8HVWSuNqSK
// Boise X-9 Copy Paper, 92 Brightness: price_1MyPtDKqLmqC1u8H3exTjp5V
// Best Tote: price_1MyPtsKqLmqC1u8HijN4AW9P
// SHarpie Fine Tip Permanent Marker: price_1MyPv0KqLmqC1u8HLwrTYuMT

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51Mw15WKqLmqC1u8HsIzzCHDVltosxOOglnfEYO8HqoikByssoGUNUAyTQpEo6nOwan0lsr3F5K7bJo3xQJA1fuKf00JePj8g4L')

const app = express();
app.use(cors())
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) =>{

    
    console.log(`re.body: ${req.body.cart}`);
    const items = req.body.cart;
    let lineItems = [];
    items.forEach(item => {
        lineItems.push(
            {
                price: item.id, 
                quantity: 1
                // quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/'
    });

    res.send(JSON.stringify({
        url: session.url
    }))
});

app.listen(4000, () => console.log("Listen on port 4000"));