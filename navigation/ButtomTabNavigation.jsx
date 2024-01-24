// BottomTabNavigation.js
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../components/Home";
import Category from "../components/Category";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Aide from "../components/Aide";
import CustomTabBarIcon from "./CustpmTabBarIcon";

const Tab = createMaterialBottomTabNavigator();

const sreateOptions = {
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    borderRadius: 15,
    height: 70,
  },
};
const TobTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...sreateOptions,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name="home"
              size={24}
              color="#748c94"
              focused={focused}
            >
              Home
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name="th-large"
              size={24}
              color="#748c94"
              focused={focused}
            >
              Category
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tab.Screen
        name="order"
        component={Feed}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name="order"
              size={24}
              color="#748c94"
              focused={focused}
            >
              order
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name="user"
              size={24}
              color="#748c94"
              focused={focused}
            >
              Login
            </CustomTabBarIcon>
          ),
        }}
      />
      <Tab.Screen
        name="Aide"
        component={Aide}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name="question-circle-o"
              size={24}
              color={focused ? "#FFA600" : "#748c94"}
              focused={focused}
            >
              Aide
            </CustomTabBarIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TobTabNavigation;
