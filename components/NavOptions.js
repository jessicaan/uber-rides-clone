import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../Slices/navSlice';
import tw from 'tailwind-react-native-classnames';

const data = [
  {
    id: '123',
    title: 'Viagem',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Pedir Comida',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-3 pb-8 pt-4 bg-gray-100 m-2 w-40"
          disabled={!origin}
        >
          <View className={`${!origin && 'opacity-20'}`}>
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: 'contain',
                marginLeft: 15,
              }}
              source={{ uri: item.image }}
            />
            <Text className="text-center mt-2 text-lg font-medium">
              {item.title}
            </Text>
            <Icon
              className=" mt-4 p-2 bg-black rounded-full w-10"
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
