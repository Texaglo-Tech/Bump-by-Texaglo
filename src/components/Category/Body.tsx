// CategoryBody.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Dialog from "react-native-dialog";
import { getUserIdFromToken, encryptMessage } from "../../api";

import { useAccounts } from "../../providers/AccountProvider";
import config from "../../config";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

const Buffer = require("@craftzdog/react-native-buffer").Buffer;

const CategoryBody = ({ navigation }) => {
  const { products, selectedProduct, cartHandle, cart, selectedProductHandle } =
    useAccounts();
  const [detailVisible, setDetailVisible] = useState(false);
  const [rest, setRest] = useState(0);

  const addCart = () => {
    let exist = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]?.product_id == selectedProduct?.product_id) {
        exist = true;
        break;
      }
    }

    if (exist) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Thanks",
        textBody: "Already added",
        autoClose: 5000,
      });
      return;
    }

    const data = [...cart];
    data.push(selectedProduct);
    cartHandle(data);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Thanks",
      textBody: "Successfully added",
      autoClose: 5000,
    });
  };

  const payHandle = async () => {
    const user_id = await getUserIdFromToken();
    const data = {
      user_id,
      products: [selectedProduct?.product_id],
    };
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const key = encryptMessage(encodedData, 5);
    console.log("encryptKey", key);
    Linking.openURL(`${config.CROSSMINT_PAYMENT}/?${key}`);
  };

  useEffect(() => {
    if (products) {
      let cnt = 0;
      for (let i = 0; i < products.length; i++) {
        if (products[i]?.product_type == "digital") cnt++;
      }
      setRest(3 - (cnt % 3));
    }
  }, [products]);

  return (
    <>
      <View style={styles.bodyContainer}>
        <View style={styles.bodyTitleContainer}>
          <View>
            <Text numberOfLines={1} style={styles.nftsForSaleTitle}>
              NFTs for sale
            </Text>
          </View>
        </View>

        <View style={styles.nftContainer}>
          {products.map((item, index) => {
            if (item?.product_type == "digital")
              return (
                <View style={styles.nftItem} key={index}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setDetailVisible(true);
                      selectedProductHandle(item);
                    }}
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
                    <Text
                      style={styles.productName}
                    >
                      {item?.product_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
          })}

          {rest > 0 &&
            Array.from(new Array(rest)).map((item, index) => (
              <View style={styles.nftItem} key={index}>
                <TouchableOpacity activeOpacity={0.9}></TouchableOpacity>
              </View>
            ))}
        </View>
      </View>

      <Dialog.Container visible={detailVisible}>
        {selectedProduct?.product_file != "" ? (
          <Image
            source={{ uri: `${config.API}/${selectedProduct?.product_file}` }}
            style={styles.dialogProductImg}
          />
        ) : (
          <Image source={require("../../assets/product.png")} style={styles.dialogProductFakeImg} />
        )}
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setDetailVisible(false);
              payHandle();
            }}
          >
            <LinearGradient
              colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buyContainer}
            >
              <Text style={styles.buttonText}>BUY NOW</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.dialogProductText}>
          {selectedProduct?.product_name}
        </Text>
        <Text style={styles.dialogProductDesc}>
          {selectedProduct?.product_desc}
        </Text>
        <View style={styles.buttonGroupContainer}>
          <TouchableOpacity
            style={styles.button1Container}
            activeOpacity={0.9}
            onPress={() => {
              setDetailVisible(false);
              addCart();
            }}
          >
            <LinearGradient
              colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2Container}
            activeOpacity={0.9}
            onPress={() => {
              setDetailVisible(false);
              navigation.navigate("Product");
            }}
          >
            <LinearGradient
              colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>OPEN PAGE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    </>
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

  buyContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 1,
    marginBottom: 5,
    marginTop: 5,
    width: "30%",
    alignSelf: "center",
  },

  nftContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },

  nftItem: {
    position: "relative",
    paddingBottom: 10,
    width: "30%",
    aspectRatio: 1,
  },

  productName: {
    bottom: 10,
    left: 10,
    color: "red",
    position: "absolute",
  },

  buttonContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
  },

  dialogProductImg: {
    width: "100%",
    height: 200,
    marginBottom: 30,
    resizeMode: "stretch",
  },

  dialogProductFakeImg: {
    width: "100%",
    marginBottom: 30,
  },

  dialogProductDesc: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  dialogProductText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },

  buttonGroupContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  button1Container: {
    width: "50%",
    paddingRight: 3,
  },

  button2Container: {
    width: "50%",
    paddingLeft: 3,
  },

  buttonText: {
    color: "white",
  },
});

export default CategoryBody;
