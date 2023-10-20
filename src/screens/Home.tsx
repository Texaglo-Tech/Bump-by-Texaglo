// HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {  

  const [step , setStep] = useState(0);

  const [imageSource, setImageSource] = useState(require('../assets/new_layout.png'));

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={imageSource}
          style={styles.backgroundImage}
        />
        <Text style={styles.centerTitle}>Bump-me</Text>
        <View style={styles.centerContainer}>
          <Text style={styles.centerSubTitle}>
            Join the Bump Marketplace and find local products
            {'\n'}
          </Text>

          <TouchableOpacity style={styles.loginContainer}  activeOpacity={0.9} onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
         
          <TouchableOpacity  activeOpacity={0.9} style={styles.signupContainer} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>SignUp</Text>
          </TouchableOpacity>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  centerContainer: {
    marginTop:200,
    backgroundColor: 'white',
    width: '80%',
    height: '30%',
    borderRadius: 15,
    padding: 10
  },

  centerTitle: {
    marginTop: 100,
    fontSize: 32, 
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },

  centerSubTitle: {
    fontSize: 12, 
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
  },  

  loginContainer: {    
    backgroundColor: '#39495D',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
  },

  loginText: {
    color: 'white',
  },

  signupContainer: {
    borderColor: '#DFD2C4',
    borderWidth: 1,
    backgroundColor: '#DFD2C4',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5
  },

  signupText: {
    color: 'white'
  },

  button: {
    borderRadius: 8
  },
  
});

export default HomeScreen;
