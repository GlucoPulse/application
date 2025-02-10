import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import { useState } from "react";
import React from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() =>
        Alert.alert("Email Confirmation", "Password reset email sent")
      )
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.header}>
       
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>RESET PASSWORD </Text>
        <Text style={styles.subtitle}>Check your email address </Text>
        <TextInput
          placeholder="Enter Your Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonReturn}
        >
          <Text style={styles.buttonTextReturn}>Return to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  header: {
    height: "30%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  picLogo: {
    alignContent: "stretch",
    width: 250,
    height: 250,
    marginTop: 50,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
  },
  body: {
    height: "100%",
    backgroundColor: "#2144af",
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: 75,
  },
  button: {
    backgroundColor: "black",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    height: 55,
  },
  buttonReturn: {
    backgroundColor: "white",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonTextReturn: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    borderColor: "#cccccc",
    backgroundColor: "#758bcd",
    width: "80%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 35,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
  },
});
