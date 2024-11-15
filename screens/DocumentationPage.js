import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";

const documentationMD = `

## Table of Contents

1. 
2. 
3. 

## Introduction
This is the introduction section of the essay. Here, we introduce the main topic and provide some background information.


## Body

### Section 1
In this section, we discuss the first main point of the essay. This could include various subpoints and detailed explanations.

### Section 2
This section covers the second main point. Similar to Section 1, it includes detailed discussions and examples.

## Conclusion
The conclusion summarizes the main points discussed in the essay and provides final thoughts or recommendations.
`;

const DocumentationPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>
        <Image
          source={require("../assets/word-logo-whitevar.png")}
          style={styles.topImage}
        />
        <Text style={styles.welcomeText}>Documentation</Text>
      </View>
      <ScrollView
        style={styles.scrollViewDocs}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <Markdown style={{ body: styles.markdownText }}>
          {documentationMD}
        </Markdown>
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
