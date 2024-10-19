import React from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";

export default function Mohammad_Abu_Zaid() {
  const player = {
    name: "Mohammad Abu Zaid",
    position: "Guard",
    team: "Jordanian National Team",
    height: "6'2\"",
    weight: "180 lbs",
    achievements: [
      "Jordan Basketball League Champion (2021)",
      "Arab Club Championship - Silver Medal (2022)",
      "Top Playmaker in Jordan League (2023)",
    ],
    bio: "Mohammad Abu Zaid is known for his leadership and playmaking skills, providing crucial support for the national team.",
  };

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
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  position: { fontSize: 18, color: "#555" },
  bold: { fontWeight: "bold" },
  achievementTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
  achievement: { marginLeft: 10 },
  bioTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
});
