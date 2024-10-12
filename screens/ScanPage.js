import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import React from "react";
import { BleManager, Device } from "react-native-ble-plx";

const ScanPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>
        <Image
          source={require("../assets/word-logo-whitevar.png")}
          style={styles.topImage}
        />
        <Text style={styles.welcomeText}>Scan</Text>
      </View>

      <TouchableOpacity style={[styles.button, { marginTop: 30 }]}>
        <Text style={styles.buttonText}>Paired</Text>
      </TouchableOpacity>

      <Text style={styles.buttonText}>Status: Paired</Text>

      <Text style={[styles.buttonText, { fontSize: 30, marginTop: 80 }]}>
        100
      </Text>

      <Text style={[styles.buttonText, { fontSize: 15 }]}>Glucose Level</Text>

      <TouchableOpacity style={[styles.button, { marginTop: 120 }]}>
        <Text style={styles.buttonText}>Save Value</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ScanPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: "100%",
    height: "15%",
    backgroundColor: "#2144af",
    borderBottomRightRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  topImage: {
    width: 250,
    height: 50,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
  },
  button: {
    backgroundColor: "#afd3e5",
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
