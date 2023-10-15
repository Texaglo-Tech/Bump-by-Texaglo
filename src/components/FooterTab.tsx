// FooterTab.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { comingSoon } from '../api';
import { useAccounts } from '../providers/AccountProvider';

const FooterTab = ({ navigation }) => {
  const { setActiveTab, activeTab } = useAccounts();

  return (
          <View style={styles.container}>
            <TouchableOpacity  activeOpacity={0.8}  onPress={() => {setActiveTab(1);navigation.navigate('Dashboard');}}>
              <View style={styles.tabButton}>
                <Svg width={24} height={24}>
                    <Path d="M19.5 5V7H15.5V5H19.5ZM9.5 5V11H5.5V5H9.5ZM19.5 13V19H15.5V13H19.5ZM9.5 17V19H5.5V17H9.5ZM21.5 3H13.5V9H21.5V3ZM11.5 3H3.5V13H11.5V3ZM21.5 11H13.5V21H21.5V11ZM11.5 15H3.5V21H11.5V15Z" fill={activeTab == 1?"#914FEC":"#AEAEAE"}/>
                </Svg>  
                <Text style={styles.tabTitle}>Categories</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.8}  onPress={() => {setActiveTab(2);navigation.navigate('Scan');}}>
              <View style={styles.tabButton}>
                <Svg width={24} height={24}>
                    <Path d="M20.5 7.28V5C20.5 3.9 19.6 3 18.5 3H4.5C3.39 3 2.5 3.9 2.5 5V19C2.5 20.1 3.39 21 4.5 21H18.5C19.6 21 20.5 20.1 20.5 19V16.72C21.09 16.37 21.5 15.74 21.5 15V9C21.5 8.26 21.09 7.63 20.5 7.28ZM19.5 9V15H12.5V9H19.5ZM4.5 19V5H18.5V7H12.5C11.4 7 10.5 7.9 10.5 9V15C10.5 16.1 11.4 17 12.5 17H18.5V19H4.5Z"  fill={activeTab == 2?"#914FEC":"#AEAEAE"}/>
                    <Path d="M15.5 13.5C16.3284 13.5 17 12.8284 17 12C17 11.1716 16.3284 10.5 15.5 10.5C14.6716 10.5 14 11.1716 14 12C14 12.8284 14.6716 13.5 15.5 13.5Z"  fill={activeTab == 2?"#914FEC":"#AEAEAE"}/>
                </Svg>  
                <Text style={styles.tabTitle}>Scan</Text> 
              </View>
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.8}  onPress={() => {setActiveTab(3);navigation.navigate('Cart');}}>
              <View style={styles.tabButton}>
                <Svg width={24} height={24}>
                    <Path d="M17 10.43V2H7V10.43C7 10.78 7.18 11.11 7.49 11.29L11.67 13.8L10.68 16.14L7.27 16.43L9.86 18.67L9.07 22L12 20.23L14.93 22L14.15 18.67L16.74 16.43L13.33 16.14L12.34 13.8L16.52 11.29C16.82 11.11 17 10.79 17 10.43ZM11 11.07L9 9.87V4H11V11.07ZM15 9.87L13 11.07V4H15V9.87Z" fill={activeTab == 3?"#914FEC":"#AEAEAE"}/>
                </Svg>  
                <Text style={styles.tabTitle}>Cart</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.8}  onPress={() => {setActiveTab(4);navigation.navigate('Profile');}}>
              <View style={styles.tabButton}>
                <Svg width={24} height={24}>
                    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z" fill={activeTab == 4?"#914FEC":"#AEAEAE"}/>
                </Svg>  
                <Text style={styles.tabTitle}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
  );
};

const styles = StyleSheet.create({

  container1: {
    width: "80%",   
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: "10%",
    right: 0,
    display: "flex",
    borderRadius: 10,
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },

  container: {
    marginTop: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",   
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },

  tabTitle: {
    color: "#AEAEAE",
    fontSize: 14,
    fontWeight: "400"
  },
  
  tabButton: {
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    alignItems: "center",
  }
  
});

export default FooterTab;
