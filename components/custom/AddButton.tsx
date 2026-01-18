import React from "react";

import { Pressable } from "react-native";
import MyText from "./generic/MyText";

import { Ionicons } from "@expo/vector-icons";

import { useColor } from "@/hooks/use-color";

type AddButtonProps = {
  text: string;
  action: () => void;
};

export function AddButton({ text, action }: AddButtonProps) {
  const color = useColor();

  return (
    <Pressable
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgb(52, 86, 56)",
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 6,
        width: 300,
        height: 50,
        justifyContent: "space-between",
      }}
    >
      <MyText style={{ color: color.text }}>{text}</MyText>
      <Ionicons name="add-circle" size={30} color={color.text} />
    </Pressable>
  );
}
