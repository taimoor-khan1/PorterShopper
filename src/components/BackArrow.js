import React, { useState } from "react";
import { Icon } from "native-base";
import { StyleSheet, View } from "react-native";
import MyTouchableOpacity from "./MyTouchableOpacity";
import { COLORS, FONTFAMILY, SIZES, width } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function BackArrow(props) {
  const navigation = useNavigation();

  return (
    <MyTouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={[props.style, {}]}
    >
      <Icon
        type={FONTFAMILY.Entypo}
        name={"chevron-left"}
        style={{
          fontSize: SIZES.twentyFive,
          color: props.isBright ? COLORS.normal.white : COLORS.normal.black,
        }}
      />
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circularBG: {
    height: SIZES.fifty * 0.7,
    width: SIZES.fifty * 0.7,
    borderRadius: SIZES.fifty,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
