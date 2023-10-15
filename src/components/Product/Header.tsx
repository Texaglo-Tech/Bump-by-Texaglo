// ProductHeader.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import NavbarMenu from "../NavbarMenu";
import { useAccounts } from "../../providers/AccountProvider";
import config from "../../config";

const ProductHeader = ({ navigation }) => {
  const { selectedProduct } = useAccounts();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.navbarContainer}>
        <Text style={styles.headerTitle}>   {selectedProduct?.product_name}</Text>
        <NavbarMenu navigation={navigation} />
      </View>

      <View style={styles.giftImage}>
        {selectedProduct?.product_file != "" ? (
          <Image
            source={{ uri: `${config.API}/${selectedProduct?.product_file}` }}
            style={styles.backgroundImage}
          />
        ) : (
          <Image
            source={require("../../assets/product_header.png")}
            style={styles.backgroundImage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#9851F9",
    width: "100%",
    padding: 20,
    position: "relative",
  },

  giftImage: {
    alignContent: "center",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  backgroundImage: {
    width: "95%",
    height: 200,
    resizeMode: "stretch"
  },

  menu: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    paddingTop: 0,
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
    textAlign: "left",
  },
});

export default ProductHeader;
