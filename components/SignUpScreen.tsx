import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithGitHub from "./SignWithGitHub";
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={styles.bgContainer}>
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.blueCard]} />
            <View style={[styles.card, styles.redCard]} />
            <View style={styles.contentContainer}>
              <Text style={styles.label}>Login</Text>
              <View style={styles.form}>
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

                <TouchableOpacity
                  onPress={onSignUpPress}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <Text style={styles.providerLabel}>Accede con</Text>
                <View style={styles.socialButtonsContainer}>
                  <SignInWithFacebook />
                  <SignInWithGoogle />
                  <SignInWithGitHub />
                </View>
                <View style={styles.newAccountContainer}>
                  <Text>I don't have an account?</Text>
                  <TouchableOpacity onPress={onSignUpPress}>
                    <Text style={styles.createAccountLink}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
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
    marginRight: 40,
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
