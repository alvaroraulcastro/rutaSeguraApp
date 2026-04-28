import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

type RoutePoint = {
  latitude: number;
  longitude: number;
  title: string;
};

type Props = {
  route: RoutePoint[];
  style?: StyleProp<ViewStyle>;
};

export default function TripMap({ route, style }: Props) {
  if (!route.length) return null;

  return (
    <MapView
      style={style}
      initialRegion={{
        latitude: route[0].latitude,
        longitude: route[0].longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      showsUserLocation
    >
      {route.map((point, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          title={point.title}
          pinColor={index === 0 ? 'green' : index === route.length - 1 ? 'red' : 'blue'}
        />
      ))}
      <Polyline coordinates={route} strokeWidth={4} strokeColor="#007bff" />
    </MapView>
  );
}

