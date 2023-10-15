// CollectiblesHeader.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import NavbarMenu from '../NavbarMenu';
import { getPointsFromToken, getUserNameFromToken } from '../../api';
import { Badge } from 'react-native-elements';
import Alarm  from './../Alarm'

const CollectiblesHeader = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [points, setPoints] = useState(0);

  const [username, setUsername] = useState("");
  useEffect(()=>{
    getUserNameFromToken().then(data=>{
      setUsername(data);
    })
    getPointsFromToken().then(data=>{
      setPoints(data)
    })
  })

  return (
        <View style={styles.headerContainer}>
            <View style={styles.navbarContainer}>
              <TouchableOpacity  activeOpacity={0.9} style={styles.menu}>
                <Image
                  // source={require('../assets/menu.png')}
                  source={{ uri: "https://www.bootdey.com/img/Content/avatar/avatar1.png" }}
                  style={{width:30, height:30, borderRadius: 30}}
                />
              </TouchableOpacity>
              
              <View style={{display:"flex", flexDirection:"row"}}>
                <Alarm navigation={navigation}/>
                <NavbarMenu navigation={navigation}/>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={styles.nftTitle}>Hello, {username}  </Text>
            </View>

            <Text style={styles.nftSubTitle}>
              Here is your digital Collectbles
            </Text>

            <TouchableOpacity  activeOpacity={0.9}>
              <LinearGradient
                colors={['#9851F9',  'rgba(249, 81, 108, 0.8)']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
                style={styles.loginContainer}
              >
                <Text style={styles.loginText}>Your Points</Text>
                <Text style={styles.loginText}>{points}</Text>
              </LinearGradient>
            </TouchableOpacity>

        </View>
  );
};

const styles = StyleSheet.create({
  
  headerContainer: {
    backgroundColor: "#515EF9",
    width: "100%",
    padding: "10%",
    paddingTop: 15,
    position: "relative"
  },
  
  menu: {
    marginLeft: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent:"center",
  },

  navbarContainer: {
    display:"flex",
    flexDirection:"row", 
    justifyContent: "space-between", 
    marginTop: 0, 
    paddingTop: 0
  },

  nftTitle: {
    fontSize:30,
    fontWeight: "600",
    color: "white",
    textAlign: "left",
    marginLeft: 5
  },

  nftSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    marginLeft: 5
  },

  loginContainer: {    
    display:"flex",
    flexDirection:"row",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent:"space-between",
    backgroundColor: 'linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5
  },

  loginText: {
    color: 'white',
  },

});

export default CollectiblesHeader;
