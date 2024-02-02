import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "./ProductList";
import { FontAwesome } from "@expo/vector-icons";
import Siders from "./Siders";
import Carousel from "./Carousel";
import CategoryList from "./CategoyList";
import { useTheme } from "@react-navigation/native";
import Signup from "./Signup";

import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const features = [
    {
      icon: "ship",
      title: "Free Shipping",
      description: "on all orders",
      color: "#87CEEB", // LightSkyBlue
      textColor: "#000080",
    },
    {
      icon: "credit-card",
      title: "Online Payment",
      description: "easy and fast",
      color: "#008000", // Green
      textColor: "#000800",
    },
    {
      icon: "money",
      title: "Save Money",
      description: "best deals",
      color: "#FFFF00", // Yellow
      textColor: "#808000",
    },
    {
      icon: "gift",
      title: "Promotions",
      description: "check out our offers",
      color: "#800080", // Purple
      textColor: "#000800",
    },
    {
      icon: "smile-o",
      title: "Happy Sell",
      description: "customer satisfaction",
      color: "#FFC0CB", // Pink
      textColor: "#C71585",
    },
    {
      icon: "headphones",
      title: "24/7 Support",
      description: "contact us anytime",
      color: "#FFA500", // Orange
      textColor: "#000800",
    },
  ];
 
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial loading period
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimeout);
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
   const onSignUpPress = () => {
     navigation.navigate("SignUpScreen");
   };
  return (
    <SafeAreaView>
      <ScrollView>
        <Siders />       
        <Carousel />
        <View className="mt-9">
          <ProductList />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4 ">
          <Text className="text-2xl font-bold text-orange-500">Categories</Text>
          <TouchableOpacity>
            <Text className="text-sm font-bold text-orange-500">View All </Text>
          </TouchableOpacity>
        </View>
        <CategoryList typehos="horizontal" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
