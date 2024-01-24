import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, SafeAreaView } from "react-native";
import CategoryCard from "./CategoryCard";

function CategoryList({ typehos,route }) {
  const [products, setProducts] = useState([]);

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
        console.log("this data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        horizontal={typehos == "horizontal" ? true : false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {products.map((item) => (
          <CategoryCard
            key={item.id}
            {...item}
            categoryIdInRoute={route}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default CategoryList;
