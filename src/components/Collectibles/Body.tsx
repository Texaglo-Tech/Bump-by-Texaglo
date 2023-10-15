// CollectiblesBody.tsx

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';

const CollectiblesBody = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
        <View style={styles.bodyContainer}>
            <View style={styles.bodyTitleContainer}>
              <View>
                <Text numberOfLines={1} style={styles.nftsForSaleTitle}>Digital Collectibles</Text>
              </View>
            </View>

            <View style={styles.collectibleContainer}>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                  <Text style={{bottom: 10, left: 10, color:"white", position:"absolute"}}>NFT1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                  <Text style={{bottom: 10, left: 10, color:"white", position:"absolute"}}>NFT1</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.collectibleContainer}>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                  <Text style={{bottom: 10, left: 10, color:"white", position:"absolute"}}>NFT1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                  <Text style={{bottom: 10, left: 10, color:"white", position:"absolute"}}>NFT1</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.collectibleContainer}>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                  <Text style={{bottom: 10, left: 10, color:"white", position:"absolute"}}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.collectibleItem} activeOpacity={0.9} onPress={() => console.log("clicked collectibleItem..")}>
                  <Image
                    source={require('../../assets/fake_nft.png')}
                    style={styles.nftImage}
                  />
                </TouchableOpacity>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
  nftImage: {
    width: "100%",
    height: "100%",
  },

  nftsForSaleTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#463066",
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

  collectibleContainer: {
    display:"flex", 
    flexDirection:"row",
    margin: 0, 
    padding: 0, 
    justifyContent: "space-between", 
    marginBottom:10, 
    marginTop:10
  },

  collectibleItem: {
    position:"relative", 
    paddingBottom: 10, 
    width: "50%", 
    aspectRatio: 1
  }

});

export default CollectiblesBody;
