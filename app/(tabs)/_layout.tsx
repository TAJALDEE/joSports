import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useLanguage } from "@/context/LanguageContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useMap } from "@/context/MapContext";
import PathIcon from "@/assets/icons/PathIcon";

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
      <Tabs.Screen
        name="mapScreen"
        options={{
          title: `${language === "en" ? "Sport Fields" : "الملاعب الرياضية"}`,
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0,
          },
          //headerLeft: () => <Button title="Toggle Map" onPress={toggleMap} />,
          tabBarIcon: ({ color, focused }) => (
            <PathIcon
              height={24} // Set the icon height
              fill={color} // Set the icon color
            />
          ),
        }}
      />
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
        name="matches"
        options={{
          title: `${language === "en" ? "Matches" : "المباريات"}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "trophy" : "trophy"} color={color} />
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
    </Tabs>
  );
}
