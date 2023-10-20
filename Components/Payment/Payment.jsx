import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Payment.module.css";
import images from "../../assets";

import { createPayment, getProductSummary } from "../../api";
import {
  addMembershipDiscount,
  exportToExcel,
  getUserIdFromToken,
} from "../../api";
import { toast } from "react-toastify";
import { Grid } from '@mui/material';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// material-ui
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  Backdrop,
  useTheme
} from '@mui/material';
import { useGlobal } from "../../context/GlobalContext";
import jwt from 'jsonwebtoken';

const config = require("./../../config.json")

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(config.stripe_pubkey);

const CheckoutForm = ({ handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (!stripe || !elements) {
      return;
    }
    
    const id = toast.loading("Submiting...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: 'http://localhost:3000'
      // },
      redirect: 'if_required'
    });

    if (result.error) {
      console.log(result.error)
    } else {
      console.log("success")
      handleClose();
    }
      
    toast.update(id, {
      render: result.error ? "Server Error": "Success",
      type: result.error ? "error": "success",
      autoClose: 2000,
      isLoading: false,
    });

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} px={1} py={1}>
        <PaymentElement />
        <Button disabled={!stripe || isSubmitting} type="submit" sx={{background:"grey"}}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('pi_3O2D6AGSeIXWr6sy1zmF6YGJ_secret_W7WBQGlgC1fqPBfmnae1Y1mpK');
  const {paymentVisible, paymentVisibleHandle, cartData} = useGlobal()

  useEffect(() => {
    
    const decodedToken = jwt.decode(localStorage.getItem("token"));
    
    const user_id = decodedToken?.id;
    if(!user_id || !cartData) return;
    
    const data = {
      user_id: user_id,
      amount: JSON.parse(cartData).total_amount,
      cart_data: cartData
    }
    // createPayment
    createPayment(data).then(data=>{
      if(data.success){
        console.log(data)
        setClientSecret(data.data.paymentIntent)
      }
    })
  }, [cartData]);

  const handleClose = () => {
    paymentVisibleHandle(false)
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={paymentVisible}
      onClick={()=>paymentVisibleHandle(false)}
    >
    <Dialog open={paymentVisible} aria-labelledby="deposit-dialog-title" title="Payment" >
      <Box sx={{ px: 2, py: 1.5, minWidth: '400px' }}>
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
          <CheckoutForm handleClose={handleClose} />
        </Elements>
      </Box>
    </Dialog>
    </Backdrop>
  );
};

export default Payment;
