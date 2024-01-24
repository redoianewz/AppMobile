
import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const LoginDropdown = ({ isVisible, onClose }) => {
  // Handle actions when options are pressed
  const handleSignIn = () => {
    // Implement your Sign In logic here
    console.log("Sign In pressed");
    onClose();
  };

  const handleSignUp = () => {
    // Implement your Sign Up logic here
    console.log("Sign Up pressed");
    onClose();
  };

  const handleOrder = () => {
    // Implement your Order logic here
    console.log("Order pressed");
    onClose();
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.option} onPress={handleSignIn}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleSignUp}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleOrder}>
            <Text>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
