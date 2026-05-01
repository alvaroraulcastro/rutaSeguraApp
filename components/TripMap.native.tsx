import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

type RoutePoint = {
  latitude: number;
  longitude: number;
  title: string;
};

type Props = {
  startLocation?: RoutePoint;
  route: RoutePoint[];
  style?: StyleProp<ViewStyle>;
};

export default function TripMap({ startLocation, route, style }: Props) {
  if (!startLocation && !route.length) return null;

  const line = startLocation ? [startLocation, ...route] : route;
  const initial = startLocation ?? route[0];
  if (!initial) return null;

  return (
    <MapView
      style={style}
      initialRegion={{
        latitude: initial.latitude,
        longitude: initial.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      showsUserLocation
    >
      {startLocation ? (
        <Marker
          coordinate={{ latitude: startLocation.latitude, longitude: startLocation.longitude }}
          title={startLocation.title}
          pinColor="green"
        />
      ) : null}

      {route.map((point, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          title={point.title}
          pinColor={index === route.length - 1 ? 'red' : 'blue'}
        />
      ))}

      <Polyline coordinates={line} strokeWidth={4} strokeColor="#007bff" />
    </MapView>
  );
}
