// CategoryScreen.tsx

import React, {useState} from 'react';
import { View, StyleSheet, } from 'react-native';
import { ScrollView, Modal} from 'react-native';

import LocalCategoryHeader from '../components/LocalCategory/Header';
import LocalCategoryBody from '../components/LocalCategory/Body';
import FooterTab from '../components/FooterTab';

const LocalCategoryScreen = ({ navigation }) => {

  return (
      <View style={{ height:"100%"}}>
        <ScrollView style={{position:"relative", width:"100%"}}>
          <LocalCategoryHeader navigation={navigation}/>

          <LocalCategoryBody navigation={navigation}/>
        </ScrollView>
        <FooterTab navigation={navigation}/>
      </View>
  );
};

export default LocalCategoryScreen;

