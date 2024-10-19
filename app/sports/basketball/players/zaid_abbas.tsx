import React from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";

export default function Zaid_Abbas() {
  const player = {
    name: "Zaid Abbas",
    position: "Forward",
    team: "Jordanian National Team",
    height: "6'7\"",
    weight: "205 lbs",
    achievements: [
      "FIBA Asia Cup (2011) - Bronze Medal",
      "MVP of the Jordan Basketball League (2018)",
      "Top Scorer in the Jordan League (2019)",
    ],
    bio: "Zaid Abbas is a versatile forward known for his scoring ability and defensive skills, contributing significantly to the national team.",
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
