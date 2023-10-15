// SurveyScreen.tsx

import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import SurveyHeader from '../components/Survey/Header';
import SurveyBody from '../components/Survey/Body';
import SurveyItem from '../components/Survey/Item';
import FooterTab from '../components/FooterTab';

const SurveyScreen = ({navigation}) => {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
  
  return (
    <View style={{ height:"100%"}}>
      <ScrollView style={{position:"relative", width:"100%"}}>
          {/* <SurveyBody navigation={navigation}/> */}
          <SurveyItem navigation={navigation}/>
      </ScrollView>
      <FooterTab navigation={navigation}/>
    </View>

  );
};

export default SurveyScreen;
