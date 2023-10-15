// CategoryHeader.tsx

import React from 'react';
import { Text, StyleSheet, Image, } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import { logout } from '../api';

const NavbarMenu = ({ navigation }) => {

  return (
    <>
          <Menu>
              <MenuTrigger text='' style={styles.menu}>
                <Image
                    source={require('../assets/menu.png')}
                />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{marginTop: 35, width:"35%"}}>
                <MenuOption onSelect={() => {navigation.navigate('Profile');}} >
                  <Text style={styles.menuOption}>Profile</Text>
                </MenuOption>
                <MenuOption onSelect={() => {navigation.navigate('Collectibles');}} >
                  <Text style={styles.menuOption}>Collectbles</Text>
                </MenuOption>
                <MenuOption onSelect={() => {navigation.navigate('ChatContacts');}} >
                  <Text style={styles.menuOption}>Message</Text>
                </MenuOption>
                <MenuOption onSelect={() => {logout(navigation)}} >
                  <Text style={styles.menuOption}>Log Out</Text>
                </MenuOption>
              </MenuOptions>
          </Menu>
    </>
  );
};

const styles = StyleSheet.create({
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

  menuOption: {
    color: 'black', 
    marginLeft: "5%"
  },
});

export default NavbarMenu;

