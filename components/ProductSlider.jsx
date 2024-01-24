import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import { ProductCard } from "./ProductCard"; // Import your ProductCard component

export function ProductSlider({ products }) {
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  return (
    <Swiper style={{ marginTop: 8 }} showsPagination={false} loop={false}>
      {[...Array(totalSlides)].map((_, index) => (
        <ScrollView
          key={index}
          horizontal
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {products
            .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
            .map((product, productIndex) => (
              <ProductCard key={productIndex} {...product} />
            ))}
        </ScrollView>
      ))}
    </Swiper>
  );
}
