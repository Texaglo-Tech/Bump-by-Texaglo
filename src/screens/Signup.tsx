// SignupScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import { useAccounts } from "../providers/AccountProvider";
import { signup } from "../api";
import CountryPicker from "react-native-country-picker-modal";

const SignupScreen = ({ navigation }) => {
  const { setAccountPhone } = useAccounts();

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState<any>();
  const [countryPreCode, setCountryPreCode] = useState<any>();

  const handleChangePhone = (inputText) => {
    setPhone(inputText);
  };

  const handleChangeEmail = (inputText) => {
    setEmail(inputText);
  };

  const handleChangeUsername = (inputText) => {
    setUsername(inputText);
  };

  const handleChangePassword = (inputText) => {
    setPassword(inputText);
  };

  const handleSignup = async () => {
    console.log("clicked signup button->");
    if (loading) return;

    if (username == "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the username",
        autoClose: 5000,
      });
      return;
    }

    if (email == "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the email",
        autoClose: 5000,
      });
      return;
    }    

    if (password == "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the password",
        autoClose: 5000,
      });
      return;
    }

    if (phone == "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the phone",
        autoClose: 5000,
      });
      return;
    }

    setLoading(true);

    const data = {
      phone:countryCode?`+${countryPreCode}${phone.replace(/\s+/g, '')}`:`+1${phone.replace(/\s+/g, '')}`,
      email,
      username,
      password,
    };
    const response: any = await signup(data);
    console.log(response);
    setLoading(false);
    Toast.show({
      type: response.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.WARNING,
      title: response.success ? "Success" : "Info",
      textBody: response?.message,
      autoClose: 5000,
    });

    if (response.success) {
      navigation.navigate("Home");
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
      <Text style={styles.centerTitle}>
        {"\n"} Bump 
      </Text>
      <View style={styles.centerContainer}>
        <Text style={styles.centerSubTitle}>
          Signup to Bump Market {"\n"}
        </Text>
        <TextInput
          placeholder="Name"
          value={username}
          onChangeText={handleChangeUsername}
          style={styles.inputContainer}
          placeholderTextColor="white"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleChangeEmail}
          style={styles.inputContainer}
          placeholderTextColor="white"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={handleChangePassword}
          style={styles.inputContainer}
          placeholderTextColor="white"
        />

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
          onPress={() => handleSignup()}
        >
          <Text style={styles.signupText}>SignUp</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#D9D9D98A",
    width: "80%",
    padding: 10,
  },

  centerTitle: {
    marginTop: 70,
    fontSize: 32,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },

  centerSubTitle: {
    fontSize: 12,
    color: "black",
    fontWeight: "200",
    textAlign: "center",
  },

  inputContainer: {
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    color: "white",
    backgroundColor: "#39495D",
    borderRadius: 15,
    textAlign: "center",
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
  },

  phoneInputContainer: {
    display: "flex",
    backgroundColor:"#39495D",
    borderRadius:15,
    color:"white",
    flexDirection: "row",
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

export default SignupScreen;
