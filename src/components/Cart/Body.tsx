// CartBody.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useAccounts } from "../../providers/AccountProvider";
import config from "../../config";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

const CartBody = ({ navigation }) => {
  const { cartHandle, cart } = useAccounts();

  const removeCart = (item) => {
    const new_cart = cart.filter(
      (data) => data?.product_id != item?.product_id
    );
    cartHandle(new_cart);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Thanks",
      textBody: "Successfully removed",
      autoClose: 5000,
    });
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyTitleContainer}>
        <View>
          <Text numberOfLines={1} style={styles.nftsForSaleTitle}>
            Product Cart
          </Text>
        </View>
      </View>
      {cart &&
        cart.map((item, index) => (
          <React.Fragment key={`product-cart-${index}`}>
            <View style={styles.cartItemContainer}>
              <TouchableOpacity
                style={styles.cartItemImgContainer}
                activeOpacity={0.9}
              >
                {item?.product_file != "" ? (
                  <Image
                    source={{ uri: `${config.API}/${item?.product_file}` }}
                    style={styles.nftImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/fake_nft.png")}
                    style={styles.nftImage}
                  />
                )}
                <Text style={styles.cartItemText}>
                  {item?.product_type == "local" ? "Local" : "NFT"}
                </Text>
              </TouchableOpacity>
              <View style={styles.cartProductContainer}>
                <Text style={styles.cartProductText}>{item?.product_name}</Text>
                <Text numberOfLines={4} style={styles.cartProductDescText}>
                  {item?.product_desc}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    removeCart(item);
                  }}
                >
                  <LinearGradient
                    colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.removeButtonConainer}
                  >
                    <Text style={styles.removeButtonText}>
                      Remove From Cart
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        ))}
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

  cartItemContainer: {
    backgroundColor: "#D9D9D969",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    marginTop: 10,
  },

  cartItemImgContainer: {
    position: "relative",
    width: "50%",
    aspectRatio: 1,
  },

  cartItemText: {
    bottom: 20,
    left: 10,
    color: "white",
    position: "absolute",
  },

  removeButtonConainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 2,
    marginBottom: 0,
    marginTop: 0,
    width: "80%",
    alignSelf: "center",
  },

  cartProductContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    width: "50%",
    aspectRatio: 1,
  },

  cartProductText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },

  cartProductDescText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  removeButtonText: {
    color: "white",
  },
});

export default CartBody;
