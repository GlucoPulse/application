import React from 'react'
import { StatusBar, TouchableOpacity } from 'react-native'
import { SafeAreaView, StyleSheet, Text, View, Image, Linking } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const SettingsPage = () => {
  
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace ("Login")
      })
      .catch(error => alert (error.message))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={'light-content'}/>
      
      <View style={styles.header}>
        <Image source={require('../assets/word-logo-whitevar.png')} style={styles.topImage}/>
        <Text style={styles.welcomeText}>Settings</Text>
      </View>

      <View style = {styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Documentation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://github.com/GlucoPulse')}>
          <Text style={styles.buttonText}>Source Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default SettingsPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
    header: {
      width: "100%",
      height: "15%",
      backgroundColor: "#2144af",
      borderBottomRightRadius: 75,
      justifyContent: 'center',
      alignItems: 'center',
  }, 
    topImage: {
      width: 250,
      height: 50,
  },
    welcomeText: {
      color: 'white',
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 35
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#afd3e5',
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  }, 
  buttonText: {
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
      textAlign: 'center',
  },

})