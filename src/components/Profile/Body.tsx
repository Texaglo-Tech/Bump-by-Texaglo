// ProfileBody.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';

const ProfileBody = ({navigation}) => {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
  
  return (
      <>
        {/* source={{ uri: user.coverPhoto }}  */}
        <View style={styles.divider}>
        </View>
      </>
  );
};

const styles = StyleSheet.create<any>({
  coverPhoto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#35A5CE',
  },

  name: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },

  badges:{
    marginTop: 10,
    borderColor: "#47BBE6",
    borderWidth: 2,
    width: "80%",
    padding: 20,
    paddingTop: 10,
    borderRadius: 10
  },
  
  bodyContainer: {
    alignItems: "center",
    width: "100%",
    padding: "10%",
    paddingBottom: "0%",
    paddingTop: "5%"
  },

  bodyTitleContainer: {
    textAlign:"left",
    alignSelf:"flex-start",
  },
  
  interestsTextContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#0000001F",
    borderBottomWidth: 1,
    paddingBottom: 5
  },

  interestsText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black'
  },

  interestsCount: {
    color: "#914FEC",
    fontSize: 16,
    fontWeight: '600',
  },

  localCauses: {
    marginTop: 15,
    fontSize: 16,
    color: '#494949'
  },

  localCausesContainer: {
    marginTop: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  localCausesItem: {
    display:"flex",
    flexDirection: "column",
    alignItems:"center"    
  },

  localCausesItemText: {
    marginTop: 5,
    fontSize: 11,
    color: "#212121A3",
    fontWeight: "400",
  },

  seeAllBadges: {
    textAlign: "right",
    alignItems: "flex-end",
  },

  seeAllBadgesText: {
    color: "#515EF9",
    fontSize: 14    
  },

  divider: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#0000001F",
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    width: "100%"
  },

})

export default ProfileBody;
