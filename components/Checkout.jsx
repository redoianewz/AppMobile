import React, { useState, useEffect } from "react";
import {
  View,
  Text,
SafeAreaView,
  StyleSheet,
} from "react-native";


const Checkout = () => {
 
  return (
    <View>
        <Text>Checkout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  formSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formField: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "orange",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Checkout;
