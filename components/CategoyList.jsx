import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import CategoryCart from "./CategoryCart";
import { useNavigation } from "@react-navigation/native";

function CategoryList({ typehos }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bachen-eco.onrender.com/api/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false); // Set loading to false when data is fetched
        console.log("this data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

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

  return (
    <SafeAreaView>
      <ScrollView
        horizontal={typehos == "horizontal" ? true : false}
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {products.map((item) => (
          <CategoryCart key={item.id} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoryList;
