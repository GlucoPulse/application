import { useState, useEffect } from "react";
import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { getFirestore, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const FrontPage = ({ }) => {
	const email = getAuth().currentUser?.email;
	const removeEmailString = email?.slice(0, email.indexOf("@"));

	const [averageGlycemicLoad, setAverageGlycemicLoad] = useState(null);
	const [averageGlucose, setAverageGlucose] = useState(null);
	const [averageSPO2, setAverageSPO2] = useState(null);
	const [message, setMessage] = useState("");
	const [glucoseMessage, setGlucoseMessage] = useState("");
	const [spo2Message, setSPO2Message] = useState("");
	const [recentHighOutliers, setHighGLOutliers] = useState([]);


	const [data, setData] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		const db = getFirestore();
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			console.log("No user is currently authenticated.");
			return;
		}

		// Listener for valGLUser
		const unsubscribeValGLUser = onSnapshot(
			query(collection(db, "valGLUser")),
			(snapshot) => {
				const valGLUserData = snapshot.docs
					.map((doc) => doc.data())
					.filter((item) => item.userid === user.uid)
					.sort((a, b) => b.timestamp - a.timestamp)
					.slice(0, 12);

				const totalGlycemicLoad = valGLUserData.reduce(
					(sum, item) => sum + item.glycemicLoad,
					0
				);
				const averageGlycemicLoad = totalGlycemicLoad / valGLUserData.length;
				setAverageGlycemicLoad(isNaN(averageGlycemicLoad) ? null : averageGlycemicLoad);

				if (averageGlycemicLoad > 20) {
					setMessage(
						"This is high glycemic load which can cause significant spikes in blood sugar levels, which is dangerous, especially for individuals with diabetes. Try to consume foods that have low glycemic load."
					);
				} else if (averageGlycemicLoad >= 11 && averageGlycemicLoad <= 19) {
					setMessage(
						"This is normal glycemic load that helps maintain stable blood sugar levels, which is crucial for managing diabetes. Aim to include them in your diet for better control."
					);
				} else if (averageGlycemicLoad < 11) {
					setMessage(
						"This is a low glycemic load level that help maintain stable blood sugar levels. Extremely low glycemic load can lead to insufficient energy and nutrient intake.  Balance your diet to avoid these negative effects"
					);
				} else {
					setMessage(
						"No data available. Please proceed to use the device to record your glycemic load levels."
					);
				}
				const highGLOutliers = valGLUserData.filter(item => item.glycemicLoad > 20);
				setHighGLOutliers(highGLOutliers);

				const now = Date.now();
				const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
				const recentHighOutliers = highGLOutliers.filter(item => item.timestamp >= oneWeekAgo);

				if (recentHighOutliers.length >= 3) {
					setMessage(
						"You've had 3 or more high glycemic load meals in the past week. This can increase your risk of blood sugar spikes — consider choosing lower-GL foods."
					);
				}
			}
		);

		const unsubscribeUserHealthData = onSnapshot(
			query(collection(db, "UserHealthData")),
			(snapshot) => {
				const userHealthData = snapshot.docs
					.map((doc) => doc.data())
					.filter((item) => item.userUserID === user.uid)
					.sort((a, b) => b.HDtimestamp - a.HDtimestamp)
					.slice(0, 12);

				const totalGlucose = userHealthData.reduce(
					(sum, item) => sum + item.userGLUCOSE,
					0
				);
				const averageGlucose = totalGlucose / userHealthData.length;
				setAverageGlucose(isNaN(averageGlucose) ? null : averageGlucose);

				if (averageGlucose > 140) {
					setGlucoseMessage(
						"High glucose level detected. This can lead to serious health issues like heart disease, nerve damage, and kidney problems. Please consult your doctor immediately"
					);
				} else if (averageGlucose >= 70 && averageGlucose <= 140) {
					setGlucoseMessage(
						"Normal glucose level detected. This indicates good blood sugar control. Keep up the good work and maintain a healthy lifestyle."
					);
				} else if (averageGlucose < 70) {
					setGlucoseMessage(
						"Low glucose level detected. This can cause symptoms like dizziness, confusion, and fainting. Please consult your doctor immediately."
					);
				} else {
					setGlucoseMessage(
						"No data available. Please proceed to use the device to record your glucose levels."
					);
				}

				const totalSPO2 = userHealthData.reduce(
					(sum, item) => sum + item.userSPO2,
					0
				);
				const averageSPO2 = totalSPO2 / userHealthData.length;
				setAverageSPO2(isNaN(averageSPO2) ? null : averageSPO2);

				if (averageSPO2 < 95) {
					setSPO2Message(
						"Low oxygen saturation level detected. This can lead to symptoms like shortness of breath, confusion, and chest pain. Please consult your doctor immediately."
					);
				} else if (averageSPO2 >= 95) {
					setSPO2Message(
						"Normal oxygen saturation level detected. This indicates healthy oxygen levels in your blood, supporting overall well-being. Keep up the good work and maintain a healthy lifestyle."
					);
				} else {
					setSPO2Message(
						"No data available. Please proceed to use the device to record your oxygen saturation levels."
					);
				}

			}
		);

		const getGL = async () => {
			const querySnapshot = await getDocs(collection(db, "glycemicLoad"));
			const items = querySnapshot.docs.map((doc) => doc.data());
			const shuffledItems = items.sort(() => 0.5 - Math.random());
			const selectedItems = shuffledItems.slice(0, 3);
			setData(selectedItems);
		};
		getGL();

		return () => {
			unsubscribeValGLUser();
			unsubscribeUserHealthData();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>
				<Image
					source={require("../assets/word-logo-whitevar.png")}
					style={styles.topImage}
				/>
				<Text style={styles.welcomeText}>Welcome {removeEmailString}</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Documentation")}>
					<Text
						style={{
							fontSize: 14,
							fontWeight: "bold",
							textAlign: "center",
							color: "white",
							marginBottom: 10,
						}}
					>
						Need Help? Read the Documentation
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.body}>
				<Text style={styles.label}>Latest Statistics</Text>
				<Text style={styles.title}>Glycemic Load Level Average</Text>
				{averageGlycemicLoad !== null ? (
					<>
						<Text style={styles.average}>{averageGlycemicLoad.toFixed(1)}</Text>

						{averageGlycemicLoad > 20 ? (
							<Text style={styles.message}>
								This is <Text style={{ fontWeight: 'bold' }}>high glycemic load</Text> which can cause significant spikes in blood sugar levels, which is dangerous, especially for individuals with diabetes. Try to consume foods that have low glycemic load.
							</Text>
						) : averageGlycemicLoad >= 11 && averageGlycemicLoad <= 19 ? (
							<Text style={styles.message}>
								This is <Text style={{ fontWeight: 'bold' }}>normal glycemic load</Text> that helps maintain stable blood sugar levels, which is crucial for managing diabetes. Aim to include them in your diet for better control.
							</Text>
						) : (
							<Text style={styles.message}>
								This is a <Text style={{ fontWeight: 'bold' }}>low glycemic load</Text> level that helps maintain stable blood sugar levels. Extremely low glycemic load can lead to insufficient energy and nutrient intake. Balance your diet to avoid these negative effects.
							</Text>
						)}

						{recentHighOutliers.length >= 3 && (
							<Text style={[styles.message, { color: 'red' }]}>
								You've had 3 or more high glycemic load meals in the past week. This can increase your risk of blood sugar spikes — consider choosing lower-GL foods.
							</Text>
						)}
					</>
				) : (
					<Text style={styles.message}>
						No data available. Please proceed to use the device to record your glycemic load levels.
					</Text>
				)}
				<Text style={styles.title}>Glucose Level Average</Text>
				{averageGlucose !== null ? (
					<>
						<Text style={styles.average}>
							{averageGlucose.toFixed(1)} mg/dL
						</Text>

						{averageGlucose > 140 ? (
							<Text style={styles.message}>
								<Text style={{ fontWeight: 'bold' }}>High glucose level</Text> detected. This can lead to serious health issues like heart disease, nerve damage, and kidney problems. Please consult your doctor immediately.
							</Text>
						) : averageGlucose >= 70 && averageGlucose <= 140 ? (
							<Text style={styles.message}>
								<Text style={{ fontWeight: 'bold' }}>Normal glucose level</Text> detected. This indicates good blood sugar control. Keep up the good work and maintain a healthy lifestyle.
							</Text>
						) : (
							<Text style={styles.message}>
								<Text style={{ fontWeight: 'bold' }}>Low glucose level</Text> detected. This can cause symptoms like dizziness, confusion, and fainting. Please consult your doctor immediately.
							</Text>
						)}
					</>
				) : (
					<Text style={styles.message}>
						No data available. Please proceed to use the device to record your glucose levels.
					</Text>
				)}
				<Text style={styles.title}>Oxygen Saturation Level Average</Text>
				{averageSPO2 !== null ? (
					<>
						<Text style={styles.average}>{averageSPO2.toFixed(1)}%</Text>

						{averageSPO2 < 95 ? (
							<Text style={styles.message}>
								<Text style={{ fontWeight: 'bold' }}>Low oxygen saturation level</Text> detected. This can lead to symptoms like shortness of breath, confusion, and chest pain. Please consult your doctor immediately.
							</Text>
						) : (
							<Text style={styles.message}>
								<Text style={{ fontWeight: 'bold' }}>Normal oxygen saturation level</Text> detected. This indicates healthy oxygen levels in your blood, supporting overall well-being. Keep up the good work and maintain a healthy lifestyle.
							</Text>
						)}
					</>
				) : (
					<Text style={styles.message}>
						No data available. Please proceed to use the device to record your oxygen saturation levels.
					</Text>
				)}

				<Text style={styles.label2}>Random Food Suggestions</Text>

				<ScrollView contentContainerStyle={styles.container1}>
					{data.map((item, index) => (
						<View key={index} style={styles.box}>
							<Image source={{ uri: item.image_url }} style={styles.image} />
							<Text style={styles.foodName}>{item.food}</Text>

						</View>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default FrontPage;

const styles = StyleSheet.create({
	container1: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		padding: 30,
	},
	box: {
		width: "30%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		marginTop: -20,
		justifyContent: "center",
		backgroundColor: "#2244af",
	},
	foodName: {
		fontSize: 13,
		fontWeight: "bold",
		marginBottom: 5,
		alignItems: "center",
		color: "white",
	},
	image: {
		width: 75,
		height: 75,
		borderRadius: 10,
	},
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
		marginBottom: 5,
	},
	body: {
		width: "100%",
		height: "100%",
		flexDirection: "column",
	},
	label: {
		marginTop: 20,
		marginLeft: 25,
		fontSize: 20,
		fontWeight: "bold",
	},
	average: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
		textAlign: "center",
	},
	message: {
		textAlign: "center",
		marginLeft: 25,
		marginRight: 25,
		fontSize: 14,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 5,
	},
	label2: {
		marginTop: 15,
		marginLeft: 25,
		fontSize: 20,
		fontWeight: "bold",
	},
	outlierContainer: {
		marginTop: 10,
		backgroundColor: '#fff3cd',
		padding: 10,
		borderRadius: 10,
	},
	outlierTitle: {
		fontWeight: 'bold',
		color: '#856404',
		marginBottom: 5,
	},
	outlierText: {
		color: '#856404',
		fontSize: 14,
	},
});
