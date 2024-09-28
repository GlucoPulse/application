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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const addGIDb = () => {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />
  
        <View style={styles.header}>
          <Image
            source={require("../assets/word-logo-whitevar.png")}
            style={styles.topImage}
          />
          <Text style={styles.welcomeText}>Admin Panel</Text>
        </View>
  

      </SafeAreaView>
    );
};

const AdminPage = () => {

    const navigation = useNavigation ();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />
    
            <View style={styles.header}>
            <Image
                source={require("../assets/word-logo-whitevar.png")}
                style={styles.topImage}
            />
            <Text style={styles.welcomeText}>Admin Panel</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Add to Glycemic Index Database</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Users as Admin</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate('HOME')}>
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
  },
  buttonTextHome: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },

});
