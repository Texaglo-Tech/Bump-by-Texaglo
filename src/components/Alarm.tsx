// Alarm.tsx

import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

import { Badge } from "react-native-elements";

const Alarm = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.menu}
        onPress={() => {
          navigation.navigate("ChatContacts");
        }}
      >
        <Image source={require("../assets/alarm.png")} />
        <Badge
          status="primary"
          value={10}
          containerStyle={{ position: "absolute", top: -10, left: 15 }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({

  menu: {
    marginLeft: 5,
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

});

export default Alarm;
