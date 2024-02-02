import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithGoogle from "./SignInWithGoogle";
import * as SecureStore from "expo-secure-store";
import UseAuthExample from "./UseAuthExample";
import SignOut from "./SignOut";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";

export default function Signup() {
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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={"pk_test_c2tpbGxlZC1nbnUtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <SafeAreaView style={styles.container}>
        <SignedOut>
          <SignUpScreen />
          <SignInScreen />
        </SignedOut>
    
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
