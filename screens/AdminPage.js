import { StatusBar } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AdminPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>

        <Text style={styles.welcomeText}>Admin Panel</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddGL")}
        >
          <Text style={styles.buttonText}>Add to Glycemic Load Database</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditGL")}
        >
          <Text style={styles.buttonText}>Edit Glycemic Load Database</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddAdmin")}
        >
          <Text style={styles.buttonText}>Administrator Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonHome}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonTextHome}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: "100%",
    height: "15%",
    backgroundColor: "#2244af",
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
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#afd3e5",
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonHome: {
    backgroundColor: "#2244af",
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonTextHome: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
