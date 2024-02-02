// CustomTabBarIcon.js
import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

const CustomTabBarIcon = ({ name, children, size, color, focused }) => {
  return (
    <View >      
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={focused ? "#FFA600" : "#748c94"}    
      />
      <Text style={{ color: focused ? "#FFA600" : "#748c94" }}>{children}</Text>
    </View>
  );
};

export default CustomTabBarIcon;
