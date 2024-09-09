import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

const LoginScreen = () => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');

    return (
        <KeyboardAvoidingView style = {styles.container} behavior = 'padding'>
            <View style={styles.inputContainer}>
                <TextInput placeholder = "Username" style = {styles.input} value={username} onChangeText={text => setUsername(text)} /> 
                <TextInput placeholder = "Password" style = {styles.input} secureTextEntry value={password} onChangeText={text => setPassword(text)} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress= {() => {}} style={styles.button}>
                    <Text style ={styles.buttonText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress= {() => {}} style={[styles.button, styles.buttonOutline]}>
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