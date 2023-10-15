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

const SignupScreen = ({ navigation }) => {
  const { setAccountPhone } = useAccounts();

  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

    if(username == ""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the username",
        autoClose: 5000,
      });
      return;
    }

    if(email == ""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the email",
        autoClose: 5000,
      });
      return;
    }

    if(phone == ""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the phone",
        autoClose: 5000,
      });
      return;
    }

    if(password == ""){
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Info",
        textBody: "Please input the password",
        autoClose: 5000,
      });
      return;
    }

    setLoading(true);

    const data = {
      phone,
      email,
      username,
      password,
    };
    const response: any = await signup(data);
    console.log(response);
    setLoading(false);
    // setAccountPhone("+1(108) 912")

    Toast.show({
      type: response.success ? ALERT_TYPE.SUCCESS : ALERT_TYPE.WARNING,
      title: response.success ? "Success" : "Info",
      textBody: response?.message,
      autoClose: 5000,
    });

    if(response.success){
      navigation.navigate("Home");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../assets/login1.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.centerContainer}>
        <Text style={styles.centerTitle}>
          {"\n"} Enter your Info {"\n"}
        </Text>
        <LinearGradient
          colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter your name"
            value={username}
            onChangeText={handleChangeUsername}
          />
        </LinearGradient>
        <LinearGradient
          colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={handleChangeEmail}
          />
        </LinearGradient>
        <LinearGradient
          colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter your phone"
            value={phone}
            onChangeText={handleChangePhone}
          />
        </LinearGradient>
        <LinearGradient
          colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={handleChangePassword}
          />
        </LinearGradient>

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
    fontSize: 20,
    color: "black",
    fontWeight: "500",
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

export default SignupScreen;
