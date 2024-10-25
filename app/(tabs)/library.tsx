import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  BackHandler,
  I18nManager,
  FlatList,
  Image,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedViewProps, ThemedView as View } from "@/components/ThemedView";
import { useLanguage } from "@/context/LanguageContext";
import * as Icons from "@/assets/icons/icons";
import LoadLibraryComponent from "@/components/LoadLibraryComponent"; // a switch that choose the import path
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

// Define the type for component keys
type ComponentOptions = "Teams" | "Players" | "Rules";
interface Sport {
  sportId: number;
  en: string;
  ar: string;
}
interface Team {
  teamId: number;
  en: string;
  ar: string;
}

interface Player {
  playerId: number;
  en: string;
  ar: string;
}
type Nt = {
  TeamDetails: Team;
};
export default function SportsTab({ lightColor, darkColor }: ThemedViewProps) {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const [horizontal, setHorizontal] = useState(true);
  const navigation = useNavigation<NavigationProp<Nt>>();

  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const iconSize = 52;
  const IconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const sportsPlaceholder: Sport = {
    sportId: 404,
    en: "Football",
    ar: "Loading",
  };
  const [sportsData, setSportsData] = useState<Sport[]>([]);
  const [loadingSports, setLoadingSports] = useState(true);

  // sport fetching
  useEffect(() => {
    const controller = new AbortController();

    fetch("https://sqljosports.vercel.app/api/library/sports", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map(
          (
            sport: { sportNameEn: string; sportNameAr: string },
            index: number
          ) => ({
            sportId: index,
            en: sport.sportNameEn.trim(),
            ar: sport.sportNameAr.trim(),
          })
        );
        console.log(formattedData);
        setSportsData(formattedData);
        return formattedData; // Return formattedData to the next then
      })
      .then((formattedData) => {
        if (formattedData.length > 0) {
          setSelectedSport(formattedData[0]); // Set the first sport as the selected sport
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching sports data:", error);
        }
      })
      .finally(() => {
        setLoadingSports(false);
      });

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, []);

  const getIconComponent = (sportName: string, color: string | undefined) => {
    const IconComponent = (Icons as any)[`Icon${sportName}`]; // Access icon dynamically
    return IconComponent ? (
      <IconComponent width={iconSize} height={iconSize} fill={color} />
    ) : null;
  };
  // State to track the selected sport and its name
  const [selectedSport, setSelectedSport] = useState(sportsPlaceholder);
  const [selectedOption, setSelectedOption] =
    useState<ComponentOptions>("Teams");
  const [playerId, setPlayerId] = useState<string>("");

  // back handler
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
  }, [playerId]);

  //  selected component rendering
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);

  useEffect(() => {
    if (selectedSport && selectedOption == "Teams" && loadingSports == false) {
      const controller = new AbortController();
      setLoadingFetch(false);

      fetch(
        `https://sqljosports.vercel.app/api/library/teams?sportNameEn=${selectedSport.en}`,
        {
          signal: controller.signal,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const formattedTeams = data.map(
            (
              team: {
                teamId: string;
                teamNameEn: string;
                teamNameAr: string;
              },
              index: any
            ) => ({
              teamId: team.teamId, // Adjust based on your actual data structure
              en: team.teamNameEn.trim(),
              ar: team.teamNameAr.trim(),
            })
          );
          console.log("formattedTeams");
          console.log(formattedTeams);
          setTeamsData(formattedTeams);
          setLoadingFetch(true);
          if (formattedTeams.length > 0) {
            setSelectedTeam(formattedTeams[0]); // Select the first team by default
          }
        })
        .catch((error) => {
          console.error("Error fetching teams data:", error);
        });

      return () => {
        controller.abort(); // Cleanup
      };
    }
  }, [selectedOption, selectedSport, loadingSports]);

  useEffect(() => {
    if (selectedTeam && selectedOption == "Players" && loadingSports == false) {
      const controller = new AbortController();
      setLoadingFetch(false);
      fetch(
        `https://sqljosports.vercel.app/api/library/players?teamNameEn=${selectedTeam.en}&sportNameEn=${selectedSport.en}`,
        {
          signal: controller.signal,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const formattedPlayers = data.map(
            (
              player: { playerNameEn: string; playerNameAr: string },
              index: number
            ) => ({
              playerId: index, // Adjust based on your actual data structure
              en: player.playerNameEn.trim(),
              ar: player.playerNameAr.trim(),
            })
          );
          console.log("formattedPlayers");
          console.log(formattedPlayers);
          setPlayersData(formattedPlayers);
          setLoadingFetch(true);
        })
        .catch((error) => {
          console.error("Error fetching players data:", error);
        });

      return () => {
        controller.abort(); // Cleanup
      };
    }
  }, [selectedOption, selectedSport, loadingSports]);

  const renderTeamItem = ({ item }: { item: Team }) => (
    <Pressable
      style={{
        flex: 1,
        marginHorizontal: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: textColor,
        paddingVertical: 8,
        marginVertical: 8,
        alignItems: "center", // Center the content
      }}
      onPress={() => {
        navigation.navigate("TeamDetails", item);
      }}
    >
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={{ width: 56, height: 56, marginBottom: 4 }}
      />
      <Text style={{ fontSize: 16 }}>{item.en}</Text>
    </Pressable>
  );
  const renderPlayerItem = ({ item }: { item: Player }) => (
    <Pressable
      style={{
        flex: 1,
        marginHorizontal: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: textColor,
        paddingVertical: 8,
        marginVertical: 8,
        alignItems: "center", // Center the content
      }}
      onPress={() => setSelectedPlayer(item)}
    >
      <Text style={{ fontSize: 16 }}>{item.en}</Text>
    </Pressable>
  );

  const renderSelectedComponent = () => {
    const combinedKey = `${selectedSport.en}${selectedOption}`;
    const Component = LoadLibraryComponent(combinedKey);

    switch (selectedOption) {
      case "Players":
        return (
          <View style={{ flex: 1 }}>
            {teamsData.length > 0 && loadingFetch ? (
              <FlatList
                data={playersData}
                renderItem={renderPlayerItem}
                keyExtractor={(item) => item.playerId.toString()}
                contentContainerStyle={{ padding: 16 }}
                numColumns={2}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            )}
          </View>
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
          <View style={{ flex: 1 }}>
            {teamsData.length > 0 && loadingFetch ? (
              <FlatList
                data={teamsData}
                renderItem={renderTeamItem}
                keyExtractor={(item) => item.teamId.toString()}
                contentContainerStyle={{ padding: 16 }}
                numColumns={2}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            )}
          </View>
        );

      default:
        throw new Error("Unknown component type");
    }
  };

  // scroll to X
  useEffect(() => {
    const isArabic = I18nManager.isRTL;
    if (isArabic) {
      I18nManager.allowRTL(false); // Force right-to-left layout
      console.log("arabic");
    } else {
      console.log("english");
    }
  }, [language]);
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (horizontal) {
      const timer = setTimeout(() => {
        const itemWidth = 110;
        const scrollToX = selectedSport.sportId * itemWidth;
        const lenght = (sportsData.length - 1) * itemWidth - 300;
        const scrollToXar = lenght - scrollToX;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: language === "ar" ? scrollToXar : scrollToX,
          });
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isFocused, selectedSport]); // Runs when selectedSport changes

  if (loadingSports) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading sports data...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={[styles.headerBar, horizontal ? {} : styles.fullScreen]}>
        {horizontal ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: language === "en" ? "row" : "row-reverse",
              alignItems: "flex-start",
            }}
          >
            {sportsData?.map((sport) => (
              <Pressable
                key={sport.sportId}
                onPress={() => setSelectedSport(sport)}
              >
                <View style={{ alignItems: "center" }}>
                  {getIconComponent(
                    sport.en,
                    sport.sportId === selectedSport.sportId
                      ? selectedBackgroundColor
                      : IconColor
                  )}
                  <Text
                    style={[
                      {
                        padding: 5,
                        paddingHorizontal: 12,
                        fontSize: 16,
                        marginHorizontal: 5,
                        alignSelf: "flex-start",
                      },
                      sport.sportId === selectedSport.sportId && {
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
              flexDirection: language === "en" ? "row" : "row-reverse",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sportsData.map((sport) => (
              <Pressable
                key={sport.sportId}
                onPress={() => {
                  setSelectedSport(sport);
                  setHorizontal(false);
                }}
                style={{ width: "33%", alignItems: "center", padding: 5 }} // Adjust the width for grid
              >
                {getIconComponent(
                  sport.en,
                  sport.sportId === selectedSport.sportId
                    ? selectedBackgroundColor
                    : IconColor
                )}
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
                  borderColor: textColor,
                },
                selectedOption === option && {
                  color: selectedBackgroundColor,

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
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
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
