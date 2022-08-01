import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button, Icon, Input } from "@rneui/themed";

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Chat",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, []);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: chatName,
      createdAt: new Date(),
    }).then(() => {
      navigation.goBack();
    });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={chatName}
        onChangeText={(text) => setChatName(text)}
        onSubmitEditing={createChat}
        leftIcon={<Icon name="chat-plus-outline" type="material-community" size={24} color="black" />}
        leftIconContainerStyle={{ marginRight: 10 }}
      />
      <Button buttonStyle={styles.btn} onPress={createChat}>Submit</Button>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%"
  },
  btn: {
    borderRadius: 5
  }
});
