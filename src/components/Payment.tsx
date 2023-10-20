import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Alert, Text } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { Dialog } from "react-native-elements";
import { createPayment, getProducts, getUserIdFromToken } from "../api";
import { useAccounts } from "../providers/AccountProvider";

const Payment = ({ cartData }) => {
  const { stripe, stripeHandle, productsHandle } = useAccounts();
  const { confirmPayment } = useStripe();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const userId = await getUserIdFromToken();
    const data = {
      user_id: userId,
      amount: JSON.parse(cartData).total_amount,
      cart_data: cartData,
    };

    const res = await createPayment(data);
    if (!res.success) {
      Alert.alert("Info", res.message);
      return false;
    }

    const customer = res.data.customer;
    const ephemeralKey = res.data.ephemeralKey;
    const paymentIntent = res.data.paymentIntent;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Merchant",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });

    if (error) {
      // error
    }
    
    return true;
  };

  const openPaymentSheet = async () => {
    const res = await initializePaymentSheet();
    if(!res) return;

    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      getProducts().then((data) => {
        if (data.success) {
          productsHandle(data.message);
        }
      });
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  return (
    <Dialog
      isVisible={stripe}
      onBackdropPress={stripeHandle}
      style={styles.container}
    >
      <Button title="Checkout" color="#841584" onPress={openPaymentSheet} />
    </Dialog>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15,
  },
});
