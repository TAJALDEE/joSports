import React, { useState } from "react";
import { ScrollView, StyleSheet, Pressable } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

export default function Example() {
  const x = "variable that can not be changed";
  const [variable, setVariable] = useState(0); // variable that can be changed

  function functionName() {
    setVariable(variable + 1);
  }

  function print() {
    console.log("Hellow World");
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
        {/* scroll view على شان اذا الصفحه طويله يسير ينزل لتحت*/}
        <Pressable onPress={functionName}>
          {/*بس تضغض عليه بنادي funtion تطش*/}
          <View style={styles.Container}>
            <Text> Hello World </Text>
            <Text>press to + 1 variable = {variable}</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1, // يحجز مساحه قدر الامكان
    padding: 10, // احتطياط مسافه صغيره عن طرف شاشه
    justifyContent: "center", // ينصص بالطول
    alignItems: "center", // ينصص بالعرض
  },
  Center: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
