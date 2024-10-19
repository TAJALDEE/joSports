import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLanguage } from "@/context/LanguageContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useMap } from "@/context/MapContext";
import { Button } from "react-native";

type ColorProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function TabLayout({ lightColor, darkColor }: ColorProps) {
  const { language, toggleLanguage } = useLanguage();
  const TabBarIconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const { toggleMap } = useMap();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { position: "static" },
        tabBarActiveTintColor: TabBarIconColor,
        headerShown: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${language === "en" ? "News" : "اخبار"}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={color}
            />
          ),
          // headerRight: () => (
          //   <Link href={"/library"} asChild style={{ marginHorizontal: 15 }}>
          //     <Pressable>
          //       <Text>library</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="mapScreen"
        options={{
          title: "Map",
          headerTitleAlign: "center",
          headerLeft: () => <Button title="Toggle Map" onPress={toggleMap} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "map-sharp" : "map-sharp"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: `${language === "en" ? "Profile" : "ملفي"}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: `${language === "en" ? "Library" : "المكتبة"}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "book" : "book-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
