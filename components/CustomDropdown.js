import { StyleSheet, Text } from "react-native";
import React from "react";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const CustomDropdown = ({ children, menuOptions }) => {
  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsWrapper: styles.optionsWrapper,
        }}
      >
        {menuOptions.map((option, index) => (
          <MenuOption key={index} value={index} onSelect={option.value}>
            <Text
              style={[
                { fontSize: 17, color: "black" },
                index !== menuOptions.length - 1 ? { marginBottom: 15 } : null,
              ]}
            >
              {option.text}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  optionsWrapper: {
    position: "absolute",
    top: 30,
    right: 5,
    width: 220,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
});
