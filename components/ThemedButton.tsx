import React from "react";
import { Pressable, Text, type TouchableOpacityProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string; // Optional prop for light mode color
  darkColor?: string; // Optional prop for dark mode color
};

export function ThemedButton({
  title,
  style,
  lightColor, // Extracting lightColor from props
  darkColor, // Extracting darkColor from props
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint" // Assuming 'tint' is a defined color in your Colors object
  );

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondryText"
  );

  return (
    <Pressable
      style={[
        { backgroundColor, padding: 15, margin: 10, borderRadius: 5 },
        style,
      ]}
      {...otherProps}
    >
      <Text style={{ color, textAlign: "center" }}>{title}</Text>
    </Pressable>
  );
}
