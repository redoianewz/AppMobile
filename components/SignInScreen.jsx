import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithGitHub from "./SignWithGitHub";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const navigation = useNavigation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isLoadedt, signUp, setActivet } = useSignUp();

  const [mode, setMode] = useState("login"); // 'login' or 'create account'
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const switchMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "create account" : "login"));
  };

  const onSignUpPress = async () => {
    if (!isLoadedt) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoadedt) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActivet({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log("Email Address:", emailAddress);
      console.log("Password:", password);
      console.error("Sign-In Error:", err);

      console.error("Error Code:", err.code);
      console.error("Error Message:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.blueCard]} />
          <View style={[styles.card, styles.redCard]} />
          <View style={styles.contentContainer}>
            <Text style={styles.label}>
              {mode === "login" ? "Login" : "Create Account"}
            </Text>
            <View style={styles.form}>
              {mode === "create account" && (
                <React.Fragment>
                  <TextInput
                    autoCapitalize="none"
                    value={firstName}
                    placeholder="First Name..."
                    onChangeText={(firstName) => setFirstName(firstName)}
                    style={styles.input}
                  />

                  <TextInput
                    autoCapitalize="none"
                    value={lastName}
                    placeholder="Last Name..."
                    onChangeText={(lastName) => setLastName(lastName)}
                    style={styles.input}
                  />
                </React.Fragment>
              )}
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
                style={styles.input}
              />

              <TextInput
                value={password}
                placeholder="Password..."
                placeholderTextColor="#000"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                style={styles.input}
              />
              {mode === "login" && (
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                    <View style={styles.checkbox}>
                      {rememberMe && <Text style={styles.checkboxText}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
              )}
              {mode === "login" && (
                <TouchableOpacity
                  onPress={onSignInPress}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              )}
              {mode === "create account" && (
                <TouchableOpacity
                  onPress={onSignUpPress}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Create Account</Text>
                </TouchableOpacity>
              )}
              <View style={styles.divider} />
              <Text style={styles.providerLabel}>Accede con</Text>
              <View style={styles.socialButtonsContainer}>
                <SignInWithFacebook />
                <SignInWithGoogle />
                <SignInWithGitHub />
              </View>
              <View style={styles.newAccountContainer}>
                <Text>
                  {mode === "login"
                    ? "I don't have an account?"
                    : "I already have an account?"}
                </Text>
                <TouchableOpacity onPress={switchMode}>
                  <Text style={styles.createAccountLink}>
                    {mode === "login" ? "Create Account" : "Login"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {pendingVerification && (
        <View style={styles.bgContainer}>
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.blueCard]} />
            <View style={[styles.card, styles.redCard]} />
            <View style={styles.contentContainer}>
              <Text style={styles.label}>Verify Email</Text>
              <View style={styles.form}>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                  style={styles.input}
                />
                <TouchableOpacity onPress={onPressVerify}>
                  <Text style={styles.loginButtonText}>Verify Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderColor: "#2F66E1",
    borderWidth: 2,
    borderRadius: 4,
  },
  checkboxText: {
    color: "#2F66E1",
    fontSize: 14,
    textAlign: "center",
    marginTop: -3,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "gray",
    marginRight: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    marginTop: 40,
    position: "relative",
    maxWidth: 300,
    minWidth: 300,
    width: "70%",
  },
  card: {
    borderRadius: 20,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  blueCard: {
    backgroundColor: "#4C99F4",
    transform: [{ rotate: "-6deg" }],
  },
  redCard: {
    backgroundColor: "#F75463",
    transform: [{ rotate: "6deg" }],
  },
  contentContainer: {
    zIndex: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    marginTop: 10,
  },
  input: {
    marginTop: 1,
    width: "100%",
    height: 44, // equivalent to 11px in web, React Native uses density-independent pixels (dp or pt)
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 0, // border: none in web
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    elevation: 2, // for Android shadow
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#2F66E1",
  },
  loginButton: {
    backgroundColor: "#4779EA",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 20,
  },
  providerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#2F66E1",
    padding: 10,
    borderRadius: 8,
    width: "33%",
    alignItems: "center",
  },
  blueButton: {
    backgroundColor: "#2F66E1",
  },
  redButton: {
    backgroundColor: "#BF3944",
  },
  blackButton: {
    backgroundColor: "black",
  },
  socialButtonText: {
    color: "white",
    fontSize: 16,
  },
  newAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  createAccountLink: {
    color: "blue",
    marginLeft: 5,
  },
});
