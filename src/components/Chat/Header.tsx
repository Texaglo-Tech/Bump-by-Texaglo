import React from "react";
import { Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const ChatHeader = ({navigation}) => {
  return (
    <View
      style={[tw.style(
        "flex",
        "flex-row",
        "items-center",
        "h-16",
        "bg-green-900",
      )]}
    >
      <View
        style={tw.style(
          "flex",
          "flex-row",
          "justify-between",
          "items-center",
          "h-16",
          "p-2",
          "w-full",
          "bg-green-900",
          "absolute"
        )}
      >
        <Icon
          style={tw`h-8 w-8 `}
          name="arrowleft"
          color="white"
          type="antdesign"
          onPress={()=>navigation.goBack()}
        />
        <Image
          style={[
            tw`rounded-full -ml-2`,
            {
              width: 40,
              height: 40,
              resizeMode: "contain",
            },
          ]}
          source={require("../../assets/avatar.png")}
        />
        <Text
          numberOfLines={1}
          style={tw.style(
            "px-5",
            "text-lg",
            "font-extrabold",
            "text-white",
            "w-2/5"
          )}
        >
          Dear 😘
        </Text>
        <Icon
          style={tw.style("mx-2")}
          name="videocam"
          color="white"
          solid={true}
          type="ionicon"
        />
        <Icon style={tw`mx-2`} name="phone" color="white" type="FontAwesome5" />
        <Icon name="more-vertical" color="white" type="feather" />
      </View>
    </View>
  );
};

export default ChatHeader;
