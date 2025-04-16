import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  useEffect(() => {
    // Request location permission
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso denegado");
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      });
    })();
  }, []);

  // Show loading indicator while waiting for location
  if (!region) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <MapView style={{ flex: 1 }} region={region} showsUserLocation={true}>
      <Marker coordinate={region} title="Estás aquí" />
    </MapView>
  );
}
