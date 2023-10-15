// CollectiblesScreen.tsx

import React, {useState} from 'react';
import { View, Text, Button, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView, Modal} from 'react-native';

import CollectiblesHeader from './../components/Collectibles/Header'
import CollectiblesBody from '../components/Collectibles/Body';
import FooterTab from '../components/FooterTab';

const CollectiblesScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
      <View style={{ height:"100%"}}>
        <ScrollView style={{position:"relative", width:"100%"}}>
          <CollectiblesHeader navigation={navigation}/>

          <CollectiblesBody navigation={navigation}/>
        </ScrollView>
        <FooterTab navigation={navigation}/>
      </View>
  );
};

export default CollectiblesScreen;
