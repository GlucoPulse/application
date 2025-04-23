import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ToastAndroid,
	Alert,
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
import { getAuth } from "firebase/auth";
import * as IntentLauncher from "expo-intent-launcher";

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
	*/
	/*
	useEffect(() => {
		const fetchLatestEntry = async () => {
			const countRef = ref(database, "health_data/count");
			onValue(countRef, (snapshot) => {
				const count = snapshot.val();
				if (!count) {
					console.warn("No count found in database.");
					return;
				}

				const latestEntryRef = ref(database, `health_data/entry${count}`);

				onValue(latestEntryRef, (snapshot) => {
					const data = snapshot.val();
					if (data) {
						const now = Date.now();
						const FIVE_MINUTES = 5 * 60 * 1000;

						if (data.timestamp && now - data.timestamp <= FIVE_MINUTES) {
							const filteredData = {
								glucose: data.glucose,
								spo2: data.spo2,
							};
							setLatestEntry(filteredData);
						} else {
							console.warn("Latest entry is older than 5 minutes or missing timestamp.");
							setLatestEntry(null); // optional: clear stale data
						}
					} else {
						console.warn(`No data found at entry${count}`);
					}
				});
			});
		};

		fetchLatestEntry();
	}, []);
*/
	const saveToFirestore = async (data) => {
		const user = auth.currentUser;
		if (user) {

			const roundedGlucose = Number(data.glucose.toFixed(2));
			const roundedSpo2 = Number(data.spo2.toFixed(2));

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
				HDtimestamp: new Date(),
			});

			ToastAndroid.show(
				"Data Saved: The data has been saved successfully.",
				ToastAndroid.SHORT
			);
		}
	};

	const showAlert = () => {
		Alert.alert(
			"Instructions",
			"This will open the Wi-Fi settings which allows GlucoPulse to connect to internet. \n\nClick GlucoPulse_AP to change the Wi-Fi credentials of the GlucoPulse device.\n\nKeep in mind that you should revert back to your original Wi-Fi connection of your phone to garner data.",
			[
				{
					text: "OK",
					onPress: () =>
						IntentLauncher.startActivityAsync(
							IntentLauncher.ActivityAction.WIFI_SETTINGS
						),
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>

				<Image
					source={require("../assets/word-logo-whitevar.png")}
					style={styles.topImage}
				/>


				<Text style={styles.welcomeText}>Scan</Text>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={showAlert}>
					<Text
						style={{
							color: "black",
							fontWeight: "bold",
							fontSize: 16,
							textAlign: "center",
						}}
					>
						Connect to GlucoPulse Device
					</Text>
				</TouchableOpacity>
			</View>
			{/*}{*/}
			{latestEntry && (
				<View style={styles.dataContainer}>
					<View style={styles.dataBox}>
						<Text style={styles.dataLabel}>Glucose</Text>
						<Text style={styles.dataValue}>
							{(latestEntry.glucose).toFixed(2)} mg/dL
						</Text>
					</View>
					<View style={styles.dataBox}>
						<Text style={styles.dataLabel}>SPO2</Text>
						<Text style={styles.dataValue}>
							{(latestEntry.spo2).toFixed(2)}%
						</Text>
					</View>
				</View>
			)}
				{/*}
			{latestEntry ? (
				<View style={styles.dataContainer}>
					<View style={styles.dataBox}>
						<Text style={styles.dataLabel}>Glucose</Text>
						<Text style={styles.dataValue}>
							{latestEntry.glucose.toFixed(2)} mg/dL
						</Text>
					</View>
					<View style={styles.dataBox}>
						<Text style={styles.dataLabel}>SPO2</Text>
						<Text style={styles.dataValue}>
							{latestEntry.spo2.toFixed(2)}%
						</Text>
					</View>
				</View>
			) : (
				<View style={styles.dataBoxNoData}>
					<Text style={styles.dataValue}>No recent data found</Text>
				</View>
			)}

			
			{latestEntries.length > 0 ? (
				latestEntries.map((entry, index) => (
					<View key={index} style={styles.dataContainer}>
						<View style={styles.dataBox}>
							<Text style={styles.dataLabel}>Glucose</Text>
							<Text style={styles.dataValue}>
								{entry.glucose.toFixed(2)} mg/dL
							</Text>
						</View>
						<View style={styles.dataBox}>
							<Text style={styles.dataLabel}>SPO2</Text>
							<Text style={styles.dataValue}>
								{entry.spo2.toFixed(2)}%
							</Text>
						</View>
					</View>
				))
			) : (
				<View style={styles.dataBoxNoData}>
					<Text style={styles.dataValue}>No recent data found</Text>
				</View>
			)}
				{*/}

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => saveToFirestore(latestEntry)}
				>
					<Text
						style={{
							color: "black",
							fontWeight: "bold",
							fontSize: 16,
							textAlign: "center",
						}}
					>
						Save Entry to Profile
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ScanPage;
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
		marginTop: 75,
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
	dataContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: "80%",
	},
	dataBox: {
		backgroundColor: "#e0f7fa",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		width: "45%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		marginTop: 65,
		marginBottom: 65,
	},
	dataLabel: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#2144af",
	},
	dataValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
	},
	dataBoxNoData: {
		backgroundColor: "#f0f4f7",
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		width: "70%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		marginTop: 65,
		marginBottom: 65,
	}
});
