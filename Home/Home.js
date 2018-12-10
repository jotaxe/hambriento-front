import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import MapScreen from './MapScreen';
import RestaurantScreen from './RestaurantScreen';
import SettingScreen from './SettingScreen';

export default createBottomTabNavigator({
  Mapa: { screen: MapScreen },
  Restaurants: { screen: RestaurantScreen },
  Settings: { screen: SettingScreen },
});
