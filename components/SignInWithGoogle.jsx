import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.socialButton, styles.redButton]}
      onPress={onPress}
    >
      <FontAwesome name="google" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default SignInWithGoogle;

const styles = StyleSheet.create({
  socialButton: {
    padding: 10,
    borderRadius: 8,
    width: "23%",
    alignItems: "center",
  },
  redButton: {
    backgroundColor: "red",
  },
  socialButtonText: {
    color: "white",
    fontSize: 16,
  },
});