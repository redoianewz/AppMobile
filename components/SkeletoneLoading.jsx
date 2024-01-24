import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const ProductCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ActivityIndicator size={80} color="#FFA600" />
      </View>
      <View style={styles.progressBar}></View>
      <View style={styles.progressBar}></View>
      <View style={styles.progressBar}></View>
      <View style={styles.progressBar}></View>
      <View style={styles.iconContainer}>
        <ActivityIndicator size="small" color="#FFA600" />
        <View style={styles.iconDetails}>
          <View style={styles.progressBar}></View>
          <View style={styles.progressBar}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    height: 2,
    backgroundColor: "#FFA600",
    borderRadius: 4,
    marginVertical: 2.5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  iconDetails: {
    marginLeft: 3,
  },
});

export default ProductCardSkeleton;
