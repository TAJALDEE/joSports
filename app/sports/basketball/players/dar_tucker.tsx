import React from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";

export default function Dar_Tucker() {
  const player = {
    name: "Dar Tucker",
    position: "Guard",
    team: "Jordanian National Team",
    height: "6'4\"",
    weight: "190 lbs",
    achievements: [
      "Jordan League Champion (2020)",
      "Arab Club Championship - Gold Medal (2021)",
      "FIBA Asia Cup Participant (2019)",
    ],
    bio: "Dar Tucker is an explosive guard known for his scoring and playmaking ability, making him an essential player for the national team.",
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
