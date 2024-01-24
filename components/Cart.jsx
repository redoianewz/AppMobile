import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import "react-native-get-random-values";
import ProductList from "./ProductList";

const Cart = () => {
  const [uuid, setUuid] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const navigation = useNavigation();
  const [deleteMessage, setDeleteMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] =useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [arrowIcon, setArrowIcon] = useState("arrow-circle-right");
 const handleViewAllProducts = () => {
   setShowAllProducts(!showAllProducts);
   setArrowIcon(showAllProducts ? "arrow-circle-right" : "arrow-circle-down");
 };
 const checkoutClic = () => {
    navigation.navigate("Checkout");
  };
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
  const calculateSubtotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      cartItem.items.forEach((item) => {
        total += item.quantity * item.price;
      });
    });
    return parseFloat(total.toFixed(2)); // <-- Convert the string to a number
  };
   useEffect(() => {
     const newSubtotal = calculateSubtotal();
     setSubtotal(newSubtotal);
   }, [cart]);
   const fetchData = async () => {

    const response = await fetch(
      `https://bachen-eco.onrender.com/api/shoppingCart/${uuid}`
    );
    

    const data = await response.json();
    const hasNullItem = data.some((cartItem) =>
      cartItem.items.some((item) => item.item_id === null)
    );

    if (hasNullItem) {
      setCart([]);
    } else {
      setCart(data);
    }
    setLoading(false);
};

  useEffect(() => {      
    fetchData();
  }, [uuid]);
   const showMessage = (message) => {
     setDeleteMessage(message);
     setTimeout(() => {
       setDeleteMessage("");
     }, 3000);
   };

   const updateQuantity = (itemId, newQuantity) => {
     if (itemId !== null) {
       fetch(
         `https://bachen-eco.onrender.com/api/shoppingCart/${itemId}/${uuid}`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             userId: uuid,
             itemId: itemId,
             quantity: newQuantity,
           }),
         }
       ).catch((error) => {
           console.error("Error updating quantity:", error);
         });
     }
   };

   const resetQuantityToOne = (cartIndex, itemIndex) => {
     const updatedCart = [...cart];
     updatedCart[cartIndex].items[itemIndex].quantity = 1;
     setCart(updatedCart);
   };
  const deleteProductFromCart = async (idshopcartItem) => {
    try {
      const response = await fetch(
        `https://bachen-eco.onrender.com/api/shoppingCart/${idshopcartItem}/${uuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: uuid,
          }),
        }
      );
          fetchData();      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }          
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };


   const incrementQuantity = (cartIndex, itemIndex) => {
     const updatedCart = [...cart];
     updatedCart[cartIndex].items[itemIndex].quantity += 1;
     setCart(updatedCart);
     updateQuantity(
       updatedCart[cartIndex].items[itemIndex].item_id,
       updatedCart[cartIndex].items[itemIndex].quantity
     );
   };

   const decrementQuantity = (cartIndex, itemIndex) => {
     const updatedCart = [...cart];
     const currentQuantity = updatedCart[cartIndex].items[itemIndex].quantity;
     if (currentQuantity > 1) {
       updatedCart[cartIndex].items[itemIndex].quantity -= 1;
       setCart(updatedCart);
       updateQuantity(
         updatedCart[cartIndex].items[itemIndex].item_id,
         updatedCart[cartIndex].items[itemIndex].quantity
       );
     }
   };
   const confirmDelete = () => {
     if (itemToDelete && "idshopcartItem" in itemToDelete) {
       deleteProductFromCart(itemToDelete.idshopcartItem);
       setItemToDelete(null);
       setShowConfirmation(false);      
     }
   };

   const cancelDelete = () => {
     setItemToDelete(null);
     setShowConfirmation(false);
   };
   const handleDelete = (idshopcartItem) => {
     if (idshopcartItem !== null) {
       setItemToDelete({ idshopcartItem });
       setShowConfirmation(true);
     }
   };
   const navigateToProductDetails = (id) => {
      navigation.navigate("ProductDetails", { id: id });
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
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View className="justify-center items-center mb-4 rounded-lg bg-white p-6 shadow-md">
            <View className="mt-5 ">
              <Text className="text-xl font-bold text-gray-900">
                Shopping Cart (
                {cart.length > 0
                  ? cart.reduce(
                      (total, cartItem) =>
                        total +
                        cartItem.items.reduce(
                          (itemTotal, item) => itemTotal + item.quantity,
                          0
                        ),
                      0
                    )
                  : 0}
                items)
              </Text>
            </View>
          </View>
          {cart.reduce((total, cartItem) => total + cartItem.items.length, 0) >
          0 ? (
            <View style={styles.cartDetails}>
              <View style={styles.subtotalRow}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>{subtotal} DH</Text>
              </View>
              <View style={styles.shippingRow}>
                <Text style={styles.label}>Shipping</Text>
                <Text style={styles.value}> 0.00 DH</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.label, { fontWeight: "bold" }]}>
                  Total
                </Text>
                <View>
                  <Text style={[styles.value, { fontWeight: "bold" }]}>
                    {subtotal} DH
                  </Text>
                  <Text style={styles.vatText}>including VAT</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={checkoutClic}
              >
                <Text style={styles.checkoutButtonText}>Check out</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyCartText}>
              Your shopping cart is empty
            </Text>
          )}
        </View>
        {cart.map((cartItem, cartIndex) => (
          <View key={cartIndex} style={styles.cartItemContainer}>
            {cartItem.items &&
              cartItem.items.map((item, itemIndex) => (
                
                  <View key={itemIndex} style={styles.productContainer}>
                    <TouchableOpacity onPress={() => navigateToProductDetails(item.product_id)}>
                    <Image
                      source={{
                        uri: `https://bachen-eco.onrender.com/images/products/${item.image}`,
                      }}
                      style={styles.productImage}
                    /></TouchableOpacity>                    
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>
                        {item.price}dh - {item.regular_price}dh
                      </Text>
                      {item.attributes.map((attr, index) => (
                        <Text key={index} style={styles.productAttributes}>
                          {attr.name} : {attr.values}
                        </Text>
                      ))}
                    </View>
                    
                    <View style={styles.quantityAndActions}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(cartIndex, itemIndex)}
                      >
                        <Text style={styles.quantityControl}> - </Text>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.quantityInput}
                        value={(item.quantity ?? "").toString()}
                        editable={false}
                      />
                      <TouchableOpacity
                        onPress={() => incrementQuantity(cartIndex, itemIndex)}
                      >
                        <Text style={styles.quantityControl}> + </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => resetQuantityToOne(cartIndex, itemIndex)}
                    >
                      <Text style={styles.resetQuantity}>
                        <FontAwesome
                          name="rotate-left"
                          size={20}
                          color="orange"
                        />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.item_id)}
                    >
                      <FontAwesome name="trash" size={20} color="orange" />
                    </TouchableOpacity>
                  </View>
              ))}
          </View>
        ))}
        <View className="flex flex-row items-center justify-between px-4 mt-4 ">
          <Text className="text-2xl font-bold text-orange-500">
            Product List
          </Text>
          <TouchableOpacity onPress={handleViewAllProducts}>
            <Text className=" text-orange-500" style={styles.viewAllIcon}>
              <FontAwesome name={arrowIcon} size={40} color="orange" />
            </Text>
          </TouchableOpacity>
        </View>
        <ProductList typehos={showAllProducts ? undefined : "horizontal"} />
      </ScrollView>
      {deleteMessage && (
        <View style={styles.fixedMessage}>
          <Text style={styles.messageText}>{deleteMessage}</Text>
        </View>
      )}

      {showConfirmation && (
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationTitle}>Confirm Deletion</Text>
            <Text style={styles.confirmationText}>
              Are you sure you want to delete this item from your cart?
            </Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity
                onPress={confirmDelete}
                style={styles.confirmationButtonConfirm}
              >
                <Text style={styles.confirmationButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelDelete}
                style={styles.confirmationButtonCancel}
              >
                <Text style={styles.confirmationButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllIcon: {
    textAlign: "right",
    marginRight: 20,
  },
  cartDetails: {
    marginTop: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  shippingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  value: {
    fontSize: 16,
  },
  vatText: {
    fontSize: 12,
    color: "gray",
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  header: {
    marginBottom: 16,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  cartItemContainer: {
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
    marginLeft: 17,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
  productAttributes: {
    fontSize: 12,
    color: "gray",
  },
  quantityAndActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityControl: {
    fontSize: 20,
    color: "orange",
    marginHorizontal: 6,
    marginBottom: 4,
  },
  quantityInput: {
    fontSize: 15,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 20,
    textAlign: "center",
  },
  resetQuantity: {
    fontSize: 14,
    color: "orange",
    marginRight: 8,
  },
  deleteIcon: {
    fontSize: 14,
    color: "orange",
  },
  fixedMessage: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 4,
    marginRight: 4,
    backgroundColor: "green",
    padding: 4,
    borderRadius: 4,
  },
  messageText: {
    color: "white",
  },

  confirmationOverlay: {
    position: "absolute",
    bottom: -10,
    right: 8,
    marginBottom: 4,
    marginRight: 4,
    padding: 4,
    borderRadius: 4,
  },
  confirmationBox: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderBlockColor: "black",
    borderWidth: 1,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 16,
  },
  confirmationButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  confirmationButtonConfirm: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  confirmationButtonCancel: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 4,
  },
  confirmationButtonText: {
    color: "white",
  },
});

export default Cart;