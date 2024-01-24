import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutocompleteSearchBar from "./AutocompleteSearchBar";

const HeadrBar = () => {
  const [uuid, setUuid] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };

  const navigateToWishlist = () => {
    navigation.navigate("Wishlist");
  };

  const fetchData = async () => {
   
      const response = await fetch(
        `https://bachen-eco.onrender.com/api/shoppingCart/${uuid}`
      );
      const data = await response.json();
      const hasNullItem = data.some(
        (cartItem) =>
          cartItem.items && cartItem.items.some((item) => item.item_id === null)
      );

      if (hasNullItem) {
        setCart([]);
      } else {
        setCart(data);
      }
    
  };

  const fetchDataw = async () => {
      const response = await fetch(
        `https://bachen-eco.onrender.com/api/wishlist/${uuid}`
      );
      const data = await response.json();
      const hasNullItem = data.some(
        (cartItem) =>
          cartItem.items && cartItem.items.some((item) => item.item_id === null)
      );

      if (hasNullItem) {
        setWishlist([]);
      } else {
        setWishlist(data);
      }
  
  };

 useEffect(() => {
   const intervalId = setInterval(() => {
     fetchData();
     fetchDataw();
   }, 10000);

   return () => clearInterval(intervalId); 
   fetchData();
   fetchDataw();
 }, [uuid]);


  const cartItemCount =
    cart.length > 0
      ? cart.reduce(
          (total, cartItem) =>
            total +
            (cartItem.items
              ? cartItem.items.reduce(
                  (itemTotal, item) => itemTotal + item.quantity,
                  0
                )
              : 0),
          0
        )
      : 0;

  const wishlistItemCount =
    wishlist.length > 0
      ? wishlist.reduce(
          (total, wishlistItem) =>
            total +
            (wishlistItem.items
              ? wishlistItem.items.reduce(
                  (itemTotal, item) => itemTotal + item.quantity,
                  0
                )
              : 0),
          0
        )
      : 0;      
  return (
    <View className="flex-row justify-between items-center p-2 mt-7 mb-[-30px]">
      <View>
        <AutocompleteSearchBar />
      </View>
      <View className="flex-1 flex-row justify-end items-end">
        <TouchableOpacity onPress={navigateToCart}>
          <FontAwesome name="shopping-cart" size={35} color="#f97316" />
         
            <View
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                backgroundColor: "#6ee7b7",
                borderRadius: 10,
                width: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black" }}>{cartItemCount || 0
              }</Text>
            </View>
         
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToWishlist}>
          <FontAwesome
            name="heart"
            size={35}
            color="#f97316"
            style={{ marginLeft: 15 }}
          />
          
            <View
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                backgroundColor: "#6ee7b7",
                borderRadius: 10,
                width: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black" }}>{wishlistItemCount || 0
              }</Text>
            </View>         
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeadrBar;
