import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsPage from './SettingsPage';
import ChartsPage from './ChartsPage';
import FrontPage from './FrontPage';
import ScanPage from './ScanPage';
import GlycemicLoadPage from './GlycemicLoadPage';
import { IonIcon } from '@ionic/react';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "#2144af"
    }}>
      <Tab.Screen name = "Front" component = {FrontPage} />
      <Tab.Screen name = "Glycemic Load" component={GlycemicLoadPage} />
      <Tab.Screen name = "Scan" component = {ScanPage} />
      <Tab.Screen name = "Charts" component = {ChartsPage} /> 
      <Tab.Screen name = "Settings" component = {SettingsPage} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen

