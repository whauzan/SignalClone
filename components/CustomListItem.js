import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(doc(db, "chats", id), "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );

    return unsubscribe;
  }, []);
  return (
    <>
      <ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
        <Avatar
          rounded
          containerStyle={{ backgroundColor: "#EEEEEE" }}
          title={chatName[0].toUpperCase()}
          titleStyle={{ color: "#999999" }}
          size={45}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {`${
              auth.currentUser.email === chatMessages?.[0]?.email
                ? "You: "
                : chatMessages?.[0]?.displayName
            } ${chatMessages?.[0]?.message}`}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
