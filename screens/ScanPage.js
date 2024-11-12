import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from "react-native";
import { StatusBar } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  limitToLast,
  onValue,
} from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Correct import for Firebase Auth

const ScanPage = () => {
  const database = getDatabase();
  const firestore = getFirestore();
  const auth = getAuth(); // Initialize Firebase Auth
  const [latestEntry, setLatestEntry] = useState(null);

  useEffect(() => {
    const fetchLatestEntry = async () => {
      const countRef = ref(database, "health_data/count");
      onValue(countRef, (snapshot) => {
        const count = snapshot.val();
        const latestEntryRef = query(
          ref(database, "health_data"),
          orderByKey(),
          limitToLast(1)
        );
        onValue(latestEntryRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            if (key.startsWith(`entry${count}`)) {
              const data = childSnapshot.val();
              const filteredData = {
                bpm: data.bpm,
                glucose: data.glucose,
                spo2: data.spo2,
              };
              setLatestEntry(filteredData);
            }
          });
        });
      });
    };

    fetchLatestEntry();
  }, []);

  const saveToFirestore = async (data) => {
    const user = auth.currentUser;
    if (user) {
      console.log("Saving the following data to Firestore:");
      console.log("userBPM:", data.bpm);
      console.log("userGLUCOSE:", data.glucose);
      console.log("userSPO2:", data.spo2);
      console.log("userUserID:", user.uid);

      await addDoc(collection(firestore, "UserHealthData"), {
        userBPM: data.bpm,
        userGLUCOSE: data.glucose,
        userSPO2: data.spo2,
        userUserID: user.uid,
        HDtimestamp: new Date(), // Add timestamp here
      });

      // Show toast message
      ToastAndroid.show(
        "Data Saved: The data has been saved successfully.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View>
      {latestEntry && (
        <View>
          <Text>BPM: {latestEntry.bpm}</Text>
          <Text>Glucose: {latestEntry.glucose}</Text>
          <Text>SPO2: {latestEntry.spo2}</Text>
        </View>
      )}
      <Button
        title="Save to Profile"
        onPress={() => saveToFirestore(latestEntry)}
      />
    </View>
  );
};

export default ScanPage;
