// HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {  

  const [step , setStep] = useState(0);

  const [imageSource, setImageSource] = useState(require('../assets/login2.png'));

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={imageSource}
          style={styles.backgroundImage}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.centerTitle}>Bump-me</Text>
          <Text style={styles.centerSubTitle}>
            Join the Bump-Me Marketplace where you can find local products
            {'\n'}
            {'\n'}    
          </Text>

          <View style={{display:"flex", marginBottom: 20, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <TouchableOpacity  activeOpacity={0.9} onPress={() => { setStep(0); setImageSource(require('../assets/login2.png')); }}>
              {step == 0?
                <Image
                  source={require('../assets/active_dot.png')}
                  style={{margin:5}}
                />
                :<Image
                source={require('../assets/dot.png')}
                style={{margin:5}}
                />
              } 
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.9} onPress={() => { setStep(1); setImageSource(require('../assets/login3.png')); }}>
              {step == 1?
                <Image
                  source={require('../assets/active_dot.png')}
                  style={{margin:5}}
                />
                :<Image
                source={require('../assets/dot.png')}
                style={{margin:5}}
                />
              } 
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.9} onPress={() => { setStep(2); setImageSource(require('../assets/login2.png')); }}>
              {step == 2?
                <Image
                  source={require('../assets/active_dot.png')}
                  style={{margin:5}}
                />
                :<Image
                source={require('../assets/dot.png')}
                style={{margin:5}}
                />
              } 
            </TouchableOpacity>
            <TouchableOpacity  activeOpacity={0.9} onPress={() => { setStep(3); setImageSource(require('../assets/login1.png')); }}>
              {step == 3?
                <Image
                  source={require('../assets/active_dot.png')}
                  style={{margin:5}}
                />
                :<Image
                source={require('../assets/dot.png')}
                style={{margin:5}}
                />
              } 
            </TouchableOpacity>
            
          </View>

          <TouchableOpacity  activeOpacity={0.9} onPress={() => navigation.navigate('Signin')}>
            <LinearGradient
              colors={['#9851F9',  'rgba(249, 81, 108, 0.8)']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.loginContainer}   
            >
              <Text style={styles.loginText}>Login</Text>
            </LinearGradient>
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
    backgroundColor: '#D9D9D98A',
    width: '80%',
    height: '50%',
    padding: 10
  },

  centerTitle: {
    fontSize: 32, 
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },

  centerSubTitle: {
    fontSize: 14, 
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
  },  

  loginContainer: {    
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

  signupContainer: {
    borderColor: '#914FEC',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5
  },

  signupText: {
    color: '#914FEC'
  },

  button: {
    borderRadius: 8
  },
  
});

export default HomeScreen;
