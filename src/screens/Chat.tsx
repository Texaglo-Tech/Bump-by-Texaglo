import React from 'react';
import {ImageBackground,SafeAreaView, StatusBar, View } from 'react-native';
import Header from './../components/Chat/Header'
import Chat from './../components/Chat/Body'
import Actions from './../components/Chat/Actions';
import ChatContacts from '../components/Chat/Contacts';

export default function ChatScreen({navigation}) {
  return (
    <View style={{ height:"100%"}}>
        <Header navigation={navigation}/>
        <ImageBackground 
          style={{
            flex: 1
          }}   
          source={require('./../assets/background.png')}  resizeMode="cover">
        <Chat /> 
        <Actions /> 
        </ImageBackground>
    </View>
  );
}