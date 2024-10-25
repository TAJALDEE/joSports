import React, { Suspense } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
//import { useMap } from "@/context/MapContext"; // Adjust the import path as needed
import Map from "../map"; // Adjust the import path as needed

const MapScreen: React.FC = () => {
  //const { currentMap, toggleMap } = useMap(); // Use the context   {currentMap === "Map" ? <Map /> : <Login />}

  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading</Text>
          </View>
        }
      >
        <Map />
      </Suspense>
    </View>
  );
};

export default MapScreen;
