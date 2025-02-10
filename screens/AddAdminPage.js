import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const auth = getAuth();
    const firestore = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const isAdmin = email.endsWith("@gp-admin.io");

      await setDoc(doc(firestore, "adminTag", user.uid), {
        userID: user.uid,
        tagIfAdmin: isAdmin,
      });

      // Show alert based on admin status
      if (isAdmin) {
        Alert.alert("Created account", "Admin account added");
      } else {
        Alert.alert("Created account", "Account registered but not as admin");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRevokeAdmin = async () => {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateDoc(doc(firestore, "adminTag", user.uid), {
          tagIfAdmin: false,
        });
        Alert.alert("Administrator Removed", "Admin permissions revoked");
      } catch (error) {
        setError(error.message);
      }
    } else {
      Alert.alert("Error", "No user is currently logged in");
    }
  };

  const handleAddAdminRights = async () => {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateDoc(doc(firestore, "adminTag", user.uid), {
          tagIfAdmin: true,
        });
        Alert.alert("Added Administrator", "Admin permissions added");
      } catch (error) {
        setError(error.message);
      }
    } else {
      Alert.alert("Error", "No user is currently logged in");
    }
  };

  return (
    <SafeAreaView style={styles.container2}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>

        <Text style={styles.welcomeText}>Edit Glucose Load Dishes</Text>
      </View>

      <View style={styles.topBody}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleRegister} style={styles.buttonStyle2}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddAdminRights}
          style={styles.buttonStyle2}
        >
          <Text style={styles.buttonText}>Add Admin Rights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRevokeAdmin}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Revoke Admin Rights</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: "#2244af",
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonStyle2: {
    backgroundColor: "#32a1d3",
    width: 300,
    height: 55,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    borderColor: "#cccccc",
    backgroundColor: "#afd3e5",
    width: "100%",
  },
  header: {
    width: "100%",
    height: "15%",
    backgroundColor: "#2244af",
    borderBottomRightRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  topImage: {
    width: 250,
    height: 50,
    marginTop: -13,
  },
  welcomeText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
  },
  topBody: {
    backgroundColor: "white",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegistrationPage;
