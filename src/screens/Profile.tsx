// ProfileScreen.tsx

import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

import ProfileHeader from '../components/Profile/Header';
import ProfileBody from '../components/Profile/Body';
import ProfileItem from '../components/Profile/Item';
import FooterTab from '../components/FooterTab';

const ProfileScreen = ({navigation}) => {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
  
  return (
    <View style={{ height:"100%"}}>
      <ScrollView style={{position:"relative", width:"100%"}}>
          <ProfileHeader navigation={navigation}/>
          <ProfileBody navigation={navigation}/>
          <ProfileItem navigation={navigation}/>
      </ScrollView>
      <FooterTab navigation={navigation}/>
    </View>

  );
};

export default ProfileScreen;
