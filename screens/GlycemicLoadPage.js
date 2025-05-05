import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	FlatList,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	Modal,
	ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getAuth } from "firebase/auth";

const GlycemicLoadPage = () => {
	const auth = getAuth();
	const db = getFirestore();

	const user = auth.currentUser;
	const userID = user.uid;

	const [dishes, setDishes] = useState([]);
	const [filteredDishes, setFilteredDishes] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedGLValue, setSelectedGLValue] = useState(null);
	const [servingSize, setServingSize] = useState('1');
	const [selectedItem, setSelectedItem] = useState(null);

	const getData = async () => {
		const queryRef = collection(db, "glycemicLoad");
		const querySnapshot = await getDocs(queryRef);
		const fetchedDishes = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			fetchedDishes.push({
				id: doc.id,
				...data,
				glycemic_load: data.glycemic_load.toString(), // Ensure glycemic_load is a string
			});
		});
		setDishes(fetchedDishes);
		setFilteredDishes(fetchedDishes);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (searchQuery) {
			const filtered = dishes.filter((dish) =>
				dish.food.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredDishes(filtered);
		} else {
			setFilteredDishes([]);
		}
	}, [searchQuery, dishes]);

	const userChoice = (glycemicLoadValue) => {
		setSelectedGLValue(glycemicLoadValue);
		setServingSize('1');
		setModalVisible(true);
	};

	const saveGlycemicLoad = async () => {
		const size = parseFloat(servingSize) || 1;
		const originalServingSize = parseFloat(selectedItem.serving_size) || 1;
		const adjustedGL = selectedGLValue * (size / originalServingSize);

		try {
			await addDoc(collection(db, 'valGLUser'), {
				glycemicLoad: adjustedGL,
				timestamp: new Date(),
				userid: userID,
			});
			ToastAndroid.show(
				'Value Saved: The value has been saved successfully.',
				ToastAndroid.SHORT
			);
		} catch (error) {
			console.error('Error saving value:', error);
			ToastAndroid.show('Saving Failed: An error occurred.', ToastAndroid.SHORT);
		}
		setModalVisible(false);
	};

	const moreInfo = () => {
		Alert.alert(
			"More info about Glycemic Load",
			"Glycemic Load measures how much a food will raise a person’s blood glucose level after eating it, considering both the amount of carbohydrates and the glycemic index of the food. It’s a more accurate way to understand a food’s impact on blood sugar than GI alone.\n\nSearch for a food you have recently had. After tapping on a food item, it will automatically be saved and linked to your Glycemic Load Records.",
			[
				{
					text: "GOT IT",
				},
			]
		);
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					setSelectedItem(item); 
					setSelectedGLValue(parseFloat(item.glycemic_load));
					setModalVisible(true);
				}}
			>
				<View style={styles.rightColumn}>
					<Text style={styles.foodText}>{item.food}</Text>
					<Text style={styles.descriptionText}>{item.description}</Text>
				</View>

				<View style={styles.leftColumn}>
					<Image source={{ uri: item.image_url }} style={styles.image} />


					<Text style={styles.indexText}>
						Glycemic Load: {parseInt(item.glycemic_load)}
					</Text>

					<Text style={styles.loadText}>
						Glycemic Index: {item.glycemic_index}
					</Text>
					<Text style={styles.loadText}>Serving Size: {item.serving_size}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>
				<Image
					source={require("../assets/word-logo-whitevar.png")}
					style={styles.topImage}
				/>
				<Text style={styles.welcomeText}>Glycemic Load</Text>
			</View>

			<View style={styles.topBody}>
				<TextInput
					placeholder="Search for foods"
					value={searchQuery}
					onChangeText={setSearchQuery}
					style={styles.input}
				/>

				<TouchableOpacity style={styles.infoLine} onPress={moreInfo}>
					<MaterialIcons
						name="info"
						size={22}
						color="#808080"
						style={{ marginRight: 5 }}
					/>
					<Text style={{ color: "#808080" }}>
						More info about Glycemic Load
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
				<FlatList
					data={filteredDishes}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</View>

			<Modal visible={modalVisible} animationType="slide" transparent>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<Text style={styles.label}>Enter Serving Size (g/ml):</Text>
						<TextInput
							style={styles.input}
							keyboardType="numeric"
							value={servingSize}
							onChangeText={setServingSize}
						/>
						<View style={styles.buttonRow}>
							<TouchableOpacity onPress={() => setModalVisible(false)}>
								<Text style={styles.cancelButton}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={saveGlycemicLoad}>
								<Text style={styles.saveButton}>Save</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</KeyboardAvoidingView>
	);
};

export default GlycemicLoadPage;

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
	topBody: {
		backgroundColor: "white",
		width: "80%",
		justifyContent: "center",
	},
	input: {
		marginTop: 20,
		marginBottom: 15,
		backgroundColor: "white",
		padding: 15,
		borderRadius: 15,
		borderColor: "#cccccc",
		backgroundColor: "#afd3e5",
	},
	itemContainer: {
		padding: 10,
		marginVertical: 5,
	},
	button: {
		backgroundColor: "#2244af",
		borderRadius: 10,
		padding: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		flexDirection: "row",
		width: 350,
		height: 200,
	},
	foodText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
	},
	descriptionText: {
		fontSize: 14,
		color: "#fff",
		marginVertical: 5,
	},
	indexText: {
		marginTop: 4,
		fontSize: 12,
		color: "#fff",
	},
	loadText: {
		fontSize: 12,
		color: "#fff",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginTop: 10,
	},
	leftColumn: {
		flex: 1,
		alignItems: "center",
	},
	rightColumn: {
		flex: 1,
		marginLeft: 10,
	},
	infoLine: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
	},
	body: {
		height: "65%",
	},
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		width: '80%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cancelButton: {
		color: 'red',
		fontSize: 16,
		paddingHorizontal: 10,
	},
	saveButton: {
		color: 'green',
		fontSize: 16,
		paddingHorizontal: 10,
	},
});
