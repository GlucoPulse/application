import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import React from "react";

const DocumentationPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>

        <Text style={styles.welcomeText}>Documentation</Text>
      </View>
      <ScrollView
        style={styles.scrollViewDocs}
        contentContainerStyle={{ justifyContent: "center" }}
      >
      </ScrollView>
    </View>
  );
};

export default DocumentationPage;

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
  scrollViewDocs: {
    marginLeft: 25,
    marginTop: 20,
    marginRight: 25,
  },
  markdownText: {
    textAlign: "justify",
  },
});
