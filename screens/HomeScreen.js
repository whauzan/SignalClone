import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/themed";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
        navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
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
        <View style={{ marginRight: 10 }}>
            
        </View>
      )
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
