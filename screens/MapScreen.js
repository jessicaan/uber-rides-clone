import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RidesCard from '../components/RidesCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from '../components/NavFavorites';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="absolute top-16 bg-gray-100 left-8 z-50 p-3 rounded-full shadow-lg"
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View className="h-1/2">
        <Map />
      </View>

      <View className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NavFavorites"
            component={NavFavorites}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RidesCard"
            component={RidesCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
