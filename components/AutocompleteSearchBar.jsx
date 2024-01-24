import { useState, useEffect, useRef } from "react";
import ProductList from "./ProductListSearch";
import SearchInput from "./SearchInput";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";



const AutocompleteSearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  
  useEffect(() => {
    const fetchProducts =async () => {
      try {
        const response = await fetch(
          "https://bachen-eco.onrender.com/api/products"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
         
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };

    fetchProducts();
  }, []);

 const handleQueryChange = ({ nativeEvent }) => {
   setQuery(nativeEvent.text);
   setSelectedProductIndex(-1);
   setSearchResults(
     products.filter((product) =>
       product.name.toLowerCase().includes(nativeEvent.text.toLowerCase())
     )
   );
 };

 const handleKeyDown = ({ nativeEvent }) => {
   if (nativeEvent.key === "ArrowUp") {
     setSelectedProductIndex((prevIndex) =>
       prevIndex === -1 ? searchResults.length - 1 : prevIndex - 1
     );
   } else if (nativeEvent.key === "ArrowDown") {
     setSelectedProductIndex((prevIndex) =>
       prevIndex === searchResults.length - 1 ? -1 : prevIndex + 1
     );
   } else if (nativeEvent.key === "Enter") {
     if (selectedProductIndex !== -1) {
       const selectedProduct = searchResults[selectedProductIndex];
       alert(`You selected ${selectedProduct.name}`);
       setQuery("");
       setSelectedProductIndex(-1);
       setSearchResults([]);
     }
   }
 };

  // const handleProductClick = (product) => {
  //   alert(`You selected ${product.name}`);
  //   setQuery("");
  //   setSelectedProductIndex(-1);
  // };
   const navigation = useNavigation();
  const handleProductClick = ({ id }) => {
    navigation.navigate("ProductDetails", {id});
  };

  const scrollActiveProductIntoView = (index) => {
    const activeProduct = document.getElementById(`product-${index}`);
    if (activeProduct) {
      activeProduct.scrollIntoView({
        block: "nearest",
        inline: "start",
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedProductIndex !== -1) {
      scrollActiveProductIntoView(selectedProductIndex);
    }
  }, [selectedProductIndex]);

  return (
    <View className="flex flex-col  ml-2">
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        placeholder="Search products"
      />
      <View >
        {query !== "" && searchResults.length > 0 && (
          <ProductList
            products={searchResults}
            selectedProductIndex={selectedProductIndex}
            handleProductClick={handleProductClick}
          />
        )}
      </View>
    </View>
  );
};

export default AutocompleteSearchBar;

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
  },
});