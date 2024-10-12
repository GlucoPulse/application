import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { StatusBar } from "react-native";

const FrontPage = ({}) => {
  const email = auth.currentUser?.email;
  const removeEmailString = email?.slice(0, email.indexOf("@"));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>
        <Image
          source={require("../assets/word-logo-whitevar.png")}
          style={styles.topImage}
        />
        <Text style={styles.welcomeText}> Welcome {removeEmailString}!</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.label}> Latest Analytics </Text>
      </View>
    </SafeAreaView>
  );
};

export default FrontPage;

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
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
  },
  topImage: {
    width: 250,
    height: 50,
  },
  body: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  label: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
});
