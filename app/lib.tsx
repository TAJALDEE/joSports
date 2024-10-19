// import React, {
//   Suspense,
//   useEffect,
//   useState,
//   LazyExoticComponent,
// } from "react";
// import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import { ThemedText as Text } from "@/components/ThemedText";
// import { ThemedViewProps, ThemedView as View } from "@/components/ThemedView";
// import { useLanguage } from "@/context/LanguageContext";

// // Define the type for component keys
// type ComponentOptions = "Teams" | "Players" | "Rules";

// // Define the component map with English paths
// const loadComponent = (
//   combinedKey: string
// ): LazyExoticComponent<React.FC<{ sport: string }>> => {
//   switch (combinedKey) {
//     // Football components
//     case "FootballTeams":
//       return React.lazy(() => import("../sports/football/teams/MC"));
//     case "FootballPlayers":
//       return React.lazy(() => import("../sports/football/players/messie"));
//     case "FootballRules":
//       return React.lazy(() => import("../sports/football/rules/footballrules"));

//     // Basketball components
//     case "BasketballTeams":
//       return React.lazy(
//         () => import("../sports/basketball/teams/basketballteam1")
//       );
//     case "BasketballPlayers":
//       return React.lazy(
//         () => import("../sports/basketball/players/ahmad_al_dwairi")
//       );
//     case "BasketballRules":
//       return React.lazy(
//         () => import("../sports/basketball/rules/basketballrules")
//       );
//     case "TennisTeams":
//       return React.lazy(() => import("../sports/tennis/teams/tennisteam"));
//     case "TennisPlayers":
//       return React.lazy(() => import("../sports/tennis/players/player"));
//     case "TennisRules":
//       return React.lazy(() => import("../sports/tennis/rules/tennisrules"));

//     default:
//       throw new Error("Unknown component type");
//   }
// };

// // Define titles with translations
// const optionTitles: Record<ComponentOptions, { en: string; ar: string }> = {
//   Teams: { en: "Teams", ar: "الفرق" },
//   Players: { en: "Players", ar: "اللاعبون" },
//   Rules: { en: "Rules", ar: "القواعد" },
// };

// export default function SportsTab({ lightColor, darkColor }: ThemedViewProps) {
//   const { language } = useLanguage();
//   const isRTL = language === "ar";

//   const selectedBackgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "tint"
//   );
//   const tabBorder = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "text"
//   );
//   const selectedTextColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "secondryText"
//   );
//   const selectedTab2 = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "selectedTab2"
//   );

//   const sports = [
//     { id: 1, en: "Football", ar: "كرة القدم" },
//     { id: 2, en: "Basketball", ar: "كرة السلة" },
//     { id: 3, en: "Athletics", ar: "ألعاب القوى" },
//     { id: 4, en: "Swimming", ar: "السباحة" },
//     { id: 5, en: "Tennis", ar: "التنس الأرضي" },
//     { id: 6, en: "Volleyball", ar: "كرة الطائرة" },
//   ];

//   // State to track the selected sport and its name
//   const [selectedSport, setSelectedSport] = useState(sports[0]);
//   const [selectedOption, setSelectedOption] =
//     useState<ComponentOptions>("Teams");

//   useEffect(() => {
//     // Reset selected sport and option when language changes
//     setSelectedSport(sports[0]);
//     setSelectedOption("Teams");
//   }, [language]);

//   // Function to render the appropriate component based on selectedOption
//   const renderSelectedComponent = () => {
//     const combinedKey = `${selectedSport.en}${selectedOption}`;
//     const Component = loadComponent(combinedKey);
//     return (
//       <Suspense fallback={<Text>Loading...</Text>}>
//         <Component sport={selectedSport.en} />
//       </Suspense>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header Bar for Sports */}
//       <View style={[styles.headerBar, isRTL && styles.rowReverse]}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{
//             flexDirection: isRTL ? "row-reverse" : "row",
//             justifyContent: isRTL ? "flex-end" : "flex-start",
//           }}
//         >
//           {sports.map((sport) => (
//             <TouchableOpacity
//               key={sport.id}
//               onPress={() => setSelectedSport(sport)}
//             >
//               <Text
//                 style={[
//                   {
//                     padding: 5,
//                     paddingHorizontal: 15,
//                     fontSize: 16,
//                     borderRadius: 20,
//                     marginHorizontal: 5,
//                     borderWidth: 1,
//                     borderColor: tabBorder,
//                   },
//                   selectedSport.id === sport.id && {
//                     color: selectedTextColor,
//                     backgroundColor: selectedBackgroundColor,
//                     fontWeight: "bold",
//                     borderColor: selectedBackgroundColor,
//                   },
//                 ]}
//               >
//                 {isRTL ? sport.ar : sport.en}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Secondary Options Bar */}
//       <View style={[styles.optionsBar, isRTL && styles.rowReverse]}>
//         {Object.keys(optionTitles).map((option) => (
//           <TouchableOpacity
//             key={option}
//             onPress={() => setSelectedOption(option as ComponentOptions)}
//           >
//             <Text
//               style={[
//                 {
//                   padding: 5,
//                   paddingHorizontal: 15,
//                   marginHorizontal: 5,
//                   fontSize: 16,
//                 },
//                 selectedOption === option && {
//                   fontWeight: "bold",
//                   backgroundColor: selectedTab2,
//                 },
//               ]}
//             >
//               {optionTitles[option as ComponentOptions][isRTL ? "ar" : "en"]}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Selected Sport and Option Display */}
//       <View style={{ flex: 1, padding: 10 }}>{renderSelectedComponent()}</View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headerBar: {
//     paddingVertical: 10,
//     flexDirection: "row", // Default direction
//   },
//   optionsBar: {
//     paddingBottom: 10,
//     flexDirection: "row", // Default direction
//   },
//   rowReverse: {
//     flexDirection: "row-reverse", // Apply reverse direction for RTL
//   },
// });
