import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const initialData = {
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Register",
    });
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth, inputData.email, inputData.password)
      .then((authUser) => {
        updateProfile(authUser.user, {
          displayName: inputData.name,
          photoURL:
            inputData.imageUrl
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [inputData, setInputData] = useState(initialData);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={{ number: 0 }}
      style={styles.container}
    >
      <View style={styles.inner}>
        <StatusBar style="light" />
        <Text h4 style={{ marginBottom: 30 }}>
          Create a Signal Account
        </Text>
        <View style={styles.inputContainer}>
          <Input
            autoFocus
            onChangeText={(text) => setInputData({ ...inputData, name: text })}
            placeholder="Full Name"
            textContentType="name"
            value={inputData.name}
          />
          <Input
            onChangeText={(text) => setInputData({ ...inputData, email: text })}
            placeholder="Email"
            textContentType="emailAddress"
            value={inputData.email}
          />
          <Input
            onChangeText={(text) =>
              setInputData({ ...inputData, password: text })
            }
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={inputData.password}
          />
          <Input
            onChangeText={(text) =>
              setInputData({ ...inputData, imageUrl: text })
            }
            onSubmitEditing={register}
            placeholder="Profile Picture URL (optional)"
            textContentType="URL"
            value={inputData.imageUrl}
          />
        </View>
        <Button
          containerStyle={styles.button}
          onPress={register}
          raised
          title="Register"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 250,
  },
  button: {
    width: 150,
    marginTop: 10,
  },
});
