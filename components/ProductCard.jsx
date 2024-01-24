import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the necessary icon library
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
 function ProductCard({
  id,
  name,
  sale_price,
  category_name,
  image,
  regular_price,
}) {
  const [count, setCount] = useState(1);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
   const [uuid, setUuid] = useState("");

   useEffect(() => {
     const getStoredUuid = async () => {
       try {
         const storedUuid = await AsyncStorage.getItem("deviceUuid");
         if (storedUuid) {
           setUuid(storedUuid);
         } else {
           const newUuid = uuidv4();
           setUuid(newUuid);
           await AsyncStorage.setItem("deviceUuid", newUuid);
         }
       } catch (error) {
         console.error("Error accessing AsyncStorage:", error);
       }
     };

     getStoredUuid();
   }, []);
   
  const navigation = useNavigation();
  // Calculate dynamic styles
  const cardWidth = windowWidth > 460 ? windowWidth / 3.3 : windowWidth / 2.2;
  const cardHeight = windowHeight / 2.4;

  // Function to handle adding to cart
  const addToCart = () => {  
     const requestBody = {
       uuid: uuid,
       productId: id,
       quantity: 1,
       price:sale_price,     
     };

     console.log("Request Body:", requestBody);

     fetch(`https://bachen-eco.onrender.com/api/shoppingCart`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(requestBody),
     })
       .then((res) => {
         console.log("Response Status:", res.status);
         return res.text(); // Use res.text() to get the raw response text
       })
       .then((data) => {
        navigation.navigate("Cart");
       })
       .catch((error) => {
         console.error("Error:", error);
       });
  };

  // Function to handle adding to wishlist
  const addToWishlist = () => {
     const requestBody = {
       uuid: uuid,
       productId: id,
       quantity: 1,
       price: sale_price,
     };

     console.log("Request Body:", requestBody);

     fetch(`https://bachen-eco.onrender.com/api/wishlist`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(requestBody),
     })
       .then((res) => {
         console.log("Response Status:", res.status);
         return res.text(); // Use res.text() to get the raw response text
       })
       .then((data) => {
         navigation.navigate("Wishlist");
       })
       .catch((error) => {
         console.error("Error:", error);
       });
  };

    const navigateToProductDetails = () => {
      navigation.navigate("ProductDetails", { id });
    };
  return (
    <TouchableOpacity onPress={navigateToProductDetails}>
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
              width: 100,
              height: 100,
              resizeMode: "contain",
              marginTop: 5,
              borderRadius: 8,
             marginLeft:20,
            }}
            source={{
              uri: `https://bachen-eco.onrender.com/images/products/${image}`,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 11,
              color: "#888",
              marginTop: 3,
            }}
          >
            {category_name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              color: "#333",
              marginTop: 5,
            }}
          >
            {name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "#333" }}>
              {sale_price}dh -{" "}
              <Text style={{ color: "#888" }}>{regular_price}dh</Text>
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* Wishlist icon and functionality */}
              <TouchableOpacity
                onPress={addToWishlist}
                style={{
                  marginRight: 10,
                  backgroundColor: "#f97316",
                  padding: 8,
                  borderRadius: 100,
                }}
              >
                <AntDesign name="hearto" size={24} color="#6ee7b7" />
              </TouchableOpacity>

              {/* Cart icon and functionality */}
              <TouchableOpacity
                onPress={addToCart}
                style={{
                  backgroundColor: "#f97316",
                  padding: 8,
                  borderRadius: 100,
                }}
              >
                <AntDesign name="shoppingcart" size={24} color="#6ee7b7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default ProductCard;