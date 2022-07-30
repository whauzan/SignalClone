import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const initialData = {
    email: "",
    password: "",
  };
  const [inputData, setInputData] = useState(initialData);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const logIn = () => {
    signInWithEmailAndPassword(auth, inputData.email, inputData.password).catch(
      (error) => {
        alert(error.message);
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={{ number: 0 }}
    >
      <View style={styles.inner}>
        <StatusBar style="light" />
        <Image
          source={{
            uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
          }}
          style={{ width: 150, height: 150 }}
        />
        <View style={styles.inputContainer}>
          <Input
            autoFocus
            onChangeText={(text) => setInputData({ ...inputData, email: text })}
            placeholder="Email"
            textContentType="emailAddress"
            value={inputData.email}
          />
          <Input
            onChangeText={(text) =>
              setInputData({ ...inputData, password: text })
            }
            onSubmitEditing={logIn}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            value={inputData.password}
          />
        </View>
        <Button containerStyle={styles.button} onPress={logIn} title="Login" />
        <Button
          containerStyle={styles.button}
          onPress={() => navigation.navigate("Register")}
          title="Register"
          type="outline"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
