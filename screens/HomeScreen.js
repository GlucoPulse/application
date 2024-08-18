import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const HomeScreen = ({navigation}) => {
    //const {user} = route.params;

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>
                Home
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },

});

export default HomeScreen;