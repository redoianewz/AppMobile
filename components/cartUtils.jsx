// cartUtils.js

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
export const useCartState = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [uuid]);

  const calculateTotalQuantity = (cart) => {
    console.log(cart)
    return cart.length > 0
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
  };

  return {
    cart,
    setCart,
    calculateTotalQuantity,
    loading,
    uuid,
    setUuid,
  };
};
