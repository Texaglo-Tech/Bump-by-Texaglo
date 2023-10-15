// ProfileHeader.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getUserNameFromToken } from '../../api';

const ProfileHeader = ({navigation}) => {
  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };

  const [username, setUsername] = useState("");

  useEffect(()=>{
    getUserNameFromToken().then(data=>{
      setUsername(data);
    })
  })
  
  return (
      <>
        {/* source={{ uri: user.coverPhoto }}  */}
        <Image source={require('../../assets/cover.png')} style={styles.coverPhoto} />

        <View style={styles.avatarContainer}>

          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.role}>Member</Text>

          <View style={styles.locationContainer}>
            <Image source={require('../../assets/location.png')} style={styles.locationImg}/>
            <Text>San Francisco</Text>
          </View>
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

  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
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
  
  role: {
    color: '#914FEC',
    fontSize: 14,
    fontWeight: '600',
  },
  
  locationContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    fontSize: 12
  },
  
  locationImg: {
    width: 20,
    height: 20,
    marginRight: 5
  },
})

export default ProfileHeader;
