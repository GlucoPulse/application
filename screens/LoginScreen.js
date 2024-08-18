import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

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
            <SafeAreaView style = {styles.headerStyle}>
                <Image source={require('../assets/icon.png')} style = {styles.picLogo}/>
            </SafeAreaView>
            
            <SafeAreaView style = {styles.bodyStyle}>
                <Text style = {styles.title}>
                    LOGIN
                </Text>
                <Text style = {styles.subtitle}>
                    Sign in to continue
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
        marginTop: 75,
        color: 'white'
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30
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
        color: "white"
    },
    link: {
        marginTop: 50,
    },
    linkText:{
        color: "white",
    },
    headerStyle:{
        backgroundColor: "white",
        height: heightPercentageToDP('35%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    picLogo: {
        alignContent: "stretch",
        width: 250,
        height: 250,  
        marginTop: 50    
    },
    bodyStyle:{
        height: heightPercentageToDP("100%"),
        backgroundColor: "#2144AF",
        borderTopRightRadius: 75,
        alignItems: 'center',
    },
});

export default LoginScreen;