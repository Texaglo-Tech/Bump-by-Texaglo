// InviteBody.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Clipboard
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import config from "../../config";
import { comingSoon, getUserIdFromToken } from "../../api";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";

const InviteBody = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(()=>{
    getUserIdFromToken().then(data=>{ 
      setUserId(data);
    })
  }, [])

  const copyHandle = ()=>{
    Clipboard.setString(`${config.FRONTEND_URL}/refer/${userId}`);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Cool",
      textBody: "Successfully copied",
      autoClose: 5000,
    });
  }

  return (
    <View style={styles.bodyContainer}>
      {/* invite link button component */}
      <View style={styles.inviteLinkContainer}>
        <View>
          <Text numberOfLines={1} style={styles.inviteLink}>
            {config.FRONTEND_URL}/refer/{userId}
          </Text>
        </View>
        <Button
          title="Copy"
          color="#914FEC"
          onPress={() => {
            copyHandle();
          }}
        />
      </View>
      <View style={styles.divider}></View>

      <View style={{ alignSelf: "center", marginTop: 5, marginBottom: 5 }}>
        <Text style={{ color: "#6A6969", fontSize: 14 }}>
          OR SHARE LINK VIA
        </Text>
      </View>

      {/* social component */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Linking.canOpenURL(config.WHATSAPP)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(config.WHATSAPP);
                }
                throw new Error("WhatsApp is not installed");
              })
              .catch((err) => console.error("An error occurred", err));
          }}
        >
          <Image
            source={require("../../assets/whatsApp.png")}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{
            Linking.canOpenURL(config.FACEBOOK)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(config.FACEBOOK);
                }
                throw new Error("FACEBOOK is not installed");
              })
              .catch((err) => console.error("An error occurred", err));
          }}
        >
          <Image
            source={require("../../assets/facebook.png")}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Linking.canOpenURL(config.TWITTER)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(config.TWITTER);
                }
                throw new Error("TWITTER is not installed");
              })
              .catch((err) => console.error("An error occurred", err));
          }}
        >
          <Image
            source={require("../../assets/twitter.png")}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Linking.canOpenURL(config.MESSAGES)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(config.MESSAGES);
                }
                throw new Error("MESSAGES is not installed");
              })
              .catch((err) => console.error("An error occurred", err));
          }}
        >
          <Image
            source={require("../../assets/messages.png")}
            style={styles.socialImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {Linking.canOpenURL(config.GMAIL)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(config.GMAIL);
              }
              throw new Error("GMAIL is not installed");
            })
            .catch((err) => console.error("An error occurred", err));}}
        >
          <Image
            source={require("../../assets/gmail.png")}
            style={styles.socialImage}
          />
        </TouchableOpacity>
      </View>

      {/* invite history button component */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => comingSoon()}
      >
        <LinearGradient
          colors={["#9851F9", "rgba(249, 81, 108, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>See Invite History</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.signupContainer}
        onPress={() => comingSoon()}
      >
        <Text style={styles.signupText}>Terms and Conditions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialImage: {
    width: 50,
    height: 50,
  },

  bodyContainer: {
    margin: 20,
    width: "80%",
  },

  inviteLinkContainer: {
    display: "flex",
    flexDirection: "row",
  },

  inviteLink: {
    overflow: "hidden",
    color: "#A065F0",
    backgroundColor: "#E8D8FFCC",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    height: 35,
    paddingTop: 7,
    paddingLeft: 4,
    paddingRight: 4,
    minWidth: "83%",
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

  signupContainer: {
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

  divider: {
    borderBottomColor: "#0000001F",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },
});

export default InviteBody;
