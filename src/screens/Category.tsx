// CategoryScreen.tsx

import React, {useState} from 'react';
import { View, StyleSheet, } from 'react-native';
import { ScrollView, Modal} from 'react-native';

import CategoryHeader from '../components/Category/Header';
import CategoryBody from '../components/Category/Body';
import FooterTab from '../components/FooterTab';

const CategoryScreen = ({ navigation }) => {

  return (
      <View style={{ height:"100%"}}>
        <ScrollView style={{position:"relative", width:"100%"}}>
          <CategoryHeader navigation={navigation}/>

          <CategoryBody navigation={navigation}/>
        </ScrollView>
        <FooterTab navigation={navigation}/>
      </View>
  );
};

export default CategoryScreen;

