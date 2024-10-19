import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";

export default function NewsDetail() {
  const route = useRoute();
  const { title, image, description, sportid } = route.params as {
    title: string;
    image: string;
    description: string;
    sportid: string;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10, // Optional: to give it a softer look
    marginBottom: 15,
  },
  sportId: {
    fontSize: 14,
    color: "#666", // Optional: color for sport ID
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
});
