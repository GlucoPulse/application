import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { useState } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const LoginScreen = ({navigation}) => {
    const db = useSQLiteContext();
    const [userName, setUserName] = useState ('');
    const [password, setPassword] = useState ('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (userName.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            Alert.alert ('Attention!', 'Please enter all the fields.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert ('Error', 'Password do not match');
            return;
        }
        try {
            const existingUser = await db.getFirstAsync ('SELECT * FROM users WHERE username = ?', [userName]);
            if (existingUser) {
                Alert.alert ('Error', 'Username already exists.');
                return;
            }
            await db.runAsync('INSERT INTO users (username, password) VALUES (?, ?)', [userName, password]);
            Alert.alert ('Success', 'Registration successful!');
            navigation.navigate ('Home', {user:userName});
        }
        catch (error) {
            console.log ('Error during registration: ', error);
        }
    }
    
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>
                Register
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
                value={password}
                onChangeText={setPassword}
            />
            <TextInput 
                style={styles.input} 
                placeholder='Password' 
                secureTextEntry
                value={confirmPassword}
                onChangeText={setPassword}
            />
            
            <Pressable style = {styles.button} onPress={handleRegister}>
                <Text style = {styles.buttonText}>
                    Register
                </Text>
            </Pressable>

            <Pressable style = {styles.link} onPress={() => navigation.navigate("Login")}>
                <Text style = {styles.linkText}>
                    Already have an account? Login
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
        marginVertical: 10,
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