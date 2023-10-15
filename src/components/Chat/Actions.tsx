import React from 'react'
import { StyleSheet,TextInput, View } from 'react-native'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'

const Actions = () => {
  return (
    <View style={[tw`flex flex-row justify-between items-center p-1 h-1/6 w-full -bottom-5`,{
      position: 'absolute',
   }]}>
     
     <View style={[tw`flex-1 flex-row bg-white rounded-full ml-2 justify-between`]}>
     <Icon 
         style={tw`m-2 rounded-full p-2`}
         name='smile'
         type="feather"
     />
       <TextInput
           style={styles.input}
           placeholder="Type a mess..."
           underlineColorAndroid="transparent"
       />
       <Icon 
         iconStyle={tw.style(` rounded-full  py-4`,{
          transform: [
            { rotate: '-40deg' },
            { scale: 1.2 } 
          ] 
         })}
         name='attach'
         type="ionicon"
     />
     <Icon 
         iconStyle={tw`-ml-2 rounded-full py-4 px-4 `}
         name='camera'
         type="ionicon"
         solid={true}
     />
   </View>
     <Icon 
         style={tw`mx-2 rounded-full  bg-green-700 p-4`}
         name='mic'
         color="white"
         type="FontAwesome5"
     />
   </View>
  )
}

export default Actions

const styles = StyleSheet.create({
  input: {
      width: 120,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
  
  });