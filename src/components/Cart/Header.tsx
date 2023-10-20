// CartHeader.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import NavbarMenu from '../NavbarMenu';
import { useAccounts } from "../../providers/AccountProvider";
import { comingSoon, getUserIdFromToken, encryptMessage, getUserNameFromToken } from '../../api';
import config from '../../config';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Badge } from 'react-native-elements';
import Alarm  from './../Alarm';
import Payment from '../Payment';


const Buffer = require("@craftzdog/react-native-buffer").Buffer;

const CartHeader = ({ navigation }) => {
  const { cart, stripeHandle } = useAccounts();
  const [ cartData, setCartData] = useState("");
  const [username, setUsername] = useState("");
  useEffect(()=>{
    getUserNameFromToken().then(data=>{
      setUsername(data);
    })
  })

  const payHandle = async() =>{
    if(cart.length < 1){
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: "Empty Cart",
        autoClose: 5000,
      });
      return
    }
    const user_id = await getUserIdFromToken()
    const products = [];
    const products_cost = [];
    const products_img = [];
    let total_amount = 0;
    for (let i = 0; i <cart.length; i++){
      products.push(cart[i]?.product_id);
      products_cost.push(cart[i]?.product_cost);
      products_img.push(cart[i]?.product_file)
      total_amount += Number(cart[i]?.product_cost);
    }
    const data = {
      user_id,
      products: products,
      products_cost: products_cost,
      products_img,
      total_amount 
    }
    setCartData(JSON.stringify(data))
    stripeHandle();
    return;
    const encodedData = Buffer.from(JSON.stringify(data)).toString('base64');
    const key = encryptMessage(encodedData, 5);
    console.log("encryptKey", key)
    Linking.openURL(`${config.CROSSMINT_PAYMENT}/?${key}`);
    comingSoon();
  }

  return (
        <>
          <View style={styles.headerContainer}>
            <View style={styles.navbarContainer}>
              <TouchableOpacity  activeOpacity={0.9} style={styles.menu}>
                <Image
                  source={{ uri: "https://www.bootdey.com/img/Content/avatar/avatar1.png" }}
                  style={{width:30, height:30, borderRadius: 30}}
                />
              </TouchableOpacity>
              <View style={{display:"flex", flexDirection:"row"}}>
                <Alarm navigation={navigation}/>
                <NavbarMenu navigation={navigation}/>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={styles.nftTitle}>Hello, {username}  </Text>
            </View>
            <Text style={styles.nftSubTitle}>
              Here is your cart
              {"\n"}
              {"\n"}
            </Text>

             <TouchableOpacity  activeOpacity={0.9} onPress={()=>payHandle()}>
              <LinearGradient
                colors={['#9851F9',  'rgba(249, 81, 108, 0.8)']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
                style={styles.payButtonContainer}   
              >
                <Text style={styles.payButtonText}>Confirm And Pay</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Payment cartData={cartData}/>

          </View>
        </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#515EF9",
    width: "100%",
    padding: "10%",
    paddingTop: 20,
    paddingBottom: 20,
    position: "relative"
  },
  
  menu: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent:"center",
  },

  navbarContainer:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent: "space-between", 
    marginTop: 0, 
    paddingTop: 0
  },

  nftTitle: {
    fontSize:30,
    fontWeight: "600",
    color: "white",
    textAlign: "left",
    marginLeft: 5
  },

  nftSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    marginLeft: 5
  },

  payButtonContainer: {    
    display:"flex",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent:"space-between",
    backgroundColor: 'linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    textAlign:"center",
    marginBottom: 5,
    marginTop: 5
  },

  payButtonText: {
    textAlign:"center",
    color: 'white',
  },
});

export default CartHeader;
