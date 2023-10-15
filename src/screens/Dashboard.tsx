// DashboardScreen.tsx

import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import DashboardHeader from '../components/Dashboard/Header';
import DashboardBody from '../components/Dashboard/Body';
import FooterTab from '../components/FooterTab';
import { getProducts } from '../api';
import { useAccounts } from '../providers/AccountProvider';

const DashboardScreen = ({ navigation }) => {
  const { productsHandle } = useAccounts();
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    getProducts().then(data => {
      if(data.success){
        productsHandle(data.message)
      } 
    })
  }, [])

  return (
        <View style={{ height:"100%"}}>
          <ScrollView style={{position:"relative", width:"100%"}}>
            <DashboardHeader navigation={navigation}/>

            <DashboardBody navigation={navigation}/>
          </ScrollView>
          <FooterTab navigation={navigation}/>
        </View>
  );
};

export default DashboardScreen;
