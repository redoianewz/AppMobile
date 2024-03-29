
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView } from "react-native";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  ClerkLoading,
} from "@clerk/clerk-expo";
import {SignInButton} from "@clerk/clerk-react";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import SignInWithGoogle from "./SignInWithGoogle";
import * as SecureStore from "expo-secure-store";
import UseAuthExample from "./UseAuthExample";
import SignOut from "./SignOut";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const tokenCache = {
    getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return null;
      }
    },
  };



  return (  
      <ScrollView style={styles.container}>
        <SignedIn>
          <Text>You are Signed in</Text>
          <UseAuthExample />
          <SignOut />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </ScrollView>
    // </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
