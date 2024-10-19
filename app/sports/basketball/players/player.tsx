import React, { useEffect, useState } from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";

import playerData from "./playerData.json"; // Adjust the path to your JSON file

// Define the Player interface directly in this file
interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  height: string;
  weight: string;
  achievements: string[];
  bio: string;
}

interface PlayerProfileProps {
  playerId: string;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ playerId }) => {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const foundPlayer = playerData.find((p: Player) => p.id === playerId);
    setPlayer(foundPlayer || null); // Ensure player is not undefined
  }, [playerId]);

  if (!player) {
    return <Text>Loading...</Text>; // Loading state while fetching
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{player.name}</Text>
        <Text style={styles.position}>Position: {player.position}</Text>
        <Text>
          <Text style={styles.bold}>Team:</Text> {player.team}
        </Text>
        <Text>
          <Text style={styles.bold}>Height:</Text> {player.height}
        </Text>
        <Text>
          <Text style={styles.bold}>Weight:</Text> {player.weight}
        </Text>
        <Text style={styles.achievementTitle}>Achievements:</Text>
        {player.achievements.map((achievement, index) => (
          <Text key={index} style={styles.achievement}>
            {achievement}
          </Text>
        ))}
        <Text style={styles.bioTitle}>Bio:</Text>
        <Text>{player.bio}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  position: { fontSize: 18, color: "#555" },
  bold: { fontWeight: "bold" },
  achievementTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
  achievement: { marginLeft: 10 },
  bioTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
});

export default PlayerProfile;
