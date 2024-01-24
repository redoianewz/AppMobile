import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the necessary icon library
import { useNavigation } from "@react-navigation/native";

function CategoryCard({id, name, image,categoryIdInRoute }) {
  const [count, setCount] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

    const navigation = useNavigation();

  // Calculate dynamic styles
  const cardWidth = windowWidth > 460 ? windowWidth / 1.1 : windowWidth / 2.2;
  const cardHeight = windowHeight / 2.4;
const navigateToProductDetails = () => {
  navigation.navigate("Category", { categoryId: id });
};
  return (
    <TouchableOpacity onPress={navigateToProductDetails}>
      <View
        style={{
          width: 80,
          transform:
            id === categoryIdInRoute ? [{ scale: 1.2 }] : [{ scale: 1 }],
        }}
      >
        <View
          style={{
            borderColor: id === categoryIdInRoute ? "black" : "#f97316",
            marginBottom: id === categoryIdInRoute ?10 : 4,
            marginTop: id === categoryIdInRoute ? 10 : 4,
            borderWidth: 1, 
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 8,
            
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 40,
              resizeMode: "contain",
              marginTop: 5,
              borderRadius: 8,
              alignSelf: "center",
            }}
            source={{
              uri: `https://bachen-eco.onrender.com/images/category/${image}`,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 10,
              color: "#333",
              marginTop: 2,
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

export default CategoryCard;
