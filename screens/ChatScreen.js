import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import CustomDropdown from "../components/CustomDropdown";
import { Avatar, Icon } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");

  const menuOptions = [
    { text: "Dissapearing messages", value: null },
    { text: "All media", value: () => alert("Hai") },
    { text: "Conversation settings", value: () => alert("Halo") },
    { text: "Search", value: null },
    { text: "Add to home screen", value: null },
  ];

  const sendMessage = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SafeAreaView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 15 }}>
              <Avatar
                rounded
                containerStyle={{ backgroundColor: "#EEEEEE" }}
                title={route.params.chatName[0].toUpperCase()}
                titleStyle={{ color: "#999999" }}
                size={35}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={[
                  { fontSize: 17 },
                  route.params.chatName.length > 7 ? { width: "70%" } : null,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {route.params.chatName}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      ),
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="black" type="ionicon" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <SafeAreaView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 20 }}>
              <Icon
                name="videocamera"
                size={24}
                color="black"
                type="antdesign"
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 20 }}>
              <Icon name="phone" size={20} color="black" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <CustomDropdown menuOptions={menuOptions}>
                <Icon
                  name="more-vert"
                  size={24}
                  color="black"
                  type="material"
                />
              </CustomDropdown>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.chat}
        keyboardVerticalOffset={{ number: 0 }}
      >
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput
              onChangeText={(text) => setInput(text)}
              placeholder="Signal Message"
              style={styles.textInput}
              value={input}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Icon
                name="send-lock"
                size={20}
                color="white"
                type="material-community"
                containerStyle={styles.sendButton}
              />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  chat: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    bottom: 0,
    height: 40,
    marginRight: 15,
    padding: 10,
    backgroundColor: "#EEEEEE",
    color: "grey",
    borderRadius: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  sendButton: {
    backgroundColor: "brown",
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
