// ScanBody.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import LinearGradient from "react-native-linear-gradient";

import {
  comingSoon,
  getProduct,
  getUserIdFromToken,
  sentMsgToOwner,
  refundPurchase,
  encryptMessage,
} from "../../api";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { useAccounts } from "../../providers/AccountProvider";

import { Dialog, Button, Input } from "react-native-elements";
import Payment from '../Payment';

import config from "../../config";
// Pre-step, call this before any NFC operations
NfcManager.start();

const ScanBody = ({ navigation }) => {
  const { products, selectedProduct, cartHandle, cart, selectedProductHandle, stripeHandle } =
    useAccounts();

  const [visible, setVisible] = useState(true);
  const [product, setProduct] = useState<any>();
  const [userId, setUserId] = useState<any>("");

  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [ cartData, setCartData] = useState("");

  const showModal = () => setVisibleMessage(true);
  const hideModal = () => setVisibleMessage(false);

  useEffect(() => {
    getUserIdFromToken().then((data) => {
      setUserId(data);
    });
  }, []);

  const readNdef = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const tag = await NfcManager.getTag();
      console.log("Tag found", tag);
    } catch (ex) {
      console.log("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const onSuccess = async (e: any) => {
    const scan_data: any = e.data;
    console.log(`scanned data`, scan_data);
    const product_id = scan_data.split("product/")[1];
    const user_id = await getUserIdFromToken();
    if (product_id && product_id != "") {
      const data = {
        product_id,
        type: "app",
        user_id,
      };
      getProduct(data).then((product) => {
        if (product.success) {
          setProduct(product.data);
          if (
            product?.data?.payment_status == 1 &&
            userId &&
            userId == product?.data?.buyer_id
          ) {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: "Thanks",
              textBody: "Confirmed payment",
              autoClose: 5000,
            });
          }
        }
      });
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Info",
        textBody: "No Texaglo Product",
        autoClose: 5000,
      });
    }

    setVisible(false);
  };

  const addCart = () => {
    let exist = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]?.product_id == product?.product_id) {
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
    data.push(product);
    cartHandle(data);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Thanks",
      textBody: "Successfully added",
      autoClose: 5000,
    });
  };

  const button1Handle = () => {
    if (product?.payment_status == 0) {
      // unclaimed  "ADD TO CART"
      addCart();
    }
    if (userId && userId != product?.buyer_id && product?.payment_status == 1) {
      // claimed  "Similar Items"
      navigation.navigate("Dashboard");
    }
    if (userId && userId == product?.buyer_id && product?.payment_status == 1) {
      // unpaid  "Open Scanner"
      setVisible(true);
    }
    if (userId && userId == product?.buy_id && product?.payment_status == 2) {
      // paid  "Continue Shopping"
      navigation.navigate("Dashboard");
    }
    setVisible(false);
  };

  const sendMessage = () => {
    if (message == "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Thanks",
        textBody: "Please input the message",
        autoClose: 5000,
      });
      return;
    }
    // api call
    const data = {
      product_id: product?.product_id,
      message,
    };
  };

  const button2Handle = () => {
    if (product?.payment_status == 0) {
      // unclaimed  "OPEN PAGE"
      selectedProductHandle(product);
      navigation.navigate("Product");
    }
    if (userId && userId == product?.buy_id && product?.payment_status == 1) {
      // claimed  "Message Owner"
      comingSoon();
      showModal();
    }
    if (userId && userId == product?.buy_id && product?.payment_status == 1) {
      // unpaid  "Refund Purchase"
      const data = {
        product_id: product?.product_id,
      };
      const res: any = refundPurchase(data);
      Toast.show({
        type: res.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.DANGER,
        title: "Thanks",
        textBody: res.success ? "Successfully requested refund" : res.message,
        autoClose: 5000,
      });
    }
    if (userId && userId == product?.buy_id && product?.payment_status == 2) {
      // paid  "Collectibles"
      navigation.navigate("Collectibles");
    }
    setVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      readNdef();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.bodyTitleContainer}>
        <View>
          {visible ? (
            <Text numberOfLines={1} style={styles.nftsForSaleTitle}>
              Scan to confirm purchase
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View>
        {visible ? (
          <QRCodeScanner
            cameraContainerStyle={{
              top: "-15%",
              left: "-3.1%",
              aspectRatio: 1,
              padding: "10%",
            }}
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
          />
        ) : (
          <View
            style={{ padding: 10, backgroundColor: "white", borderRadius: 10 }}
          >
            {product?.product_file != "" ? (
              <Image
                source={{ uri: `${config.API}/${product?.product_file}` }}
                style={{ width: "100%", marginBottom: 30 }}
              />
            ) : (
              <Image
                source={require("../../assets/product.png")}
                style={{ width: "100%", marginBottom: 30 }}
              />
            )}
            {product?.payment_status == 0 ? ( // unclaimed
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    const data = {
                      user_id: userId,
                      products: [product?.product_id],
                      total_amount: product?.product_cost,
                      products_img: [product?.product_file],
                      products_cost: [product?.product_cost],
                    }
                    setCartData(JSON.stringify(data))
                    stripeHandle();

                    return;
                    const encodedData = Buffer.from(
                      JSON.stringify(data)
                    ).toString("base64");
                    console.log(encryptMessage(encodedData, 5));
                    comingSoon();
                  }}
                >
                  <LinearGradient
                    colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buyContainer}
                  >
                    <Text style={styles.loginText}>BUY NOW</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "black",
                fontWeight: "500",
              }}
            >
              {product?.payment_status == 0 // unclaimed
                ? product?.product_name
                : null}
              {userId &&
              userId != product?.buy_id &&
              product?.payment_status == 1 // claimed
                ? "This product is reserved"
                : null}
              {userId &&
              userId == product?.buy_id &&
              product?.payment_status == 1 // unpaid
                ? "Purchase is complete"
                : null}
              {userId &&
              userId == product?.buy_id &&
              product?.payment_status == 2 // paid
                ? "You are the owner"
                : null}
              {userId &&
              userId != product?.buy_id &&
              product?.payment_status == 2 // paid
                ? "Check another product"
                : null}
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                marginBottom: 10,
                overflow: "hidden",
              }}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              {product?.payment_status == 0 // unclaimed
                ? product?.product_desc
                : null}
              {userId &&
              userId != product?.buy_id &&
              product?.payment_status == 1 // claimed
                ? "sorry but this product has been purchased and is reserved for another member please purchase another item or speak to the owner"
                : null}
              {userId &&
              userId == product?.buy_id &&
              product?.payment_status == 1 // unpaid
                ? "your purchase is  almost complete you must now retrieve the product and scan the qr code or bump the nfc to confirm receipt of the product and receive points "
                : null}
              {userId &&
              userId == product?.buy_id &&
              product?.payment_status == 2 // paid
                ? "You have confirmed receipt of the item, funds will be released to the seller and you will receive a nft as a collectible receipt "
                : null}
              {userId &&
              userId != product?.buy_id &&
              product?.payment_status == 2 // paid
                ? "This product is already sold, plz find another product"
                : null}
            </Text>
            <View
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <TouchableOpacity
                style={{ width: "50%", paddingRight: 3 }}
                activeOpacity={0.9}
                onPress={() => {
                  button1Handle();
                }}
              >
                <LinearGradient
                  colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginContainer}
                >
                  <Text style={styles.loginText}>
                    {product?.payment_status == 0 // unclaimed
                      ? "ADD TO CART"
                      : null}
                    {userId &&
                    userId != product?.buy_id &&
                    product?.payment_status == 1 // claimed
                      ? "Similar Items"
                      : null}
                    {userId &&
                    userId == product?.buy_id &&
                    product?.payment_status == 1 // unpaid
                      ? "Open Scanner"
                      : null}
                    {product?.payment_status == 2 // paid
                      ? "Continue Shopping"
                      : null}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "50%", paddingLeft: 3 }}
                activeOpacity={0.9}
                onPress={() => {
                  button2Handle();
                }}
              >
                <LinearGradient
                  colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginContainer}
                >
                  <Text style={styles.loginText}>
                    {product?.payment_status == 0 // unclaimed
                      ? "OPEN PAGE"
                      : null}
                    {userId &&
                    userId != product?.buy_id &&
                    product?.payment_status == 1 // claimed
                      ? "Message Owner"
                      : null}
                    {userId &&
                    userId == product?.buy_id &&
                    product?.payment_status == 1 // unpaid
                      ? "Refund Purchase"
                      : null}
                    {product?.payment_status == 2 // paid
                      ? "Collectibles"
                      : null}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {/* <TouchableOpacity
                  style={{ width: "100%", paddingRight: 3 }}
                  activeOpacity={0.9}
                  onPress={() => {
                    comingSoon();
                  }}
                >
                  <LinearGradient
                    colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginContainer}
                  >
                    <Text style={styles.loginText}>Link</Text>
                  </LinearGradient>
                </TouchableOpacity> */}

              {product?.product_link ? (
                <TouchableOpacity
                  style={{ width: "100%", paddingRight: 3 }}
                  activeOpacity={0.9}
                  onPress={() => {
                    Linking.openURL(product?.product_link);
                  }}
                >
                  <LinearGradient
                    colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginContainer}
                  >
                    <Text style={styles.loginText}>WebSite</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : null}

              {product?.survey ? (
                <TouchableOpacity
                  style={{ width: "100%", paddingRight: 3 }}
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate("Survey");
                  }}
                >
                  <LinearGradient
                    colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginContainer}
                  >
                    <Text style={styles.loginText}>Survey</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
        <Dialog
          isVisible={visibleMessage}
          onBackdropPress={hideModal}
          style={styles.containerStyle}
        >
          <Text>Message To:</Text>
          <Input
            placeholder="Please message"
            onChangeText={(text) => {
              setMessage(text);
            }}
          />
          <Button
            onPress={() => sendMessage()}
            title="Send"
            buttonStyle={{
              backgroundColor: "rgba(78, 116, 289, 1)",
              borderRadius: 5,
            }}
            containerStyle={{
              width: "100%",
            }}
          />
        </Dialog>
      </View>
      <Payment cartData={cartData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    margin: 20,
    justifyContent: "center",
    padding: 20,
    flexDirection: "column",
    display: "flex",
  },

  nftImage: {
    width: "100%",
    height: "100%",
  },

  nftsForSaleTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#463066",
  },

  bodyTitleContainer: {
    display: "flex",
    flexDirection: "row",
  },

  bodyContainer: {
    alignItems: "center",
    width: "100%",
    padding: "10%",
    paddingBottom: "0%",
    paddingTop: "5%",
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

  loginContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
  },

  loginText: {
    color: "white",
  },
});

export default ScanBody;
