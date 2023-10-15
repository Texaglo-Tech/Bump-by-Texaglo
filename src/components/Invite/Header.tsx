// InviteHeader.tsx

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

import NavbarMenu from '../NavbarMenu';

const InviteHeader = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
          <View style={styles.headerContainer}>

            <View style={styles.navbarContainer}>
              <Text style={styles.inviteNavTitle}>Invite a Friends</Text>
              <NavbarMenu navigation={navigation}/>

            </View>

            <View style={styles.giftImage}>
              <Image
                source={require('../../assets/gift.png')}
                style={styles.backgroundImage}
              />
            </View>

            <View style={{marginTop:-25}}>
              <Text style={styles.inviteGiftTitle}>Invite Friends and </Text>
              <Text style={styles.inviteGiftTitle}>Earn 30 pts!</Text>
            </View>
            <Text style={styles.inviteGiftSubTitle}>When your friend sign up on Metrodao with your referral link, you'll both get 30 points!</Text>
           
          </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#9851F9",
    width: "100%",
    padding: 20,
    position: "relative"
  },
  
  giftImage: {
    alignContent: "center",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  
  backgroundImage: {
    width: 200,
    height: 200,
  },

  menu: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent:"center"
  },

  inviteGiftTitle: {
    fontSize:30,
    fontWeight: "600",
    color: "white",
    textAlign: "center"
  },

  inviteGiftSubTitle: {
    fontSize: 17,
    fontWeight: "400",
    color: "white"
  },

  inviteNavTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    textAlign: "left"
  },

  navbarContainer:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent: "space-between", 
    marginTop: 0, 
    paddingTop: 0
  }

});

export default InviteHeader;
