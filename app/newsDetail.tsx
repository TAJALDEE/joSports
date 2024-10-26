import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

export default function NewsDetail() {
  const route = useRoute();
  const { title, images, description, sportId } = route.params as {
    title: string;
    images: string[];
    description: string;
    sportId: string;
  };

  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Transform images to the required format
  const formattedImages = images.map((imageUri) => ({ uri: imageUri }));

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>

        {/* Render the images with a touchable area to open the ImageView */}
        <View style={styles.imageContainer}>
          {formattedImages.map((image, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setImageIndex(index);
                setIsVisible(true);
              }}
            >
              <Image source={image} style={styles.image} resizeMode="cover" />
            </TouchableWithoutFeedback>
          ))}
        </View>

        <ImageView
          images={formattedImages}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

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
    borderRadius: 10,
    marginBottom: 15,
    marginRight: 10, // Add some margin for spacing
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
});
