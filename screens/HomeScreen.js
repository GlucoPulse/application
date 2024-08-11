import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Home
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default HomeScreen;