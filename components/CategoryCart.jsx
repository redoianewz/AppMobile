import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the necessary icon library
import { useNavigation } from "@react-navigation/native";

function CategoryCart({
  id,
  name,
  image
}) {
  const [count, setCount] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  
      const navigation = useNavigation();

  // Calculate dynamic styles
  const cardWidth = windowWidth > 460 ? windowWidth / 3.3 : windowWidth / 2.2;
  const cardHeight = windowHeight / 2.4;
 const navigateToProductDetails = (IdProduct) => {
  navigation.navigate("Category", { categoryId: id });
 };

  return (
    <TouchableOpacity onPress={() => navigateToProductDetails(id)}>
    <View style={{ margin: 8, width: cardWidth }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 100,
            resizeMode: "contain",
            marginTop: 5,
            borderRadius: 8,
          }}
          source={{
            uri: `https://bachen-eco.onrender.com/images/category/${image}`,
          }}
        />       
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#333",
            marginTop: 5,
            textAlign: "center",
          }}
        >
          {name}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default CategoryCart;