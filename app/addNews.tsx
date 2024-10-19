import React, { useState } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedTextInput as TextInput } from "@/components/ThemedTextInput";
import { ThemedButton as Button } from "@/components/ThemedButton";
import * as ImagePicker from "expo-image-picker";

export default function ArticleWriter() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleThumbnailPicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        setThumbnail(result.assets[0].uri);
      }
    } else {
      alert("Permission to access camera roll is required!");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("message sending");
      const response = await fetch("http://192.168.100.22:7173/api/User/res");

      if (response.ok) {
        const res = await response.json();
        console.log(res);
        // Handle the users data (e.g., set it to state)
      } else {
        alert("Failed to fetch users. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>Add Main Image</Text>
          {thumbnail ? (
            <>
              <Image
                source={{ uri: thumbnail }}
                style={{ width: "100%", height: 200 }}
              />
              <Button
                title="Choose Another Image"
                onPress={handleThumbnailPicker}
              />
            </>
          ) : (
            <Button title="Choose Main Image" onPress={handleThumbnailPicker} />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Article Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.contentInput}
          placeholder="Write your article here..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  promptBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  contentInput: {
    flex: 1,
    minHeight: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 5,
  },
});
function setData(data: any) {
  throw new Error("Function not implemented.");
}
