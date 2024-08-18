import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

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
            <SafeAreaView style = {styles.headerStyle}>
                <Image source = {require('../assets/word-logo.png')} style = {styles.picLogo} />
            </SafeAreaView>
            
            <SafeAreaView style = {styles.bodyStyle}>
                <Text style = {styles.title}>
                    REGISTER
                </Text>
                <Text style = {styles.subtitle}>
                    Create an account to continue
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
                    placeholder='Confirm Password' 
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 5,
        marginTop: 100,
        color: 'white'
    },
    input: {
        width: "80%",
        padding: 15,
        borderWidth: 0,
        borderColor: "#cccccc",
        marginVertical: 10,
        backgroundColor: "#768cc9",
        borderRadius: 15,
    },
    button: {
        backgroundColor: "black",
        padding: 10,
        marginVertical: 15,
        width: "75%",
        borderRadius: 15,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        color: 'white'
    },
    link: {
        marginTop: 50,
    },
    linkText:{
        color: "white",
    },
    headerStyle: {
        backgroundColor: "white",
        height: heightPercentageToDP ('20%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    picLogo: {
        alignContent: 'stretch',
        width: 300,
        height: 300,
        marginTop: 50
    },
    bodyStyle: {
        height: heightPercentageToDP("100%"),
        backgroundColor: '#2144Af',
        borderTopLeftRadius: 75,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 50,    
    }
});

export default LoginScreen;