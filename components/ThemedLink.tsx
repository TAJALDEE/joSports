import React from "react";
import { Pressable, Text, type TouchableOpacityProps } from "react-native";
import { Link, type Href } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  lightColor?: string;
  darkColor?: string;
  href: Href<string | object>;
  params?: object; // Add params here
};

export function ThemedLink({
  title,
  style,
  lightColor,
  darkColor,
  params,
  href, //Use 'href' prop
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondryText"
  );

  return (
    <Link
      href={href}
      style={{
        backgroundColor,
        padding: 15,
        margin: 10,
        borderRadius: 5,
        flex: 1,
        textAlign: "center",
      }}
    >
      <Text style={{ color, textAlign: "center" }}>{title}</Text>
    </Link>
  );
}
