import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useState } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const LoginScreen = ({navigation}) => {
    const db = useSQLiteContext();
    const [userName, setUserName] = useState ('');
    const [password, setPassword] = useState ('');

    const handleLogin = async () => {
        if (userName.length === 0 || password.length === 0){
            Alert.alert ('Attention', 'Please enter both username and password');
            return;
        }
        try {
            const user = await db.getFirstAsync('SELECT * FROM users WHERE username = ?', [userName]);
            if (!user){
                Alert.alert('Error', 'Username does not exist');
                return;
            }
            const validUser = await db.getFirstAsync ('SELECT * FROM users WHERE username = ? AND password = ?', [userName, password]);
            if (validUser) {
                Alert.alert ('Success', 'Login successful');
                navigation.navigate ('Home', {user:userName});
            } else {
                Alert.alert ('Error', 'Incorrect password');
            }
        }
        catch (error) {
            console.log ('Error during login: ', error);
        }
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>
                Login
            </Text>
            
            <TextInput 
                style={styles.input} 
                placeholder='Username'
                value = {userName}
                onChangeText={setUserName}
            />
            <TextInput 
                style={styles.input} 
                placeholder='Password' 
                secureTextEntry
                onChangeText={setPassword}
            />
            
            <Pressable style = {styles.button} onPress={handleLogin}>
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