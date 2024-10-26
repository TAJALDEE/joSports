import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ThemedText as Text } from "@/components/ThemedText";
import {
  ThemedView as ThemedView,
  ThemedViewProps,
} from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/context/LanguageContext";

interface Team {
  teamId: number;
  teamNameEn: string;
  teamNameAr: string;
  sportNameEn: string;
  details: string;
}

interface Player {
  playerId: number;
  playerNameEn: string;
  playerNameAr: string;
  teamId: number;
  details: string;
}

interface ApiResponse {
  team: Team;
  players: Player[];
}

export default function TeamDetails({
  lightColor,
  darkColor,
}: ThemedViewProps) {
  const { language } = useLanguage();
  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background2"
  );
  const route = useRoute();
  const { teamId } = route.params as { teamId: number };

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://sqljosports.vercel.app/api/library/teamsDetails?teamId=${teamId}`,
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
      .then((data: ApiResponse) => {
        setTeam(data.team);
        setPlayers(data.players);
      })
      .catch((error) => {
        console.error("Error fetching teams data:", error);
      });

    return () => {
      controller.abort(); // Cleanup
    };
  }, [teamId]);

  const renderPlayer = ({ item }: { item: Player }) => (
    <Pressable
      style={[styles.playerCard, { backgroundColor: selectedBackgroundColor }]}
    >
      <Text style={styles.playerName}>
        {language == "en" ? item.playerNameEn : item.playerNameAr}
      </Text>
      <Text style={styles.playerDetails}>{item.details}</Text>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      {team && (
        <View style={styles.teamInfo}>
          <Text style={styles.title}>
            {language == "en" ? team.teamNameEn : team.teamNameAr}
          </Text>
          <Text style={styles.details}>{team.details}</Text>
        </View>
      )}
      <FlatList
        data={players}
        keyExtractor={(item) => item.playerId.toString()}
        renderItem={renderPlayer}
        contentContainerStyle={styles.playerList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  teamInfo: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  details: {
    fontSize: 16,
    color: "#555",
  },
  playerList: {
    paddingBottom: 20,
  },
  playerCard: {
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android
  },
  playerName: {
    fontSize: 18,
    fontWeight: "600",
  },
  playerDetails: {
    fontSize: 14,
    color: "#777",
  },
});
