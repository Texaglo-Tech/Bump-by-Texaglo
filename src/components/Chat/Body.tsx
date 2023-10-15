import React from 'react'
import { StyleSheet,Text, View, ScrollView, Image } from 'react-native'
import tw from 'twrnc'
import chatMessage from '../../data/chat'

const ChatBody = () => {

  return (
    <ScrollView 
       style={[{
         flex: 1,
        marginBottom: 75,
      }]}
      scrollEnabled={true}>
      <View>
        {chatMessage.map((chat,i) => (
        <View  key={i} style={[{
          backgroundColor: "#dbf8c6",
          overflow: "hidden"
        }, chat.owner ? styles.ownerView : styles.nonOwnerView]}>
          
          {chat.image ? <Image
           style={{ marginLeft: 10, width: 150, height: 160, resizeMode: 'contain' }}
            source={require('../../assets/store.jpeg') }
           /> : <></>}
           <Text style={chat.owner ? styles.ownerText : styles.nonOwnerText}>{chat.text}</Text>
          <View style={tw.style(`flex flex-row mt-2 w-full justify-end`)}>
            
          <Text style={chat.owner ? styles.ownerTextTime : styles.nonOwnerTextTime}> {chat.time}</Text>
          <Image 
            style={{ width: 15, height: 15, marginLeft:4, resizeMode: 'contain' }}
            source={require('../../assets/tick.png') }
          />
          </View> 
        </View>
        ))}
        </View>
        </ScrollView>
  )
}

export default ChatBody

const styles = StyleSheet.create({
  ownerText:{
    color:"#000",
    fontSize: 15,
  },
  ownerTextTime:{
    color:"#00000073",
    fontSize: 11,
  },
  ownerView: tw `flex flex-row flex-wrap p-2 w-1/2 rounded-xl ml-44 my-1`,
  nonOwnerText: {
    color:"#000",
    fontSize: 15,
  },
  nonOwnerTextTime: {
    color:"#00000073",
    fontSize: 11,
  },
  nonOwnerView: tw `flex flex-row flex-wrap p-2 w-1/2 rounded-xl m-2 my-1`
})