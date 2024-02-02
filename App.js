import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Category from "./components/Category";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Aide from "./components/Aide";
import CustomTabBarIcon from "./navigation/CustpmTabBarIcon";
import HeadrBar from "./components/HeadrBar";
import Cart from "./components/Cart";
import Wishlist from './components/Wishlist';
import ProductDetails from './components/ProductDetails';
import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View,Image } from "react-native";
import AutocompleteSearchBar from "./components/AutocompleteSearchBar";
import SignUpScreen from "./components/SignUpScreen";
import UseAuthExample from "./components/UseAuthExample";
import {
  ClerkProvider,
  SignedIn, 
} from "@clerk/clerk-expo";
import {  useUser } from "@clerk/clerk-expo";
        
const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  //  const { isSignedIn, user } = useUser();
   return (
     <BottomTab.Navigator>
       <BottomTab.Screen
         name="Home"
         component={Home}
         options={{
           tabBarIcon: ({ focused }) => (
             <CustomTabBarIcon
               name="home"
               size={24}
               color="#748c94"
               focused={focused}
             />
           ),
         }}
       />
       <BottomTab.Screen
         name="Category"
         component={Category}
         options={{
           tabBarIcon: ({ focused }) => (
             <CustomTabBarIcon
               name="apps"
               size={24}
               color="#748c94"
               focused={focused}
             />
           ),
         }}
       />
       <BottomTab.Screen
         name="order"
         component={Feed}
         options={{
           tabBarIcon: ({ focused }) => (
             <CustomTabBarIcon
               name="order-bool-descending-variant"
               size={24}
               color="#748c94"
               focused={focused}
             ></CustomTabBarIcon>
           ),
         }}
       />
       <BottomTab.Screen
         name="Aide"
         component={Aide}
         options={{
           tabBarIcon: ({ focused }) => (
             <CustomTabBarIcon
               name="help-circle"
               size={24}
               color="#748c94"
               focused={focused}
             ></CustomTabBarIcon>
           ),
         }}
       />
       <BottomTab.Screen
         name="Login"
         component={Login}
         options={{
           tabBarIcon: ({ focused }) => (
             <CustomTabBarIcon
               name="login"
               size={24}
               color="#748c94"
               focused={focused}
             />
           ),
         }}
       />
       <BottomTab.Screen
         name="Loginout"
         component={UseAuthExample}
         options={{
           tabBarIcon: () => {
              const { isSignedIn, user } = useUser();
              if (!isSignedIn) {
                return null;
              }
 
              return (
               
                  <SignedIn>
                    <View>
                      <Image
                        style={{ width: 30, height: 30, borderRadius: 50 / 2 }}
                        source={{ uri: user.profileImageUrl }}
                      />
                      <Text>{user.lastName} </Text>
                    </View>
                  </SignedIn>
              );
           },
         }}
       />
     </BottomTab.Navigator>
   );
    };

export default function App() {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     // Simulate an initial loading period
     const loadingTimeout = setTimeout(() => {
       setLoading(false);
     }, 7000);

     // Cleanup the timeout to avoid memory leaks
     return () => clearTimeout(loadingTimeout);
   }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>        
        <Image
          source={require("./assets/QSQD.gif")}
          style={{ width: 200, height: 200 }}
        />  
      </View>
    );
  }
   const tokenCache = {
     getToken(key) {
       try {
         return SecureStore.getItemAsync(key);
       } catch (err) {
         return null;
       }
     },
     saveToken(key, value) {
       try {
         return SecureStore.setItemAsync(key, value);
       } catch (err) {
         return null;
       }
     },
   };


  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={"pk_test_c2tpbGxlZC1nbnUtODMuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{
              header: () => <HeadrBar />,
            }}
          />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen
            name="AutocompleteSearchBar"
            component={AutocompleteSearchBar}
          />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}
