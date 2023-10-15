// CartScreen.tsx

import React, {useState} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import CartHeader from '../components/Cart/Header';
import CartBody from '../components/Cart/Body';
import FooterTab from '../components/FooterTab';

const CartScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
        <View style={{ height:"100%"}}>
          <ScrollView style={{position:"relative", width:"100%"}}>
            <CartHeader navigation={navigation}/>

            <CartBody navigation={navigation}/>
          </ScrollView>
          <FooterTab navigation={navigation}/>
        </View>
  );
};

export default CartScreen;
