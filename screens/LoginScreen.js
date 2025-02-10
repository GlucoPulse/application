import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      }); // ALERT TO SHOW FOR WEAK PASSWORD AND USED EMAILS
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => {
        alert(error.message);
      }); // ALERT TO SHOW FOR WEAK PASSWORD AND USED EMAILS
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={styles.header}>
       
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>LOGIN </Text>
        <Text style={styles.subtitle}>Sign in to continue </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={[styles.buttonReg]}>
            <Text style={styles.buttonOutlineText}> Register </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.pressFP}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  body: {
    height: "100%",
    backgroundColor: "#2144af",
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: 75,
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
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    borderColor: "#cccccc",
    marginVertical: 10,
    backgroundColor: "#758bcd",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
    height: 55,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonReg: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
    height: 55,
  },
  buttonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  pressFP: {
    fontSize: 16,
    marginTop: 30,
    color: "white",
    textDecorationLine: "underline",
  },
});
