// LocalCategoryHeader.tsx

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

import NavbarMenu from '../NavbarMenu';
import { Badge } from 'react-native-elements';
import Alarm  from './../Alarm'

const LocalCategoryHeader = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
        <View style={styles.headerContainer}>
          <View style={styles.navbarContainer}>
            <TouchableOpacity  activeOpacity={0.9} style={styles.menu}>
              <Image
                // source={require('../../assets/menu.png')}
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
            <Text style={styles.nftTitle}>Local Products </Text>
          </View>
          <Text style={styles.nftSubTitle}>
            Ready to by Locally?  
          </Text>
        </View>

    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#515EF9",
    width: "100%",
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: "relative"
  },

  navbarContainer: {
    display:"flex",
    flexDirection:"row", 
    justifyContent: "space-between", 
    marginTop: 0, 
    paddingTop: 0
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

});

export default LocalCategoryHeader;

