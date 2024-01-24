import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const Siders = () => {
  const scrollViewRef = useRef(null);
  const scrollInterval = useRef(null);
  const contentWidthRef = useRef(0);

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

  useEffect(() => {
    const startScrolling = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          animated: true , toValue : 200,
          duration: 2000,useNativeDriver: true,
        });
        setTimeout(() => {
          scrollViewRef.current.scrollTo({
            x: contentWidthRef.current,
            animated: true,
             // Adjust the duration as needed
            toValue: 200,
            duration: 2000, // Adjust the duration as needed (20000 milliseconds = 20 seconds)
            useNativeDriver: true,
          });
        }, 2000);
      }
    };

    startScrolling(); // Initial scroll

    scrollInterval.current = setInterval(() => {
      startScrolling();
    }, 4000);

    return () => clearInterval(scrollInterval.current);
  }, []);

  const handleContentSizeChange = (contentWidth) => {
    contentWidthRef.current = contentWidth;
  };

  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollViewRef}
        horizontal       
      >
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              alignItems: "center",
              backgroundColor: item.color,
              padding: 14,
              borderRadius: 8,
              marginHorizontal: 8,
              marginBottom: 30,
              height: 80,
              minWidth: "17%", // Set the minimum width to fit two items per row
            }}
          >
            <FontAwesome
              name={item.icon}
              size={30}
              color={item.textColor}
              style={{ marginTop: -8 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: item.textColor,
              }}
            >
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                textAlign: "center",
                color: item.textColor,
              }}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Siders;
