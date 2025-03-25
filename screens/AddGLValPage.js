import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	Button,
	Alert,
} from "react-native";
import { StatusBar } from "react-native";
import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { TouchableOpacity } from "react-native";

const AddGLValPage = () => {
	const [description, setDescription] = useState("");
	const [food, setFood] = useState("");
	const [glycemicIndexV, setGlycemicIndexV] = useState("");
	const [glycemicLoadV, setGlycemicLoadV] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [servingSize, setServingSize] = useState("");

	const db = getFirestore();

	const loadData = async () => {
		if (
			!description ||
			!food ||
			!glycemicIndexV ||
			!glycemicLoadV ||
			!imageUrl ||
			!servingSize
		) {
			Alert.alert("Warning", "Please fill in all fields.");
			return;
		}

		try {
			const docRef = await addDoc(collection(db, "glycemicLoad"), {
				description,
				food,
				glycemic_index: parseInt(glycemicIndexV),
				glycemic_load: parseInt(glycemicLoadV),
				image_url: imageUrl,
				serving_size: servingSize,
			});
			Alert.alert("Success", `Document added with ID: ${docRef.id}`);
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
			Alert.alert("Error", "There was an error adding the document.");
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>

				<Text style={styles.welcomeText}>Add Glycemic Load Dishes</Text>
			</View>

			<View style={styles.body}>
				<TextInput
					placeholder="Enter Food Name"
					style={styles.input}
					value={food}
					onChangeText={setFood}
				/>
				<TextInput
					placeholder="Enter Food Description"
					style={styles.input}
					value={description}
					onChangeText={setDescription}
				/>
				<TextInput
					placeholder="Enter Food Glycemic Index Value"
					inputMode="numeric"
					style={styles.input}
					value={glycemicIndexV}
					onChangeText={setGlycemicIndexV}
				/>
				<TextInput
					placeholder="Enter Food Glycemic Load Value"
					style={styles.input}
					inputMode="numeric"
					value={glycemicLoadV}
					onChangeText={setGlycemicLoadV}
				/>
				<TextInput
					placeholder="Enter Food Image URL"
					style={styles.input}
					value={imageUrl}
					onChangeText={setImageUrl}
				/>
				<TextInput
					placeholder="Enter Food Serving Size(g)"
					inputMode="numeric"
					style={styles.input}
					value={servingSize}
					onChangeText={setServingSize}
				/>

				<TouchableOpacity onPress={loadData} style={styles.buttonStyle}>
					<Text style={styles.buttonText}>Add Value</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default AddGLValPage;

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
		marginTop: -13,
	},
	welcomeText: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 35,
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
	body: {
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
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
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
});
