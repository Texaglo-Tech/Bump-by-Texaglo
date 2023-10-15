import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const ChatContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Admin",
      phone: "555-555-5555",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      name: "Technoking",
      phone: "444-444-4444",
      image: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 3,
      name: "Bking",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 4,
      name: "Sifat",
      phone: "999-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredContacts(filtered);
  };

  const handlePress = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.phoneText}>{item.phone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ChatContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#eee",
    padding: 8,
    marginTop: 10,
    display: "flex",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneText: {
    fontSize: 16,
    color: "#999",
  },
});
