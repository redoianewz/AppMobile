import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity ,SafeAreaView} from "react-native";
import { StyleSheet } from "react-native";


const ProductList = ({
  products,
  selectedProductIndex,
  handleProductClick,
}) => {
 const getDisplayText = (product) => {
   if (product.name) {
     return product.name;
   } else if (product.short_description) {
     return product.short_description;
   } else if (product.description) {
     return product.description;
   }
   return "No information available"; // Default if none of the conditions match
 };
  return (
       <View style={{ flex: 1 }}>
      <ScrollView style={styles.fixedMessage}>
        <View style={styles.resultProductContainer}>
          {products.map((product, index) => (
            <TouchableOpacity
              key={product.id}
              id={`product-${index}`}
              style={[
                styles.productItem,
                selectedProductIndex === index && styles.selectedProductItem,
              ]}
              onPress={() => handleProductClick(product)}
            >
              <View style={styles.flexContainer}>
                <Text style={styles.fontMedium}>{getDisplayText(product)}</Text>
              </View>
              <View style={styles.flexContainer}>
                <Image
                  source={{
                    uri: `https://bachen-eco.onrender.com/images/products/${product.image}`,
                  }}
                  style={styles.productImage}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  fixedMessage: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 4,
    marginRight: 4,
    padding: 4,
    borderRadius: 4,
    height: 450,
  },
  resultProductContainer: {
    backgroundColor: "white",
  },
  productItem: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 4,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedProductItem: {
    backgroundColor: "#f2f2f2",
  },
  flexContainer: {
    flex: 1,
  },
  fontMedium: {
    fontWeight: "bold",
  },
  productImage: {
    width: 50,
    height: 50,
    marginLeft: 64,
  },
});

export default ProductList;
