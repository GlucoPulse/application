import React, { useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const SettingsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const db = getFirestore();
  const auth_2 = getAuth();

  const navigation = useNavigation();

  const email = auth.currentUser?.email;

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() =>
        Alert.alert("Email Confirmation", "Password reset email sent")
      )
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "adminTag"),
          where("userID", "==", user.uid),
          where("tagIfAdmin", "==", true)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsAdmin(true);
        }
      }
    };
    checkAdminStatus();
  }, [auth, db]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>
        <Image
          source={require("../assets/word-logo-whitevar.png")}
          style={styles.topImage}
        />
        <Text style={styles.welcomeText}>Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Documentation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View>
        {isAdmin && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={styles.buttonText}>Admin Page</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;

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
});
