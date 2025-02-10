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
import { sendPasswordResetEmail } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDatabase, ref, update } from "firebase/database";

const SettingsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const db = getFirestore();

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
    const rdb = getDatabase();
    const entryRef = ref(rdb, "health_data/entry1");
    update(entryRef, {
      bpm: 0,
      glucose: 0,
      spo2: 0,
    }).then(() => {
      console.log("Data updated successfully!");
    });

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

        <Text style={styles.welcomeText}>Settings</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Documentation")}
        >
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
            style={styles.buttonAdmin}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={styles.buttonTextAdmin}>Admin Page</Text>
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
  buttonAdmin: {
    backgroundColor: "#2144af",
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
  buttonTextAdmin: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
