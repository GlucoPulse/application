import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'


const ScanPage = () => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={"#2244af"} barStyle={'light-content'}/>
    
    <View style={styles.header}>
      <Image source={require('../assets/word-logo-whitevar.png')} style={styles.topImage}/>
      <Text style={styles.welcomeText}>Scan</Text>
    </View>
    </SafeAreaView>
  )
}

export default ScanPage

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
})