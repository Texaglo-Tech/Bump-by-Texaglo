// CollectiblesBody.tsx

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from "react-native";
import { getCollectibles, getUserIdFromToken } from "../../api";

const CollectiblesBody = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUserIdFromToken().then((res) => {
      const data = {
        user_id: res,
      };
      getCollectibles(data).then((re) => {
        if (re.success) {
          setProducts(re.message);
        }
      });
    });
  }, []);

  const openCollectible = (mintAddress) =>{
    Linking.openURL(`https://solscan.io/token/${mintAddress}?cluster=devnet`);
  }

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyTitleContainer}>
        <View>
          <Text numberOfLines={1} style={styles.nftsForSaleTitle}>
            Digital Collectibles
          </Text>
        </View>
      </View>

      <View style={styles.collectibleContainer}>
        {products &&
          products.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity  
                style={styles.collectibleItem}
                activeOpacity={0.9}
                onPress={() => openCollectible(item.metadata.onChain.mintHash)}
              >
                <Image
                  source={{ uri: `${item.metadata.metadata.image}` }}
                  style={styles.nftImage}
                />
                <Text
                  style={{
                    bottom: 10,
                    left: 10,
                    color: "white",
                    position: "absolute",
                  }}
                >
                  {item.metadata.metadata.name}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nftImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5
  },

  nftsForSaleTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#463066",
  },

  bodyContainer: {
    // alignItems: "center",
    width: "100%",
    padding: "10%",
    paddingBottom: "0%",
    paddingTop: "5%",
  },

  bodyTitleContainer: {
    textAlign: "left",
    alignSelf: "flex-start",
  },

  collectibleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },

  collectibleItem: {
    position: "relative",
    paddingBottom: 10,
    width: "48%",
    aspectRatio: 1,
  },
});

export default CollectiblesBody;
