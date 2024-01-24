import React from "react";
import { TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const SearchInput = ({
  value,
  onChange,
  onKeyDown,
  inputRef,
  placeholder = "Search products",
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
      }}
      className="border border-gray-300  outline-none focus:border-blue-500 rounded-xl"
    >
      <FontAwesome
        name="search"
        size={20}
        color="#f97316"
        style={{ marginLeft: 10, marginRight: 5 }}
      />
      <TextInput
        type="text"
        style={{
          width: "63%",
          paddingVertical: 8,
          paddingHorizontal: 12,
          height: 40,
        }}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchInput;
