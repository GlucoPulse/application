import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import firebaseConfig from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = () => {
    const [email, setEmail] = useState ('');
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword (auth, email, password)
            .then ((userCredentials) => {
                const user = userCredentials.user;
                console.log (user.username);
            })
            .catch((error) => {alert(error.message)}); //WEAK PASSWORD AND USED EMAIL
    }

    return (
        <KeyboardAvoidingView style = {styles.container} behavior = 'padding'>
            <View style={styles.inputContainer}>
                <TextInput placeholder = "Email" style = {styles.input} value={email} onChangeText={text => setEmail(text)} /> 
                <TextInput placeholder = "Username" style = {styles.input} value={username} onChangeText={text => setUsername(text)} /> 
                <TextInput placeholder = "Password" style = {styles.input} secureTextEntry value={password} onChangeText={text => setPassword(text)} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress= {() => {}} style={styles.button}>
                    <Text style ={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress= {handleSignUp} style={[styles.button, styles.buttonOutline]}>
                    <Text style ={styles.buttonOutlineText}> Register </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15, 
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#1782fa',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    }, 
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#1782fa',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#1782fa',
        fontWeight: '700',
        fontSize: 16,
    },
})