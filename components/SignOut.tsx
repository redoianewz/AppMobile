// Autor: Miguel Dussán

import React from "react";
import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-react";

const SignOut = () => {
    
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default SignOut;
