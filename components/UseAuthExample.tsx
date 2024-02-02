import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, View,Image } from "react-native";

export default function UseAuthExample() {
  const {  isSignedIn, user } = useUser();
  if ( !isSignedIn) {
    return null;
  }
 



  return (
    <View>      
    <Image
        style={{ width:30, height: 30 ,borderRadius: 50/2}}
        source={{ uri: user.profileImageUrl }}
      />
       <Text>{user.lastName} </Text>
    </View>
  );
}
