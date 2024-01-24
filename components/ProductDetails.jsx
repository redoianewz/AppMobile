import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import "react-native-get-random-values";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import  ProductList  from "./ProductList";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const id = route.params.id;
  console.log("Route ID:", id);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [arrowIcon, setArrowIcon] = useState("arrow-circle-right");  
  const [uuid, setUuid] = useState("");

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
   

   const handleViewAllProducts = () => {
     setShowAllProducts(!showAllProducts);
     setArrowIcon(
       showAllProducts ? "arrow-circle-right" : "arrow-circle-down"
     );
   };
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleAddToCart = () => {
      const requestBody = {
        uuid: uuid,
        productId: product[0].id,
        quantity: quantity,
        price: product[0].sale_price,
        productAttributes: [
          ...selectedAttributes,
          { attributeId: "color", attributeValue: selectedColor },
          { attributeId: "size", attributeValue: selectedSize },
        ],
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
     return res.text();
    
   })
   .then((data) => {
     console.log("Success Response Text:", data);
      navigation.navigate("Cart");
   }
   
   )
   .catch((error) => {
     console.error("Error:", error);
   });
    }
    const handleAddToWishlist = () => {
       const requestBody = {
         uuid: uuid,
         productId: product[0].id,
         quantity: quantity,
         price: product[0].sale_price,
         productAttributes: [
           ...selectedAttributes,
           { attributeId: "color", attributeValue: selectedColor },
           { attributeId: "size", attributeValue: selectedSize },
         ],
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
            navigation.navigate("Wishlist");
         })
         .catch((error) => {
           console.error("Error:", error);
         });
    };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://bachen-eco.onrender.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, [id]);

  const renderRating = () => {
    // Replace this with your actual rating logic or component
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>4.5</Text>
        <AntDesign name="star" size={18} color="orange" />
      </View>
    );
  };
  const renderAttributes = () => {
    return (
      <View style={styles.attributesContainer}>        
        {product[0].attributes &&
          product[0].attributes.map((attr, index) => (
            <View key={index} style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>{attr.name}</Text>
              {attr.name.toLowerCase() === "color" ? (
                <View style={styles.colorAttributesContainer}>
                  {attr.values.map((value, valueIndex) => (
                    <TouchableOpacity
                      key={valueIndex}
                      style={[
                        styles.colorAttribute,
                        {
                          backgroundColor:
                            value.toLowerCase() === "black"
                              ? "black"
                              : `${value}`,
                          borderColor:
                            value.toLowerCase() === "black"
                              ? "black"
                              : `${value}`,
                        },
                      ]}
                      onPress={() => setSelectedColor(value)}
                    >
                      {selectedColor === value && (
                        <AntDesign
                          name="check"
                          size={18}
                          color={
                            value.toLowerCase() === "black" ? "white" : "black"
                          }
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.sizeAttributesContainer}>
                  {attr.values.map((value, valueIndex) => (
                    <TouchableOpacity
                      key={valueIndex}
                      style={[
                        styles.sizeAttribute,
                        {
                          backgroundColor: "gray",
                        },
                      ]}
                      onPress={() => setSelectedSize(value)}
                    >
                      <Text
                        style={[
                          styles.sizeAttributeText,
                          {
                            color: selectedSize === value ? "white" : "black",
                          },
                        ]}
                      >
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}      
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("../assets/ZAS.gif")}
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }

  if (!product || product.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading product details</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://bachen-eco.onrender.com/images/products/${product[0].image}`,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.category}>{product[0].category_name}</Text>
            {renderRating()}
          </View>
          <Text style={styles.productName}>{product[0].name}</Text>
          <Text style={styles.description}>{product[0].short_description}</Text>
          <Text style={styles.price}>
            {product[0].sale_price}
            <Text style={styles.regularPrice}>{product[0].regular_price}</Text>
          </Text>
          {renderAttributes()}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={styles.quantityButton}
            >
              <Text style={{ fontSize: 25 }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncrement}
              style={styles.quantityButton}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
          {selectedColor && (
            <Text style={styles.selectedColor}>
              Selected Color: {selectedColor}
            </Text>
          )}
          {selectedSize && (
            <Text style={styles.selectedSize}>
              Selected Size: {selectedSize}
            </Text>
          )}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleAddToCart}
              style={[styles.button, styles.buyNowButton]}
            >
              <Text style={styles.buttonText}> Buy Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddToCart}
              style={[styles.button, styles.addToCartButton]}
            >
              <AntDesign name="shoppingcart" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddToWishlist}
              style={[styles.button, styles.addToWishlistButton]}
            >
              <AntDesign name="heart" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between px-4 mt-4 ">
        <Text className="text-2xl font-bold text-orange-500">Product List</Text>
        <TouchableOpacity onPress={handleViewAllProducts}>
          <Text className=" text-orange-500" style={styles.viewAllIcon}>
            <FontAwesome name={arrowIcon} size={40} color="orange" />
          </Text>
        </TouchableOpacity>
      </View>
      <ProductList typehos={showAllProducts ? undefined : "horizontal"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewAllIcon: {
    textAlign: "right",
    marginRight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  imageContainer: {
    height: 300,
    marginBottom: 20,
    borderRadius: 5,
  },
  productImage: {
    flex: 1,
    width: null,
    height: null,
  },
  detailsContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "orange",
    marginBottom: 10,
  },
  regularPrice: {
    fontSize: 16,
    color: "gray",
    textDecorationLine: "line-through",
  },

  selectedColor: {
    fontSize: 16,
    marginTop: 10,
  },
  selectedSize: {
    fontSize: 16,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "black", 
    height: 35,
    width: 35,
    borderRadius: 10,
    backgroundColor:"orange",
   
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },

  buyNowButton: {
    backgroundColor: "teal",
  },

  addToCartButton: {
    backgroundColor: "orange",
  },

  addToWishlistButton: {
    backgroundColor: "red",
  },

  buttonText: {
    color: "white",    
    fontSize: 14,
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  ratingText: {
    fontSize: 18,
    marginRight: 5,
  },

  attributesContainer: {
    marginTop: 10,
  },

  attributesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  attributeContainer: {
    marginBottom: 8,
  },

  attributeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },

  colorAttributesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  colorAttribute: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  sizeAttributesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },

  sizeAttribute: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    margin: 4,
  },

  sizeAttributeText: {
    fontSize: 16,
  },

  selectedColor: {
    fontSize: 16,
    marginTop: 10,
  },

  selectedSize: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProductDetails;
