import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDo4h86SiShQiuBoFSU-3YBrtkX82yJ7iA",
  authDomain: "signal-clone-d44ef.firebaseapp.com",
  projectId: "signal-clone-d44ef",
  storageBucket: "signal-clone-d44ef.appspot.com",
  messagingSenderId: "517136770049",
  appId: "1:517136770049:web:8f177cbe477f12c7940c00",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
