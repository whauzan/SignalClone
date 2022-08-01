import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FAB } from '@rneui/themed';

const CustomFloatingButton = ({ iconName, iconType, color, customStyle, onPress }) => {
  return (
    <FAB
      icon={{
        name: iconName,
        color: "black",
        type: iconType,
        size: 25,
        style: { flex: 1, justifyContent: "center" },
      }}
      color={color}
      containerStyle={[styles.fab, customStyle]}
      onPress={onPress}
    />
  );
}

export default CustomFloatingButton

const styles = StyleSheet.create({
  fab: {
    borderRadius: 15,
  },
});