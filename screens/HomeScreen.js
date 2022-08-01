import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar, Icon, SearchBar } from "@rneui/themed";
import { auth, db } from "../firebase";
import CustomFloatingButton from "../components/CustomFloatingButton";
import CustomDropdown from "../components/CustomDropdown";
import { collection, onSnapshot } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const menuOptions = [
    { text: "New group", value: null },
    { text: "Mark all read", value: () => alert("Hai") },
    { text: "Invite friends", value: () => alert("Halo") },
    { text: "Settings", value: null },
    { text: "Notification profile", value: null },
  ];

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const onSearch = () => {
    setIsSearch(true);
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ width: "95%", marginLeft: 0 }}>
          <SearchBar
            placeholder="Search"
            platform={Platform.OS == "ios" ? "ios" : "android"}
            onCancel={() => {
              setIsSearch(false);
            }}
          />
        </View>
      ),
      headerLeft: () => null,
      headerRight: () => null,
    });
  };

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      setChats(
        snapshot.docs
          .sort((a, b) => b.data().createdAt - a.data().createdAt)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
      );
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    if (!isSearch) {
      navigation.setOptions({
        title: "Signal",
        headerTitle: () => (
          <Text style={{ fontWeight: "500", fontSize: 18 }}>Signal</Text>
        ),
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { color: "black" },
        headerTintColor: "black",
        headerLeft: () => (
          <View style={{ marginRight: 20, marginLeft: 10 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
              {auth?.currentUser?.photoURL ? (
                <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
              ) : (
                <Avatar
                  rounded
                  title={auth?.currentUser?.displayName[0].toLowerCase()}
                  titleStyle={{ color: "white" }}
                  containerStyle={{ backgroundColor: "#2C6BED" }}
                />
              )}
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <SafeAreaView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onSearch}
                style={{ marginRight: 20 }}
              >
                <Icon name="search1" size={24} color="black" type="antdesign" />
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
    }
  }, [isSearch]);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {chats?.map(({ id, chatName }) => (
          <CustomListItem id={id} chatName={chatName} enterChat={enterChat} key={id} />
        ))}
      </ScrollView>
      <View style={styles.fabContainer}>
        <CustomFloatingButton
          iconName={"camera-outline"}
          iconType={"material-community"}
          customStyle={{ marginBottom: 15 }}
          color={"#EEEEEE"}
        />
        <CustomFloatingButton
          iconName={"pencil"}
          iconType={"octicon"}
          color={"#D3EAFF"}
          onPress={() => navigation.navigate("AddChat")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  fabContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});
