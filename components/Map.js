import { View, Text, Alert } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../Slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from '@env';
import { Icon } from 'react-native-elements';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Ajustando o zoom ao caminho no mapa
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data === null) return;

          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_API]);

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      className="flex-1"
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_API}
          strokeWidth={5}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origem"
          description={origin.description}
          identifier="origin"
          moveOnMarkerPress={true}
        >
          <View className="bg-white rounded-full p-0.5">
            <Icon name="car" type="font-awesome" />
          </View>
        </Marker>
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destino"
          description={destination.description}
          identifier="destination"
        >
          <View className="bg-white rounded-full p-0.5 ">
            <Icon name="map-marker" type="font-awesome" />
          </View>
        </Marker>
      )}
    </MapView>
  );
};

export default Map;
