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
import CountryPicker from "react-native-country-picker-modal";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import { useAccounts } from "../providers/AccountProvider";
import { sentCode, verifyCode } from "../api";

const SigninScreen = ({ navigation }) => {
  const { setAccountPhone } = useAccounts();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState<any>();
  const [countryPreCode, setCountryPreCode] = useState<any>();

  const [loading, setLoading] = useState(false);

  const handleChangePhone = (inputText) => {
    setPhone(inputText);
  };

  const handleChangeCode = (inputText) => {
    setCode(inputText);
  };

  const handleSentCode = async () => {
    console.log("clicked sentCode button->");
    if (!phone) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the phone number",
        autoClose: 5000,
      });
      return;
    }
    if (loading) return;
    setLoading(true);

    const data = {
      phone:countryCode?`+${countryPreCode}${phone.replace(/\s+/g, '')}`:`+1${phone.replace(/\s+/g, '')}`,
      option: "phone",
    };
    const response: any = await sentCode(data);
    console.log(response);
    setLoading(false);
    if (response.success) {
      setStep(2);
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: response?.message,
        autoClose: 5000,
      });
      return;
    }

    Toast.show({
      type: response.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.WARNING,
      title: response.success ? "Success" : "Info",
      textBody: response?.message,
      autoClose: 5000,
    });
  };

  const handleVerifyCode = async () => {
    console.log("clicked verification button->");

    if (!code) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the code",
        autoClose: 5000,
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    const data = {
      phone:countryCode?`+${countryPreCode}${phone.replace(/\s+/g, '')}`:`+1${phone.replace(/\s+/g, '')}`,
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
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: response?.message,
        autoClose: 5000,
      });
      return;
    }
  };

  const onSelect = (country: any) => {
    setCountryPreCode(country.callingCode[0]);
    setCountryCode(country.cca2)
    setShow(false);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/new_layout.png")}
        style={styles.backgroundImage}
      />
      <Text style={styles.centerTitle}>Bump-me</Text>
      {step == 1 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.centerSubTitle}>
            {"\n"} Enter your phone number stating with you area code {"\n"}
          </Text>         
          <View style={styles.phoneInputContainer}>
              <CountryPicker
                theme={{
                  onBackgroundTextColor: "white",
                  backgroundColor: "#788995",
                }}
                containerButtonStyle={styles.countryContainer}
                {...{
                  countryCode,
                  withFilter: true,
                  withFlag: false,
                  // withCountryNameButton,
                  withCallingCodeButton: true,
                  withFlagButton: false,
                  withAlphaFilter: true,
                  withCallingCode: true,
                  withEmoji: true,
                  placeholder: "  +1",
                  onSelect,
                }}
                visible={show}
              />
              <TextInput
                style={{color:"white"}}
                placeholderTextColor="white"
                placeholder="(817) 123 4567"
                value={phone}
                onChangeText={handleChangePhone}
              />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.signupContainer}
            onPress={() => handleSentCode()}
          >
            <Text style={styles.signupText}>Verify</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.centerSubTitle}>
            {"\n"} Enter The confirmation number {"\n"}
          </Text>
          <TextInput
              style={{color:"white", backgroundColor:"#39495D", borderRadius:15, textAlign:"center"}}
              placeholderTextColor="white"
              placeholder="######"
              value={code}
              onChangeText={handleChangeCode}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.signupContainer}
            onPress={() => handleVerifyCode()}
          >
            <Text style={styles.signupText}>Verify</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop:200,
    backgroundColor: "white",
    width: "80%",
    height: '30%',
    borderRadius:15,
    padding: 10,
  },

  centerTitle: {
    marginTop: 100,
    fontSize: 32, 
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },

  centerSubTitle: {
    fontSize: 12, 
    color: 'black',
    fontWeight: '200',
    textAlign: 'center',
  },  

  inputContainer: {
    backgroundColor:
      "linear-gradient(90.11deg, #9851F9 23.68%, rgba(249, 81, 108, 0.8) 128.98%)",
    alignItems: "flex-start",
    borderRadius: 4,
    marginBottom: 5,
    marginTop: 5,
  },

  signupContainer: {
    borderColor: "#DFD2C4",
    borderWidth: 1,
    backgroundColor: "#DFD2C4",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 12,
    marginBottom: 5,
    marginTop: 5,
  },

  signupText: {
    color: "white",
    fontSize:16,
    fontWeight:"600"
  },

  phoneInputContainer: {
    display: "flex",
    backgroundColor:"#39495D",
    borderRadius:15,
    color:"white",
    flexDirection: "row",
  },

  phoneCodeContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },

  phoneCode: {
    color: "white",
    fontSize: 20,
    width: 60,
    textAlign: "center",
  },

  countryContainer: {
    shadowColor: "white",
    paddingTop: 13,
    backgroundColor: "grey",
    height: 50,
    width:60,
    borderRadius:15,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default SigninScreen;
