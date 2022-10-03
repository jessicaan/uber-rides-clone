import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API } from '@env';
import { ColorSchemeProvider } from 'tailwindcss-react-native/dist/context/color-scheme';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../Slices/navSlice';
import NavFavorites from '../components/NavFavorites';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView className="bg-white h-full items-center">
      <View className="p-5">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        <View
          className={`${
            !origin && 'border-2'
          } flex-row justify-between items-center`}
        >
          <Icon
            name="map-marker"
            type="font-awesome"
            size={15}
            className="pb-2 pl-3"
          />

          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 2 - 1,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_API,
              language: 'pt-BR',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Saindo de..."
          />
        </View>
        <NavOptions />
        <View className="flex-row justify-center p-5">
          <Icon
            name="activity"
            type="feather"
            size={15}
            className="pr-1 pt-2"
          />
          <Text className="text-lg">Locais Favoritos </Text>
          <Icon
            name="activity"
            type="feather"
            size={15}
            className="pr-1 pt-2"
          />
        </View>
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
