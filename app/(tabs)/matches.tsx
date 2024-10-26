import React from "react";
import { StyleSheet, FlatList, Image, View } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedViewProps, ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface match {
  matchId: string;
  teamA: string;
  teamB: string;
  score: string;
  date: string;
  time: string;
  place: string;
}

const matchData = [
  {
    matchId: "1",
    teamA: "Team A",
    teamB: "Team B",
    score: "2 - 1",
    date: "2024-10-25",
    time: "15:00",
    place: "Stadium A",
  },
  {
    matchId: "2",
    teamA: "Team C",
    teamB: "Team D",
    score: "0 - 3",
    date: "2024-10-26",
    time: "17:00",
    place: "Stadium B",
  },
  {
    matchId: "3",
    teamA: "Team E",
    teamB: "Team F",
    score: "1 - 1",
    date: "2024-10-27",
    time: "19:00",
    place: "Stadium C",
  },
];

const MatchResults = ({ lightColor, darkColor }: ThemedViewProps) => {
  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background2"
  );

  const renderMatchItem = ({ item }: { item: match }) => (
    <ThemedView
      style={[styles.card, { backgroundColor: selectedBackgroundColor }]}
    >
      <Text style={styles.date}>
        {item.date} {item.time}
      </Text>

      <View style={styles.row}>
        <View style={styles.teamContainer}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.teamName}>{item.teamA}</Text>
        </View>
        <Text style={styles.score}>{item.score}</Text>
        <View style={styles.teamContainer}>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.teamName}>{item.teamB}</Text>
        </View>
      </View>
      <Text style={styles.place}>{item.place}</Text>
    </ThemedView>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={matchData}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.matchId}
        contentContainerStyle={styles.container}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  place: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamContainer: {
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default MatchResults;
