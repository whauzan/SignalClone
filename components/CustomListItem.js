import { StyleSheet } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";

const CustomListItem = ({ id, chatName, enterChat }) => {
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
            This is a Message
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
