// SurveyItem.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useAccounts } from "../../providers/AccountProvider";

const SurveyItem = ({navigation}) => {
  const { products, selectedProduct, cartHandle, cart, selectedProductHandle } = useAccounts();

  const [step, setStep] = useState(0);

  const user = {
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    coverPhoto: "https://www.bootdey.com/image/280x280/FF00FF/000000",
    name: "John Smith"
  };
  
  return (
        <View style={styles.itemContainer}>
          {step == 0? <>
                <View style={{marginTop: 20}}>
                    <Text style={styles.nftTitle}>Complete Survey for {"\n"}Product </Text>
                </View>
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <Text>
                      This survey is in 2 sections. It takes less than 10 minutes to complete.
                    </Text>
                </View>

                <TouchableOpacity style={{padding: 5, backgroundColor:"white", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10}} activeOpacity={0.8}  onPress={() => {setStep(1)}}>
                  <View style={styles.item}>
                    <View style={styles.itemIcon}>
                      <Svg width={24} height={24}>
                        <Path d="M8.99805 2.93359C10.098 2.93359 10.998 3.83359 10.998 4.93359C10.998 6.03359 10.098 6.93359 8.99805 6.93359C7.89805 6.93359 6.99805 6.03359 6.99805 4.93359C6.99805 3.83359 7.89805 2.93359 8.99805 2.93359ZM8.99805 12.9336C11.698 12.9336 14.798 14.2236 14.998 14.9336H2.99805C3.22805 14.2136 6.30805 12.9336 8.99805 12.9336ZM8.99805 0.933594C6.78805 0.933594 4.99805 2.72359 4.99805 4.93359C4.99805 7.14359 6.78805 8.93359 8.99805 8.93359C11.208 8.93359 12.998 7.14359 12.998 4.93359C12.998 2.72359 11.208 0.933594 8.99805 0.933594ZM8.99805 10.9336C6.32805 10.9336 0.998047 12.2736 0.998047 14.9336V16.9336H16.998V14.9336C16.998 12.2736 11.668 10.9336 8.99805 10.9336Z" fill="white"/>
                      </Svg>             
                    </View>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>Personal Survey</Text>
                      <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>                
                        <Text style={styles.itemSubTitle}>4 questions  </Text>
                        <Image  
                                source={require('../../assets/red_dot.png')}
                            />             
                        <Text style={styles.itemSubTitle}>  to complete</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.divider}>
                  </View>
                  <Text style={styles.itemSubTitle}>This section contains personal survey questions</Text>
                </TouchableOpacity>

                <View style={{margin: 10}}>
                </View>

                <TouchableOpacity style={{padding: 5, backgroundColor:"white", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10}} activeOpacity={0.8}  onPress={() => {setStep(1)}}>
                  <View style={styles.item}>
                    <View style={styles.itemIcon}>
                      <Svg width={24} height={24}>
                        <Path d="M15.998 15.0536C15.238 15.0536 14.558 15.3536 14.038 15.8236L6.90805 11.6736C6.95805 11.4436 6.99805 11.2136 6.99805 10.9736C6.99805 10.7336 6.95805 10.5036 6.90805 10.2736L13.958 6.16357C14.498 6.66357 15.208 6.97357 15.998 6.97357C17.658 6.97357 18.998 5.63357 18.998 3.97357C18.998 2.31357 17.658 0.973572 15.998 0.973572C14.338 0.973572 12.998 2.31357 12.998 3.97357C12.998 4.21357 13.038 4.44357 13.088 4.67357L6.03805 8.78357C5.49805 8.28357 4.78805 7.97357 3.99805 7.97357C2.33805 7.97357 0.998047 9.31357 0.998047 10.9736C0.998047 12.6336 2.33805 13.9736 3.99805 13.9736C4.78805 13.9736 5.49805 13.6636 6.03805 13.1636L13.158 17.3236C13.108 17.5336 13.078 17.7536 13.078 17.9736C13.078 19.5836 14.388 20.8936 15.998 20.8936C17.608 20.8936 18.918 19.5836 18.918 17.9736C18.918 16.3636 17.608 15.0536 15.998 15.0536ZM15.998 2.97357C16.548 2.97357 16.998 3.42357 16.998 3.97357C16.998 4.52357 16.548 4.97357 15.998 4.97357C15.448 4.97357 14.998 4.52357 14.998 3.97357C14.998 3.42357 15.448 2.97357 15.998 2.97357ZM3.99805 11.9736C3.44805 11.9736 2.99805 11.5236 2.99805 10.9736C2.99805 10.4236 3.44805 9.97357 3.99805 9.97357C4.54805 9.97357 4.99805 10.4236 4.99805 10.9736C4.99805 11.5236 4.54805 11.9736 3.99805 11.9736ZM15.998 18.9936C15.448 18.9936 14.998 18.5436 14.998 17.9936C14.998 17.4436 15.448 16.9936 15.998 16.9936C16.548 16.9936 16.998 17.4436 16.998 17.9936C16.998 18.5436 16.548 18.9936 15.998 18.9936Z" fill="white"/>
                      </Svg>             
                    </View>
                    <View style={styles.itemTitleContainer}>
                      <Text style={styles.itemTitle}>Community Conditions</Text>   
                      <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>                
                        <Text style={styles.itemSubTitle}>15 questions  </Text>
                        <Image  
                                source={require('../../assets/red_dot.png')}
                            />             
                        <Text style={styles.itemSubTitle}>  6mins to complete</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.divider}>
                  </View>

                  <Text style={styles.itemSubTitle}>This section contains Commiunity survey questions</Text>
                </TouchableOpacity>

                <View style={{margin: 10}}>
                </View>

                <View style={{display:"flex", backgroundColor:"#e8e1f1", flexDirection:"row", borderColor:"#914FEC", borderRadius: 10, borderWidth: 1, padding: 10}}>
                  <Image    
                            style={{padding: 5, marginRight: 10, width: 15, aspectRatio: 1}}
                                source={require('../../assets/light.png')}
                          />    
                  <Text style={styles.itemLightSubTitle}>
                    Completing both questionaire gives you 50 pts! {"\n"}
                    This means you will be given verified badge, once {"\n"}
                    both questionaires are completed.
                  </Text>
                </View>

                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
                  
                    <LinearGradient
                      colors={['#9851F9',  'rgba(249, 81, 108, 0.8)']}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.button1Container}   
                    >
                      <TouchableOpacity  activeOpacity={0.9} onPress={() => console.log("")}>
                        <Text style={styles.button1Text}>Save to drafts</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  
                
                  <TouchableOpacity  activeOpacity={0.9} style={styles.button2Container} onPress={() => setStep(1)}>
                    <Text style={styles.button2Text}>Begin Survey</Text>
                  </TouchableOpacity>
                </View>
          </>
          :
          <>
              <View style={{marginTop: 20}}>
                    <Text style={styles.questionTitle}>
                    {selectedProduct?.questions && JSON.parse(selectedProduct?.questions)[step]?
                    JSON.parse(selectedProduct?.questions)[step]
                    :  "Which would you say are the biggest problems  (Local Causes) in your community? "
                    }
                    </Text>
                </View>
                <View style={{marginTop: 20, marginBottom: 20}}>
                    <Text>
                      Select 3 at most
                    </Text>
                </View>

                {selectedProduct?.answers && JSON.parse(selectedProduct?.answers)[step].map((item, index)=>(
                  <TouchableOpacity key = {index} style={{padding: 5, backgroundColor:"white", paddingHorizontal: 15, marginTop:10, marginBottom: 10, borderRadius: 10}} activeOpacity={0.8}  onPress={() => {
                    console.log("Checked successfully ")
                    }}>
                    <View style={styles.item}>
                      <View >
                          <Image  
                                  source={require('../../assets/check_false.png')}
                              />   
                      </View>
                      <View style={styles.itemTitleContainer}>
                          <Text style={styles.itemSubTitle}> {item}  </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}


                <View style={{margin: 10}}>
                </View>

                <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
                  
                    <LinearGradient
                      colors={['#9851F9',  'rgba(249, 81, 108, 0.8)']}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.button1Container}   
                    >
                      <TouchableOpacity  activeOpacity={0.9} onPress={() => setStep(step - 1)}>
                        <Text style={styles.button1Text}>Back</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                
                  <TouchableOpacity  activeOpacity={0.9} style={styles.button2Container} onPress={() => setStep(step + 1)}>
                    <Text style={styles.button2Text}>Continue</Text>
                  </TouchableOpacity>
                </View>
          </>
          }
        </View>
  );
};

