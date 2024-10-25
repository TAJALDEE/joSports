import React from "react";
import { Pressable, Text, type TouchableOpacityProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string; // Optional prop for light mode color
  darkColor?: string; // Optional prop for dark mode color
};

export function ThemedButtonSecondry({
  title,
  style,
  lightColor, // Extracting lightColor from props
  darkColor, // Extracting darkColor from props
  ...otherProps
}: ThemedButtonProps) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint" // Assuming 'tint' is a defined color in your Colors object
  );

  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Pressable
      style={[
        {
          borderColor,
          backgroundColor: "transparent", // Set background to transparent
          padding: 15,
          margin: 10,
          borderRadius: 5,
          borderWidth: 1, // Ensure there's a visible border
        },
        style,
      ]}
      {...otherProps}
    >
      <Text style={{ color, textAlign: "center" }}>{title}</Text>
    </Pressable>
  );
}
