// DashboardBody.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { comingSoon } from "../../api";

const DashboardBody = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyTitleContainer}>
        <View>
          <Text numberOfLines={1} style={styles.nftsForSaleTitle}>
            Market Categories
          </Text>
        </View>
      </View>

      <View style={styles.item1Container}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("LocalCategory")}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text style={styles.itemText}>Local</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Category")}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text
            style={styles.itemText}
          >
            NFTS
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item1Container}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => comingSoon()}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text
            style={styles.itemText}
          >
            Memberships
          </Text>
          <Text
            style={styles.comingSoon}
          >
            COMING SOON
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => comingSoon()}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text
            style={styles.itemText}
          >
            Grocerie
          </Text>
          <Text
            style={styles.comingSoon}
          >
            COMING SOON
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item1Container}>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => comingSoon()}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text
            style={styles.itemText}
          >
            Bonus
          </Text>
          <Text
            style={styles.comingSoon}
          >
            COMING SOON
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.9}
          onPress={() => comingSoon()}
        >
          <Image
            source={require("../../assets/fake_nft.png")}
            style={styles.nftImage}
          />
          <Text
            style={styles.comingSoon}
          >
            COMING SOON
          </Text>
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
    paddingTop: "5%",
  },

  bodyTitleContainer: {
    textAlign: "left",
    alignSelf: "flex-start",
  },

  itemContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    marginTop: 10,
  },

  item1Container: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
  },

  item: {
    position: "relative",
    width: "50%",
    aspectRatio: 1,
  },

  itemText: {
    bottom: 20,
    left: 10,
    color: "white",
    position: "absolute",
  },

  comingSoon: {
    top: 20,
    left: 15,
    padding: 5,
    color: "black",
    fontWeight: "600",
    backgroundColor: "yellow",
    position: "absolute",
  }
});

export default DashboardBody;