const styles = StyleSheet.create<any>({
  itemContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    padding: "10%",
    paddingTop: 5,
    paddingBottom: "0%"  
  },

  bodyContainer: {
    alignItems: "center",
    width: "100%",
    padding: "10%",
    paddingBottom: "0%",
    paddingTop: "5%"
  },
  
  item :{
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10
  },
  
  itemIcon: {
    width: 35,
    height: 35,
    paddingTop: 5,
    paddingLeft: 5,
    display: "flex",
    backgroundColor: "#BC8BFF",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 5
  },

  itemTitleContainer: {   
    paddingLeft: 20,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "black"
  },

  itemSubTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#8A8A8A"
  },

  itemLightSubTitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#914FEC"
  },

  nftTitle: {
    fontSize:30,
    fontWeight: "600",
    color: "#463066",
    textAlign: "left",
    marginLeft: 5
  },

  questionTitle: {
    fontSize:20,
    fontWeight: "600",
    color: "#463066",
    textAlign: "left",
    marginLeft: 5
  },

  divider: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#0000001F",
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    width: "100%"
  },

  button1Container: {    
    backgroundColor: 'linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    width: "48%"
  },

  button1Text: {
    color: 'white',
  },

  
  button2Container: {
    borderColor: '#914FEC',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    width: "48%"
  },

  button2Text: {
    color: '#914FEC'
  },

})

export default SurveyItem;
