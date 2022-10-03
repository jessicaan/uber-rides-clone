import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'react-native-elements';
import {
  selectOrigin,
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from '../Slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GOOGLE_API } from '@env';
import RidesCard from './RidesCard';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Casa',
    address:
      'Rua Comandante Rodolfo Coelho da Silva, 44 - Vilamar, Praia Grande - SP, Brasil',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Trabalho',
    address: 'Rua João Pessoa, 69 - Centro, Santos - SP, Brasil',
  },
];

const NavFavorites = () => {
  const dispatch = useDispatch(setDestination);
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="bg-gray-50 h-0.5" />}
      renderItem={({ item: { location, address, icon }, item }) => (
        <TouchableOpacity
          disabled={!origin}
          fetchDetails={true}
          onPress={(data, details = null) => {
            fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${item.address}&key=${GOOGLE_API}`,
              {
                method: 'GET',
              }
            )
              .then((res) => res.json())
              .then((data) => {
                // console.log(data.results[0].formatted_address);
                dispatch(
                  setDestination({
                    location: data.results[0].geometry.location,
                    description: data.results[0].formatted_address,
                  })
                );
                navigation.navigate('MapScreen', { screen: 'RidesCard' });
              });
          }}
          className={`${!origin && 'opacity-40'} flex-row items-center p-5`}
        >
          <Icon
            className="mr-4 rounded-full bg-gray-300 p-3"
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View className="flex-1">
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
