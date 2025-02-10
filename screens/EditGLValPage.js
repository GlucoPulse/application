import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import {
  doc,
  getDocs,
  updateDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { TouchableOpacity } from "react-native";

const EditGLValPage = () => {
  const db = getFirestore();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [description, setDescription] = useState("");
  const [food, setFood] = useState("");
  const [glycemicIndex, setGlycemicIndex] = useState("");
  const [glycemicLoad, setGlycemicLoad] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "glycemicLoad"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setDescription(item.description);
    setFood(item.food);
    setGlycemicIndex(item.glycemic_index);
    setGlycemicLoad(item.glycemic_load);
    setServingSize(item.serving_size);
    setImageUrl(item.image_url);
  };

  const handleSave = async () => {
    if (selectedItem) {
      const itemRef = doc(db, "glycemicLoad", selectedItem.id);
      await updateDoc(itemRef, {
        description,
        food,
        glycemic_index: glycemicIndex,
        glycemic_load: glycemicLoad,
        serving_size: servingSize,
        image_url: imageUrl,
      });
      setSelectedItem(null);
      setDescription("");
      setFood("");
      setGlycemicIndex("");
      setGlycemicLoad("");
      setServingSize("");
      setImageUrl("");
      // Refresh the list
      const querySnapshot = await getDocs(collection(db, "glycemicLoad"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);

      Alert.alert("Edit", "Value Saved.");
    }
  };

  return (
    <SafeAreaView style={styles.container2}>
      <StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

      <View style={styles.header}>

        <Text style={styles.welcomeText}>Edit Glucose Load Dishes</Text>
      </View>

      <ScrollView style={styles.container}>
        {items.map((item) => (
          <View key={item.id} style={styles.infoLine}>
            <Text style={styles.foodText}>{item.food}</Text>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles.buttonEdit}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}

        {selectedItem && (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              placeholder="Food"
              value={food}
              onChangeText={setFood}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Glycemic Index"
              inputMode="numeric"
              value={glycemicIndex}
              onChangeText={setGlycemicIndex}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Glycemic Load"
              inputMode="numeric"
              value={glycemicLoad}
              onChangeText={setGlycemicLoad}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Serving Size"
              inputMode="numeric"
              value={servingSize}
              onChangeText={setServingSize}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  editContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
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
  container2: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  container: {
    padding: 20,
    width: "90%",
    height: "100%",
  },
  infoLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  foodText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#32a1d3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonEdit: {
    backgroundColor: "#32a1d3",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default EditGLValPage;
