// ScanScreen.tsx

import React, {useState} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import ScanHeader from '../components/Scan/Header';
import ScanBody from '../components/Scan/Body';
import FooterTab from '../components/FooterTab';

const ScanScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
      <View style={{ height:"100%"}}>
        <ScrollView style={{position:"relative", width:"100%"}}>
            <ScanHeader navigation={navigation}/>

            <ScanBody navigation={navigation}/>
        </ScrollView>
        <FooterTab navigation={navigation}/>
      </View>
  );
};

export default ScanScreen;
