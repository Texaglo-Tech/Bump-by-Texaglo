// SigninScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import { useAccounts } from "../providers/AccountProvider";
import { sentCode, verifyCode } from "../api";

const SigninScreen = ({ navigation }) => {
  const { setAccountPhone } = useAccounts();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleChangePhone = (inputText) => {
    setPhone(inputText);
  };

  const handleChangeCode = (inputText) => {
    setCode(inputText);
  };

  const handleSentCode = async () => {
    console.log("clicked sentCode button->");
    if(!phone){
      Toast.show({
        type:  ALERT_TYPE.WARNING,
        title:"Info",
        textBody: "Please input the phone number",
        autoClose: 5000,
      });
      return;
    }
    if (loading) return;
    setLoading(true);

    const data = {
      phone,
      option: "phone",
    };
    const response: any = await sentCode(data);
    console.log(response);
    setLoading(false);
    if (response.success) {
      setStep(2);
      // navigation.navigate('Dashboard') // test
    }else{
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: response?.message,
        autoClose: 5000,
      });
      return;
    }

    // setStep(2); // test

    Toast.show({
      type: response.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.WARNING,
      title: response.success ? "Success" : "Info",
      textBody: response?.message,
      autoClose: 5000,
    });
  };

  const handleVerifyCode = async () => {
    console.log("clicked verification button->");

    if(!code){
      Toast.show({
        type:  ALERT_TYPE.WARNING,
        title:"Info",
        textBody: "Please input the code",
        autoClose: 5000,
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    const data = {
      phone,
      code,
    };
    const response: any = await verifyCode(data);
    console.log(response);
    setLoading(false);
    
    if (!response.success) setStep(step + 1);
    if (step > 5) setStep(1);

    Toast.show({
      type: response.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.WARNING,
      title: response.success ? "Success" : "Info",
      textBody: response?.message,
      autoClose: 5000,
    });

    if (response.success) {
      setAccountPhone(phone);
      navigation.navigate("Dashboard");
    }else{
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: response?.message,
        autoClose: 5000,
      });
      return;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/login1.png")}
        style={styles.backgroundImage}
      />
      {step == 1 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.centerTitle}>
            {"\n"} Enter your Phone Number {"\n"}
          </Text>
          <LinearGradient
            colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputContainer}
          >
            <TextInput
              placeholder="+1 (817) 123 4567"
              value={phone}
              onChangeText={handleChangePhone}
            />
          </LinearGradient>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.signupContainer}
            onPress={() => handleSentCode()}
          >
            <Text style={styles.signupText}>Get Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.centerTitle}>
            {"\n"} Enter your Confirmation Code {"\n"}
          </Text>
          <LinearGradient
            colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputContainer}
          >
            <TextInput
              placeholder="######"
              value={code}
              onChangeText={handleChangeCode}
            />
          </LinearGradient>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.signupContainer}
            onPress={() => handleVerifyCode()}
          >
            <Text style={styles.signupText}>Verify Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  centerContainer: {
    backgroundColor: "#D9D9D98A",
    width: "80%",
    padding: 10,
  },

  centerTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },

  centerSubTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "400",
    textAlign: "center",
  },

  inputContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 5,
  },

  signupContainer: {
    borderColor: "#914FEC",
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
  },

  signupText: {
    color: "#914FEC",
  },
});

export default SigninScreen;
