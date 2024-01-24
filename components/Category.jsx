import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { ScrollView } from "react-native-gesture-handler";
import CategoryListTow from "./CategoryListTow";
import { AntDesign } from "@expo/vector-icons"; // Import the necessary icon library
import { useNavigation } from "@react-navigation/native";

const Category = ({ route }) => {
  const categoryId = route.params ? route.params.categoryId : 3;
  const [Category, setCategory] = useState([]);
  const [uuid, setUuid] = useState("");
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://bachen-eco.onrender.com/api/categories/${categoryId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategory(data);
        setLoading(false); // Set loading to false when data is fetched
        console.log("this data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/ZAS.gif")}
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }
  const addToCart = (producrID, price) => {
    const requestBody = {
      uuid: uuid,
      productId: producrID,
      quantity: 1,
      price:price,
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
  const addToWishlist = (producrID,price) => {
    const requestBody = {
      uuid: uuid,
      productId:producrID, 
      quantity: 1,
      price: price,
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
        console.log("Success Response Text:", data);
        // Uncomment the next line once you understand the response
        // console.log("Parsed Response:", JSON.parse(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
   const navigateToProductDetails = (IdProduct) => {
     navigation.navigate("ProductDetails", { id: IdProduct });
   };
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <ScrollView>
          <CategoryListTow route={categoryId} />
        </ScrollView>
      </View>
      <View style={styles.productContainer}>
        <ScrollView contentContainerStyle={styles.productList}>
          {Category.length > 0 ? (
            Category.map((item) => (
              <TouchableOpacity
                onPress={() => navigateToProductDetails(item.product_id)}
                style={styles.productItem}
              >
                <View style={styles.productCard}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: `https://bachen-eco.onrender.com/images/products/${item.product_image}`,
                    }}
                  />
                  <Text style={styles.stockStatus}>{item.category_name}</Text>
                  <Text style={styles.productName}>{item.product_name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.salePrice}>
                      {item.product_sale_price}dh -
                    </Text>
                    <Text style={styles.regularPrice}>
                      {item.product_regular_price}dh
                    </Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() =>
                        addToWishlist(item.product_id, item.product_sale_price)
                      }
                      style={styles.wishlistButton}
                    >
                      <AntDesign name="hearto" size={20} color="#6ee7b7" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        addToCart(item.product_id, item.product_sale_price)
                      }
                      style={styles.cartButton}
                    >
                      <AntDesign
                        name="shoppingcart"
                        size={20}
                        color="#6ee7b7"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 500,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#f97316",
                }}
              >
                No Item Found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 30,
  },
  categoryContainer: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopRightRadius: 20,    

  },
  productContainer: {
    flex: 0.7,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  productItem: {
    margin: 2,
    width: 120,
  },
  productCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginTop: 5,
    borderRadius: 8,
  },
  stockStatus: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#888",
    marginTop: 3,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 5,
  },
  salePrice: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#333",
  },
  regularPrice: {
    color: "#888",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  wishlistButton: {
    marginRight: 1,
    backgroundColor: "#f97316",
    padding: 8,
    borderRadius: 100,
  },
  cartButton: {
    backgroundColor: "#f97316",
    padding: 8,
    borderRadius: 100,
  },
});

export default Category;
