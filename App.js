import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';


const initializeDatabase = async(db) => {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT
            );
        `);
        console.log ("DATABASE INITIALIZED")
    }
    catch (error) {
        console.lot ("ERROR WHILE INITIALIZING DATABASE: ", error);
    }
}

const Stack = createStackNavigator();

export default function App () {
    return (
        <SQLiteProvider databaseName='auth.db' onInit={initializeDatabase}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}} >
                    <Stack.Screen name='Login' component = {LoginScreen} />
                    <Stack.Screen name='Register' component = {RegisterScreen} />
                    <Stack.Screen name='Home' component = {HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SQLiteProvider>
    );
}