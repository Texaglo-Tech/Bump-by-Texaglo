// ProductScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Animated,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Tts from "react-native-tts";
import Voice from "@react-native-community/voice";
import { useAccounts } from "../../providers/AccountProvider";
import Dialog from "react-native-dialog";

import {
  aiChat,
  comingSoon,
  encryptMessage,
  getUserIdFromToken,
} from "../../api";
import config from "../../config";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import Payment from '../Payment';

const Buffer = require("@craftzdog/react-native-buffer").Buffer;

const ProductBody = ({ navigation }) => {
  const { selectedProduct, stripeHandle } = useAccounts();
  const [visible, setVisible] = useState(false);

  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState(true);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [result, setResult] = useState("");

  const [ cartData, setCartData] = useState("");

  const payHandle = async () => {
    const user_id = await getUserIdFromToken();
    const data = {
      user_id,
      products: [selectedProduct?.product_id],
      total_amount: selectedProduct?.product_cost,
      products_img: [selectedProduct?.product_file],
      products_cost: [selectedProduct?.product_cost],
    };
    setCartData(JSON.stringify(data))
    stripeHandle();
    return;
    const encodedData = Buffer.from(JSON.stringify(data)).toString("base64");
    const key = encryptMessage(encodedData, 5);
    Linking.openURL(`${config.CROSSMINT_PAYMENT}/?${key}`);
  };

  const onSpeechStart = (e) => {
    setStarted(true);
  };
  const onSpeechEnd = () => {
    setStarted(null);
    setEnd(true);
    startSpeechRecognizing();
  };
  const onSpeechError = (e) => {
    setError(JSON.stringify(e.error));
    startSpeechRecognizing();
  };
  const onSpeechResults = (e) => {
    console.log(e.value);
    setResult(e.value[0]);
    // Toast.show({
    //   type: ALERT_TYPE.SUCCESS,
    //   title: "Success",
    //   textBody: e.value[0],
    //   autoClose: 5000,
    // });
  };
  const onSpeechPartialResults = (e) => {
    console.log(e.value);
    setPartialResults(e.value);
  };
  const onSpeechVolumeChanged = (e) => {
    setPitch(e.value);
  };

  const startSpeechRecognizing = async () => {
    setPitch("");
    setError("");
    setStarted(true);
    setResults([]);
    setPartialResults([]);
    setEnd(false);
    try {
      console.log("speech recongize starting...");
      await Voice.start("en-US");
    } catch (e) {
      console.log("speech recongize starting issue...");
      console.error(e);
    }
  };

  const stopSpeechRecognizing = async () => {
    try {
      setStarted(false);
      setEnd(true);
      await Voice.stop();
      setStarted(null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (
      result != "" &&
      (result.toLowerCase().includes("casper") ||
        result.toLowerCase().includes("caspher")) &&
      !visible
    ) {
      setVisible(true);
      Tts.speak("Hi I'm Casper how can I help you");
    }
    if (
      result != "" &&
      (result.toLowerCase().includes("turn off") ||
        result.toLowerCase().includes("turnoff"))
    ) {
      setVisible(true);
      Tts.speak("Ok, Mic is closed");
      setVisible(false);
      stopSpeechRecognizing();
    }
    if (result != "" && visible) {
      const data = {
        msg: result,
        product_id: selectedProduct?.product_id,
        type: "chatpdf",
      };
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Bot Say",
        textBody: "Hi, plz wait",
        autoClose: 5000,
      });

      aiChat(data).then((data) => {
        if (data.success) {
          Tts.speak(data.data);
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Info",
            textBody: data.message,
            autoClose: 5000,
          });
          Tts.speak(data.message);
        }
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Bot Say",
          textBody: "Bot answered, ok?, plz tell again",
          autoClose: 5000,
        });
      });
    }
  }, [result]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    startSpeechRecognizing();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.productInfoTitle}>
        <View>
          <Image source={require("../../assets/product_bg.png")} />
        </View>
        <View
          style={{
            borderRightColor: "#00000026",
            borderRightWidth: 1,
            paddingRight: 10,
          }}
        >
          <Text style={styles.pointsTitle}>Points Cost</Text>
          <Text style={styles.pointsValueTitle}>
            {selectedProduct?.product_cost}
          </Text>
        </View>
        <View>
          <Text style={styles.pointsTitle}>Dollar Value</Text>
          <Text style={styles.pointsValueTitle}>
            ${selectedProduct?.product_cost}
          </Text>
        </View>
      </View>

      <View style={styles.productDescriptionContainer}>
        <Image
          source={require("../../assets/refresh.png")}
          style={{ marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#515EF9", fontSize: 16, fontWeight: "600" }}>
            Product Description
          </Text>
          <Text
            style={{ color: "#515EF9", fontSize: 12, fontWeight: "400" }}
            numberOfLines={5}
          >
            {selectedProduct.product_desc}
          </Text>
        </View>
      </View>

      <View style={styles.inviteLinkContainer}>
        <TouchableOpacity
          style={{ width: "48%", marginRight: 5 }}
          activeOpacity={0.9}
          onPress={() => {
            payHandle();
            // startSpeechRecognizing();
          }}
        >
          <LinearGradient
            colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginContainer}
          >
            <Image source={require("../../assets/coin.png")} />
            <Text style={styles.loginText}>Buy With Points</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.signupContainer}
          onPress={() => {
            payHandle();
            // stopSpeechRecognizing()
          }}
        >
          <Text style={styles.signupText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productItemContainer}>
        <ScrollView horizontal={true} style={{ padding: 0, margin: 0 }}>
          {selectedProduct?.item_imgs &&
            selectedProduct?.item_imgs.map((item, index) => (
              <React.Fragment key={`item - ${index}`}>
                <TouchableOpacity
                  style={styles.productItem}
                  activeOpacity={0.9}
                  onPress={() => {
                    console.log("clicked item..");
                  }}
                >
                  {item !== "" ? (
                    <Image
                      source={{ uri: `${config.API}/${item}` }}
                      style={styles.nftImage}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/fake_nft.png")}
                      style={styles.nftImage}
                    />
                  )}
                </TouchableOpacity>
              </React.Fragment>
            ))}
        </ScrollView>
      </View>

      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => comingSoon()}>
          <LinearGradient
            colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.membershipContainer}
          >
            <Text style={styles.loginText}>Join Membership </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.productDescriptionContainer}>
        <Image
          source={require("../../assets/refresh.png")}
          style={{ marginRight: 10 }}
        />
        <View>
          <Text style={{ color: "#515EF9", fontSize: 16, fontWeight: "600" }}>
            Members get{" "}
          </Text>
          <Text
            style={{
              color: "#515EF9",
              fontSize: 12,
              fontWeight: "400",
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            Access to exclusive items and discounts{"\n"}
            on product offers fom this Vendor
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.similarItemTitle}>Simular items</Text>
      </View>

      <View style={styles.itemContainer}>
        {Array.from(new Array(4)).map((item, index) => (
          <React.Fragment key={`item-img-${index}`}>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.9}
              onPress={() => {
                console.log("clicked gmail..");
              }}
            >
              <View
                style={{
                  backgroundColor: "#EFEFEF",
                  borderRadius: 45,
                  width: "50%",
                  position: "relative",
                  aspectRatio: 1,
                }}
              >
                <Image
                  source={require("../../assets/gift_product.png")}
                  style={{
                    width: 40,
                    height: 40,
                    position: "absolute",
                    top: "25%",
                    left: "23%",
                  }}
                />
              </View>
              <Text style={{ color: "#7B31E1", marginTop: 5 }}>
                Item {index + 1}
              </Text>
              <Text style={{ color: "grey" }}>Product Name</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>

      <Dialog.Container visible={visible} contentStyle={styles.casperWrapper}>
        <Image source={require("../../assets/sound.gif")} style={styles.soundEffect} />
        <Text style={styles.casperTitle}>How can I assit ?</Text>
        <Text style={styles.signupText}>Casper is thinking... {"\n"}</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.casperContainer}
          onPress={() => {
            setVisible(false);
            // stopSpeechRecognizing();
          }}
        >
          <Text style={styles.signupText}>Stop and Close</Text>
        </TouchableOpacity>
      </Dialog.Container>
      <Payment cartData={cartData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    top: -50,
    margin: 20,
    width: "80%",
    height: "100%",
  },

  inviteLinkContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  membershipContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    display: "flex",
  },

  loginContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },

  loginText: {
    display: "flex",
    color: "white",
    fontWeight: "600",
    paddingLeft: 3,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  signupContainer: {
    backgroundColor: "#24FF54",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    width: "48%",
  },

  casperContainer: {
    backgroundColor: "#ECAF3A",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
    width: "70%",
    justifyContent: "center",
  },

  signupText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },

  pointsValueTitle: {
    fontSize: 34,
    fontWeight: "600",
    color: "black",
  },

  similarItemTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "600",
    color: "#323232",
  },

  pointsTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#565656",
  },

  nftImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  itemContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },

  item: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: "2%",
    marginTop: "2%",
    width: "48%",
    aspectRatio: 1,
  },

  productInfoTitle: {
    display: "flex",
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
    borderColor: "#F9516C",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },

  productDescriptionContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 15,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#515EF933",
    borderRadius: 10,
  },

  productItemContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },

  productItem: {
    position: "relative",
    width: 150,
    aspectRatio: 1,
    borderRadius: 10,
  },

  casperTitle: {
    textAlign: "center",
    fontSize: 35,
    color: "white",
    fontWeight: "500",
  },

  casperWrapper: {
    backgroundColor: "#029ECE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#9851F9",
    borderWidth: 2,
  },

  soundEffect: {
    width: 150,
    height: 50,
    marginTop: 15,
    backgroundColor: "transparent",
  },
});

export default ProductBody;
