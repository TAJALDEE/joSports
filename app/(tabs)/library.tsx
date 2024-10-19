import React, { Suspense, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  BackHandler,
  I18nManager,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedViewProps, ThemedView as View } from "@/components/ThemedView";
import { ThemedButton as Button } from "@/components/ThemedButton";
import { useLanguage } from "@/context/LanguageContext";
import {
  IconVolleyball,
  IconSwimming,
  IconTennis,
  IconBasketball,
  IconFootball,
} from "@/assets/icons/icons";
import LoadLibraryComponent from "@/components/LoadLibraryComponent"; // a switch that choose the import path

// Define the type for component keys
type ComponentOptions = "Teams" | "Players" | "Rules";

export default function SportsTab({ lightColor, darkColor }: ThemedViewProps) {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const [horizontal, setHorizontal] = useState(true);

  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const tabBorder = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const selectedTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondryText"
  );
  const selectedTab2 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "selectedTab2"
  );
  const IconSize = 52;
  const IconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const sports = [
    {
      sportId: 1,
      en: "Football",
      ar: "كرة القدم",
      icon: (color: string | undefined) => (
        <IconFootball width={IconSize} height={IconSize} fill={color} />
      ),
    },
    {
      sportId: 2,
      en: "Basketball",
      ar: "كرة السلة",
      icon: (color: string | undefined) => (
        <IconBasketball width={IconSize} height={IconSize} fill={color} />
      ),
    },
    {
      sportId: 3,
      en: "Swimming",
      ar: "السباحة",
      icon: (color: string | undefined) => (
        <IconSwimming width={IconSize} height={IconSize} fill={color} />
      ),
    },
    {
      sportId: 4,
      en: "Tennis",
      ar: "التنس الأرضي",
      icon: (color: string | undefined) => (
        <IconTennis width={IconSize} height={IconSize} fill={color} />
      ),
    },
    {
      sportId: 5,
      en: "Volleyball",
      ar: "كرة الطائرة",
      icon: (color: string | undefined) => (
        <IconVolleyball width={IconSize} height={IconSize} fill={color} />
      ),
    },
  ];
  // State to track the selected sport and its name
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const [selectedOption, setSelectedOption] =
    useState<ComponentOptions>("Teams");
  const [playerId, setPlayerId] = useState<string>("");

  useEffect(() => {
    // Reset selected sport and option when language changes
    setSelectedSport(sports[0]);
    setSelectedOption("Teams");
  }, [language]);

  useEffect(() => {
    // Handle back button press
    const backAction = () => {
      if (playerId && playerId != "") {
        setPlayerId(""); // Go back to player selection
        return true; // Prevent default behavior
      } else {
        // Handle other back navigation if necessary, or allow default behavior
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [playerId]); // Depend on playerId to know when to handle back

  // Function to render the appropriate component based on selectedOption
  const renderSelectedComponent = () => {
    const combinedKey = `${selectedSport.en}${selectedOption}`;
    const Component = LoadLibraryComponent(combinedKey);

    switch (selectedOption) {
      case "Players":
        return (
          <Suspense
            fallback={
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            }
          >
            <View>
              {playerId === "" && selectedOption === "Players" ? (
                <>
                  <Text style={{ fontSize: 18, margin: 10 }}>
                    Select Player
                  </Text>

                  <Pressable
                    onPress={() => setPlayerId("1")}
                    style={styles.playerButton}
                  >
                    <Text style={{ fontSize: 16 }}>Player 1</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setPlayerId("2")}
                    style={styles.playerButton}
                  >
                    <Text style={{ fontSize: 16 }}>Player 2</Text>
                  </Pressable>
                </>
              ) : (
                <View style={{ position: "relative" }}>
                  <Button
                    title={language === "en" ? "Back" : "رجوع"}
                    onPress={() => setPlayerId("")}
                    style={styles.backButton}
                  />
                  <Component
                    key={playerId}
                    sport={selectedSport.en}
                    playerId={playerId}
                  />
                </View>
              )}
            </View>
          </Suspense>
        );
      case "Rules":
        return (
          <Suspense
            fallback={
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            }
          >
            <Component sport={selectedSport.en} playerId={playerId} />
          </Suspense>
        );
      case "Teams":
        return (
          <Suspense
            fallback={
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            }
          >
            <Component sport={selectedSport.en} playerId={playerId} />
          </Suspense>
        );
      default:
        throw new Error("Unknown component type");
    }
  };
  useEffect(() => {
    const isArabic = I18nManager.isRTL;
    if (isArabic) {
      I18nManager.allowRTL(false); // Force right-to-left layout
      console.log("arabic");
    } else {
      console.log("english");
    }
  }, [language]);
  return (
    <View style={styles.container}>
      <View>{isRTL ? <Text>RTl</Text> : <Text>ltr</Text>}</View>
      {/* Header Bar for Sports */}
      <View style={[styles.headerBar, horizontal ? {} : styles.fullScreen]}>
        {horizontal ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: language === "en" ? "row" : "row-reverse",
              alignItems: "flex-start",
            }}
          >
            {sports.map((sport) => (
              <Pressable
                key={sport.sportId}
                onPress={() => {
                  setSelectedSport(sport);
                  setHorizontal(true);
                }}
              >
                <View style={{ alignItems: "center" }}>
                  {sport.sportId === selectedSport.sportId
                    ? sport.icon(selectedBackgroundColor)
                    : sport.icon(IconColor)}
                  <Text
                    style={[
                      {
                        padding: 5,
                        paddingHorizontal: 12,
                        fontSize: 16,
                        marginHorizontal: 5,
                        alignSelf: "flex-start",
                      },
                      selectedSport.sportId === sport.sportId && {
                        color: selectedBackgroundColor,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {isRTL ? sport.ar : sport.en}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sports.map((sport) => (
              <Pressable
                key={sport.sportId}
                onPress={() => {
                  setSelectedSport(sport);
                  setHorizontal(false);
                }}
                style={{ width: "33%", alignItems: "center", padding: 5 }} // Adjust the width for grid
              >
                {sport.sportId === selectedSport.sportId
                  ? sport.icon(selectedBackgroundColor)
                  : sport.icon(IconColor)}
                <Text
                  style={[
                    {
                      padding: 5,
                      fontSize: 16,
                    },
                    selectedSport.sportId === sport.sportId && {
                      color: selectedBackgroundColor,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {isRTL ? sport.ar : sport.en}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        <View style={{ marginHorizontal: 32, margin: 4 }}>
          <Pressable onPress={() => setHorizontal(!horizontal)}>
            <Text>
              {horizontal
                ? language === "en"
                  ? "show all"
                  : "اظهار الجميع"
                : language === "en"
                ? "show less"
                : "اظهار اقل"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Secondary Options Bar */}
      <View style={[styles.optionsBar, isRTL && styles.rowReverse]}>
        {Object.keys(optionTitles).map((option) => (
          <Pressable
            key={option}
            onPress={() => setSelectedOption(option as ComponentOptions)}
          >
            <Text
              style={[
                {
                  padding: 5,
                  paddingHorizontal: 15,
                  fontSize: 16,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: tabBorder,
                },
                selectedOption === option && {
                  color: selectedTextColor,
                  backgroundColor: selectedBackgroundColor,
                  fontWeight: "bold",
                  borderColor: selectedBackgroundColor,
                },
              ]}
            >
              {optionTitles[option as ComponentOptions][isRTL ? "ar" : "en"]}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Selected Sport and Option Display */}

      <View style={{ flex: 1, padding: 10 }}>{renderSelectedComponent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    paddingVertical: 16,
    flexDirection: "column", // Default direction
  },
  optionsBar: {
    paddingBottom: 10,
    flexDirection: "row", // Default direction
  },
  rowReverse: {
    flexDirection: "row-reverse", // Apply reverse direction for RTL
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  playerButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  backButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    borderRadius: 20,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject, // Cover the whole screen
    zIndex: 2,
  },
});

// Define titles with translations
const optionTitles: Record<ComponentOptions, { en: string; ar: string }> = {
  Teams: { en: "Teams", ar: "الفرق" },
  Players: { en: "Players", ar: "اللاعبون" },
  Rules: { en: "Rules", ar: "القواعد" },
};
