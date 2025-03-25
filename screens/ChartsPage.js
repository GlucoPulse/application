import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import {
	View,
	Text,
	SafeAreaView,
	Image,
	StyleSheet,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import Picker from "react-native-picker-select";
import Entypo from "@expo/vector-icons/Entypo";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import XLSX from "xlsx";
import { LineChart } from "react-native-gifted-charts";

const ChartsPage = () => {
	const [valGLUserLineData, setValGLUserLineData] = useState([]);
	const [userGLUCOSELineData, setUserGLUCOSELineData] = useState([]);
	const [userSPO2LineData, setUserSPO2LineData] = useState([]);
	const [timeRange, setTimeRange] = useState("hour");

	useEffect(() => {
		const fetchData = async () => {
			const db = getFirestore();
			const auth = getAuth();
			const user = auth.currentUser;
			
			if (user) {
				// Fetch data from valGLUser collection
				const valGLUserQuery = collection(db, "valGLUser");
				const valGLUserSnapshot = await getDocs(valGLUserQuery);

				const valGLUserData = valGLUserSnapshot.docs
					.map((doc) => {
						const { glycemicLoad, timestamp, userid } = doc.data();
						const date = new Date(
							timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
						);
						return {
							glycemicLoad,
							timestamp: date,
							userid,
						};
					})
					.filter((item) => item.userid === user.uid); // Filter by user ID

				// Fetch data from UserHealthData collection for userGLUCOSE
				const userHealthDataQuery = collection(db, "UserHealthData");
				const userHealthDataSnapshot = await getDocs(userHealthDataQuery);

				const userGLUCOSEData = userHealthDataSnapshot.docs
					.map((doc) => {
						const { userGLUCOSE, HDtimestamp, userUserID } = doc.data();
						const date = new Date(
							HDtimestamp.seconds * 1000 + HDtimestamp.nanoseconds / 1000000
						);
						return {
							userGLUCOSE,
							timestamp: date,
							userUserID,
						};
					})
					.filter((item) => item.userUserID === user.uid); // Filter by user ID

				// Fetch data from UserHealthData collection for userSPO2
				const userSPO2Data = userHealthDataSnapshot.docs
					.map((doc) => {
						const { userSPO2, HDtimestamp, userUserID } = doc.data();
						const date = new Date(
							HDtimestamp.seconds * 1000 + HDtimestamp.nanoseconds / 1000000
						);
						return {
							userSPO2,
							timestamp: date,
							userUserID,
						};
					})
					.filter((item) => item.userUserID === user.uid); // Filter by user ID

				const now = new Date();
				let filteredValGLUserData;
				let filteredUserGLUCOSEData;
				let filteredUserSPO2Data;

				switch (timeRange) {
					case "hour":
						filteredValGLUserData = valGLUserData.filter(
							(item) => now - item.timestamp < 3600000
						); // <1 hour
						filteredUserGLUCOSEData = userGLUCOSEData.filter(
							(item) => now - item.timestamp < 3600000
						); // <1 hour
						filteredUserSPO2Data = userSPO2Data.filter(
							(item) => now - item.timestamp < 3600000
						); // <1 hour
						break;
					case "day":
						filteredValGLUserData = valGLUserData.filter(
							(item) => now - item.timestamp < 86400000
						); // <24 hours
						filteredUserGLUCOSEData = userGLUCOSEData.filter(
							(item) => now - item.timestamp < 86400000
						); // <24 hours
						filteredUserSPO2Data = userSPO2Data.filter(
							(item) => now - item.timestamp < 86400000
						); // <24 hours
						break;
					case "week":
						filteredValGLUserData = valGLUserData.filter(
							(item) => now - item.timestamp < 604800000
						); // <168 hours
						filteredUserGLUCOSEData = userGLUCOSEData.filter(
							(item) => now - item.timestamp < 604800000
						); // <168 hours
						filteredUserSPO2Data = userSPO2Data.filter(
							(item) => now - item.timestamp < 604800000
						); // <168 hours
						break;
					case "month":
						filteredValGLUserData = valGLUserData.filter(
							(item) => now - item.timestamp < 2592000000
						); // <30 days
						filteredUserGLUCOSEData = userGLUCOSEData.filter(
							(item) => now - item.timestamp < 2592000000
						); // <30 days
						filteredUserSPO2Data = userSPO2Data.filter(
							(item) => now - item.timestamp < 2592000000
						); // <30 days
						break;
					case "all":
						filteredValGLUserData = valGLUserData;
						filteredUserGLUCOSEData = userGLUCOSEData;
						filteredUserSPO2Data = userSPO2Data;
						break;
					default:
						filteredValGLUserData = valGLUserData;
						filteredUserGLUCOSEData = userGLUCOSEData;
						filteredUserSPO2Data = userSPO2Data;
				}

				// Sort the filtered data by timestamp
				filteredValGLUserData.sort((a, b) => a.timestamp - b.timestamp);
				filteredUserGLUCOSEData.sort((a, b) => a.timestamp - b.timestamp);
				filteredUserSPO2Data.sort((a, b) => a.timestamp - b.timestamp);

				const formatData = (data, timeRange) => {
					return data.map((item) => {
						let label;
						if (timeRange === "week") {
							label = item.timestamp.toLocaleDateString([], {
								month: "2-digit",
								day: "2-digit",
							});
						}
						if (timeRange === "month") {
							label = item.timestamp.toLocaleDateString([], {
								month: "2-digit",
								day: "2-digit",
							});
						}
						if (timeRange === "all") {
							label = item.timestamp.toLocaleDateString([], {
								month: "2-digit",
								day: "2-digit",
								year: "2-digit"
							});
						}
						if (timeRange === "day") {
							label = item.timestamp.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							});
						}
						if (timeRange === "hour") {
							label = item.timestamp.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							});
						}
						else {
							// label = item.timestamp.toLocaleDateString([], {
							//   hour: "2-digit",
							//   minute: "2-digit",
							// });
						}

						return {
							value: item.value,
							dataPointText: item.value.toString(),
							label: label,
						};
					});
				};

				const formattedValGLUserData = formatData(
					filteredValGLUserData.map((item) => ({
						value: item.glycemicLoad,
						timestamp: item.timestamp,
					})),
					timeRange
				);

				const formattedUserGLUCOSEData = formatData(
					filteredUserGLUCOSEData.map((item) => ({
						value: item.userGLUCOSE,
						timestamp: item.timestamp,
					})),
					timeRange
				);

				const formattedUserSPO2Data = formatData(
					filteredUserSPO2Data.map((item) => ({
						value: item.userSPO2,
						timestamp: item.timestamp,
					})),
					timeRange
				);

				setValGLUserLineData(formattedValGLUserData);
				setUserGLUCOSELineData(formattedUserGLUCOSEData);
				setUserSPO2LineData(formattedUserSPO2Data);
			} else {
				console.log("No user is currently authenticated.");
			}
		};

		fetchData();
	}, [timeRange]);

	const saveToExcel = async () => {
		const db = getFirestore();
		const auth = getAuth();
		const user = auth.currentUser;

		if (user) {
			// Fetch data from valGLUser collection
			const valGLUserQuery = collection(db, "valGLUser");
			const valGLUserSnapshot = await getDocs(valGLUserQuery);
			const valGLUserData = valGLUserSnapshot.docs
				.map((doc) => {
					const { glycemicLoad, timestamp, userid } = doc.data();
					const date = new Date(
						timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
					);
					return {
						glycemicLoad,
						timestamp: date,
						userid,
					};
				})
				.filter((item) => item.userid === user.uid); // Filter by user ID

			// Sort valGLUser data by timestamp
			valGLUserData.sort((a, b) => a.timestamp - b.timestamp);

			// Prepare valGLUser data for the worksheet
			const valGLUserSheetData = valGLUserData.map((item) => ({
				timestamp: item.timestamp.toLocaleString(),
				glycemicLoad: item.glycemicLoad,
			}));

			// Fetch data from UserHealthData collection
			const userHealthDataQuery = collection(db, "UserHealthData");
			const userHealthDataSnapshot = await getDocs(userHealthDataQuery);
			const userHealthData = userHealthDataSnapshot.docs
				.map((doc) => {
					const { HDtimestamp, userGLUCOSE, userSPO2, userUserID } = doc.data();
					const date = new Date(
						HDtimestamp.seconds * 1000 + HDtimestamp.nanoseconds / 1000000
					);
					return {
						HDtimestamp: date,
						userGLUCOSE,
						userSPO2,
						userUserID,
					};
				})
				.filter((item) => item.userUserID === user.uid); // Filter by user ID

			// Sort UserHealthData by HDtimestamp
			userHealthData.sort((a, b) => a.HDtimestamp - b.HDtimestamp);

			// Prepare UserHealthData for the worksheet
			const userHealthDataSheetData = userHealthData.map((item) => ({
				timestamp: item.HDtimestamp.toLocaleString(),
				userGLUCOSE: item.userGLUCOSE,
				userSPO2: item.userSPO2,
			}));

			// Log the data to ensure it's being fetched correctly
			console.log("valGLUserData:", valGLUserData);
			console.log("userHealthData:", userHealthData);

			// Create a new workbook and append both sheets
			const workbook = XLSX.utils.book_new();
			const valGLUserSheet = XLSX.utils.json_to_sheet(valGLUserSheetData);
			const userHealthDataSheet = XLSX.utils.json_to_sheet(
				userHealthDataSheetData
			);

			XLSX.utils.book_append_sheet(workbook, valGLUserSheet, "Glycemic Load");
			XLSX.utils.book_append_sheet(
				workbook,
				userHealthDataSheet,
				"User Health Data"
			);

			// Write the workbook to a file
			const wbout = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
			const path = FileSystem.documentDirectory + "GlucoPulse_User_Data.xlsx";
			await FileSystem.writeAsStringAsync(path, wbout, {
				encoding: FileSystem.EncodingType.Base64,
			});

			console.log("Excel file saved at:", path);

			// Share the Excel file and let the user choose where to save
			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(path);
			} else {
				console.log("Sharing is not available on this device");
			}

			// Open document picker and save to the chosen directory
			const result = await DocumentPicker.getDocumentAsync({
				copyToCacheDirectory: true,
			});
			if (result.type === "success") {
				const newPath = result.uri;
				await FileSystem.moveAsync({ from: path, to: newPath });
				console.log("Excel file moved to:", newPath);
			}
		} else {
			console.log("No user is currently authenticated.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>
				<Image
					source={require("../assets/word-logo-whitevar.png")}
					style={styles.topImage}
				/>
				<Text style={styles.welcomeText}>History</Text>
			</View>

			<View style={styles.body}>
				<Picker
					onValueChange={(value) => setTimeRange(value)}
					items={[
						{ label: "Last Hour", value: "hour" },
						{ label: "Last Day", value: "day" },
						{ label: "Last Week", value: "week" },
						{ label: "Last Month", value: "month" },
						{ label: "All Time", value: "all" }
					]}
					useNativeAndroidPickerStyle={false}
					style={{
						inputAndroid: styles.inputAndroid,
						placeholder: styles.placeholder,
					}}
					Icon={() => {
						return (
							<Entypo
								name="triangle-down"
								size={24}
								color="gray"
								marginTop={26}
								styl={styles.iconDD}
								marginRight={15}
							/>
						);
					}}
					placeholder={{ label: "Sort data", value: null }}
					activeItemStyle={{
						backgroundColor: "#afd3e5",
					}}
				/>
			</View>

			<View style={styles.body2}>
				<ScrollView>
					<View
						style={{
							justifyContent: "center",
							alignContent: "center",
							alignSelf: "center",
						}}
					>
						<TouchableOpacity style={styles.button} onPress={saveToExcel}>
							<Text style={styles.buttonText}>Export to Spreadsheet</Text>
						</TouchableOpacity>
					</View>
					<Text style={[styles.label]}> Glycemic Load History Chart</Text>

			
					{valGLUserLineData.length === 0 ? (
						<Text style={styles.noDataText}>No data available</Text>
					) : (
						<LineChart
							areaChart
							data={valGLUserLineData}
							curved
							startFillColor="rgb(46, 217, 255)"
							startOpacity={0.8}
							endFillColor="rgb(203, 241, 250)"
							endOpacity={0.3}
							initialSpacing={30}
							endSpacing={20}
							spacing={65}
							textColor1="black"
							textFontSize={0}
							showStripOnFocus
							focusedDataPointColor={"#32a1d3"}
							dataPointsColor="#d71c22"
							focusEnabled
							showVerticalLines
							verticalLinesColor="#ccc"
							color="#2244af"
							adjustToWidth
							scrollable={false}
							showScrollIndicator={false}
							yAxisOffset={-5}
							hideYAxisText
							focusedCustomDataPoint={(dataPoint) => (
								<>
									<View
										style={{
											position: 'absolute',
											bottom: 20,
											left: '50%',
											transform: [{ translateX: -30 }],
											paddingHorizontal: 10,
											paddingVertical: 5,
											backgroundColor: 'white',
											borderRadius: 15,
											elevation: 5,
										}}
									>
										<Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
											{dataPoint.value - 5}
											{"\n"}
											{dataPoint.label}
										</Text>
									</View>
									<View
										style={{
											width: 10,
											height: 10,
											borderRadius: 5,
											backgroundColor: '#d71c22',
											borderWidth: 2,
											borderColor: 'white',
										}}
									/>
								</>
							)}
						/>
					)}


					<Text style={styles.labelB}>Glucose Level History Chart</Text>
					{userGLUCOSELineData.length === 0 ? (
						<Text style={styles.noDataText}>No data available</Text>
					) : (
						<LineChart
							areaChart
							data={userGLUCOSELineData}
							curved
							startFillColor="rgb(46, 217, 255)"
							startOpacity={0.8}
							endFillColor="rgb(203, 241, 250)"
							endOpacity={0.3}
							initialSpacing={30}
							endSpacing={20}
							spacing={65} // Decrease spacing between points to fit all data
							textColor1="black"
							textFontSize={0}
							showStripOnFocus
							focusedDataPointColor={"#32a1d3"}
							dataPointsColor="#d71c22"
							focusEnabled
							showVerticalLines
							verticalLinesColor="#ccc"
							color="#2244af"
							adjustToWidth // Forces chart to fit all data points
							scrollable={false} // Disable scrolling
							showScrollIndicator={false} // Remove the scrollbar
							yAxisOffset={-10}
							hideYAxisText
							focusedCustomDataPoint={(dataPoint) => (
								<>
									{/* Pointer Label */}
									<View
										style={{
											position: 'absolute',
											bottom: 20, // Move it right above the point
											left: '50%', // Center horizontally
											transform: [{ translateX: -30 }], // Adjust to center the label
											paddingHorizontal: 10,
											paddingVertical: 5,
											backgroundColor: 'white',
											borderRadius: 15,
											elevation: 5,
										}}
									>
										<Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
											{dataPoint.value -10}
											{"\n"}
											{dataPoint.label}
										</Text>
									</View>
									<View
										style={{
											width: 10,
											height: 10,
											borderRadius: 5,
											backgroundColor: '#d71c22',
											borderWidth: 2,
											borderColor: 'white',
										}}
									/>
								</>
							)}
						/>
					)}


					<Text style={styles.labelB}>
						Oxygen Saturation Level History Chart
					</Text>
					{userSPO2LineData.length === 0 ? (
						<Text style={styles.noDataText}>No data available</Text>
					) : (
						<LineChart
							areaChart
							data={userSPO2LineData}
							curved
							startFillColor="rgb(46, 217, 255)"
							startOpacity={0.8}
							endFillColor="rgb(203, 241, 250)"
							endOpacity={0.3}
							initialSpacing={30}
							endSpacing={20}
							spacing={65} // Decrease spacing between points to fit all data
							textColor1="black"
							textFontSize={0}
							showStripOnFocus
							focusedDataPointColor={"#32a1d3"}
							dataPointsColor="#d71c22"
							focusEnabled
							showVerticalLines
							verticalLinesColor="#ccc"
							color="#2244af"
							adjustToWidth // Forces chart to fit all data points
							scrollable={false} // Disable scrolling
							showScrollIndicator={false} // Remove the scrollbar
							yAxisOffset={- 10}
							hideYAxisText
							focusedCustomDataPoint={(dataPoint) => (
								<>
									{/* Pointer Label */}
									<View
										style={{
											position: 'absolute',
											bottom: 20, // Move it right above the point
											left: '50%', // Center horizontally
											transform: [{ translateX: -30 }], // Adjust to center the label
											paddingHorizontal: 10,
											paddingVertical: 5,
											backgroundColor: 'white',
											borderRadius: 15,
											elevation: 5,
										}}
									>
										<Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>
											{dataPoint.value -10 }
											{"\n"}
											{dataPoint.label}
										</Text>
									</View>
									<View
										style={{
											width: 10,
											height: 10,
											borderRadius: 5,
											backgroundColor: '#d71c22',
											borderWidth: 2,
											borderColor: 'white',
										}}
									/>
								</>
							)}
						/>
					)}

				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

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
	body: {
		width: "80%",
		marginTop: 15,
		justifyContent: "center",
	},
	body2: {
		width: "90%",
		marginTop: 20,
		height: "62%",
	},
	inputAndroid: {
		marginTop: 10,
		fontSize: 16,
		padding: 15,
		borderRadius: 10,
		color: "black",
		paddingRight: 30, // to ensure the text is never behind the icon
		backgroundColor: "#afd3e5",
	},
	placeholder: {
		color: "gray",
	},
	iconDD: {
		marginRight: 10,
	},
	label: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 10,
	},
	focusedDataPoint: {
		backgroundColor: "white",
		padding: 5,
		borderRadius: 5,
		borderColor: "#d71c22",
		borderWidth: 1,
	},
	focusedDataPointText: {
		color: "black",
	},
	buttonContainer: {
		width: "60%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	button: {
		backgroundColor: "#afd3e5",
		width: 329,
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
	labelB: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: 10,
		marginTop: 20,
	},
	noDataText: {
		textAlign: 'center',
		marginTop: 5,
		fontSize: 16,
		color: 'gray'
	}
});

export default ChartsPage;
