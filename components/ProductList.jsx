import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import SkeletonLoading from "./SkeletoneLoading";

function ProductList({ typehos }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bachen-eco.onrender.com/api/products"
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
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = windowWidth > 460 ? windowWidth / 3.3 : windowWidth / 2.2;

  if (loading) {
    // Conditionally render additional SkeletonLoading components for larger screens
    const additionalSkeletons =
      windowWidth > 460 ? (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
         
        </>
      ) : null;

    return (
      <ScrollView
        horizontal={typehos === "horizontal"}
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        {additionalSkeletons}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      horizontal={typehos === "horizontal"}
      contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
    >
      {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </ScrollView>
  );
}

export default ProductList;
