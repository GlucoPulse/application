import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, SafeAreaView } from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>
                Login
            </Text>
            <TextInput style={styles.input} placeholder='Username'/>
            <TextInput style={styles.input} placeholder='Password' secureTextEntry/>
            
            <Pressable style = {styles.button} onPress={() => navigation.navigate("Home")}>
                <Text style = {styles.buttonText}>
                    Login
                </Text>
            </Pressable>

            <Pressable style = {styles.link} onPress={() => navigation.navigate("Register")}>
                <Text style = {styles.linkText}>
                    Don't have an account? Register
                </Text>
            </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#cccccc",
        marginVertical: 5,
    },
    button: {
        backgroundColor: "#96dcfd", //blue to be changed upon the color palette
        padding: 10,
        marginVertical: 10,
        width: "80%",
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
    },
    link: {
        marginTop: 10,
    },
    linkText:{
        color: "blue",
    },
    
});

export default LoginScreen;