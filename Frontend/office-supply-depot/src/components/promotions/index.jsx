import { Box } from '@mui/system'
import { Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MessageText, PromotionsContainer } from '../../Styles/promotions'

const messages = [
    "Same day drone delivery for order less than 15lbs!",
    "2 business days delivery for order more than 15lbs"
]

function Promotions() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setShow(false)
        }, 1000);

        const intervalId = setInterval(() => {
            setMessageIndex(i => (i+1) % messages.length);
            setShow(true);
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);


  return (
    <PromotionsContainer>
        <Slide 
            direction={show ? 'left' : 'right'} 
            in={show} 
            timeout={{enter: 500, exit: 100}}>
            <Box display={'flex'} justifyContent='center' alignItems={'center'}>
                <MessageText>
                    {messages[messageIndex]}
                </MessageText>
            </Box>
        </Slide>
    </PromotionsContainer>
  )
}

export default Promotions