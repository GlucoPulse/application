import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	StatusBar,
	Image,
} from "react-native";
import React from "react";

const DocumentationPage = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#2244af"} barStyle={"light-content"} />

			<View style={styles.header}>
				<Image
					source={require("../assets/word-logo-whitevar.png")}
					style={styles.topImage}
				/>
				<Text style={styles.welcomeText}>Documentation</Text>
			</View>

			<ScrollView style={styles.body}>
				<Text style={styles.heading}>GlucoPulse</Text>

				<Text style={styles.subheading}>Introduction</Text>
				<Text style={styles.paragraph}>
					GlucoPulse is a device that measures the glucose level along with the oxygen saturation level of an individual. It uses near-infrared spectrometry, allowing for non-invasive measurement without the need for finger pricking. GlucoPulse is bundled with an Android application that allows users to see the equivalent glycemic load of food and visualize the data from the GlucoPulse device. The GlucoPulse device can be connected to Wi-Fi, enabling the relationship between the hardware and software.
				</Text>

				<Text style={styles.subheading}>Hardware</Text>
				<Text style={styles.subsubheading}>Components</Text>
				<Text style={styles.paragraph}>
					GlucoPulse uses modular components to make the device functional. It uses NodeMCU ESP32 as the main microcontroller of the system. For the sensor, it uses MAX30102, which can measure both glucose and oxygen saturation levels just by a touch of the fingertip. Furthermore, an OLED screen is also implemented, allowing users to see the results of the system. GlucoPulse uses two rechargeable 3.7V batteries.
				</Text>

				<Text style={styles.subsubheading}>How To Use the Device</Text>
				<Text style={styles.paragraph}>
					On the side of the case, the toggle switch can be found. This can turn the device on or off.
				</Text>
				<Text style={styles.paragraph}>
					Once the device has been turned on, it functions in offline mode by default, allowing users to use the device without Wi-Fi connectivity. A red light will turn on to signify that the input from a user's fingertip can now be placed on top of the cover of the sensor. A prompt will be displayed indicating that the glucose is being calculated. The result will be displayed on the OLED screen once the calculation is done.
				</Text>

				<Text style={styles.subsubheading}>Using the Device with Wi-Fi</Text>
				<Text style={styles.paragraph}>
					To connect the device to the network, the button must be pressed once, which turns on the Wi-Fi module on the microcontroller.
				</Text>
				<Text style={styles.paragraph}>
					On the GlucoPulse Android application, once logged in, the scan tab has a button entitled "Connect to GlucoPulse Device". Clicking this button will prompt the smartphone to open its Wi-Fi settings, allowing the GlucoPulse device to connect to the internet.
				</Text>
				<Text style={styles.paragraph}>
					Click the GlucoPulse_AP on the Wi-Fi settings to change the Wi-Fi credentials of the GlucoPulse device. Keep in mind that the Wi-Fi connection of the phone should be reverted back to garner the data for both the device and application.
				</Text>

				<Text style={styles.subsubheading}>Troubleshooting</Text>
				<Text style={styles.paragraph}>
					Should the user encounter a misfunctioning sensor, the user should opt to reset the device by pressing the reset button on the casing.
				</Text>

			</ScrollView>
		</SafeAreaView>
	);
};

export default DocumentationPage;

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
	scrollViewDocs: {
		marginLeft: 25,
		marginTop: 20,
		marginRight: 25,
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subheading: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
	},
	subsubheading: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 15,
		marginBottom: 10,
	},
	paragraph: {
		fontSize: 16,
		marginBottom: 10,
		lineHeight: 22,
	},
	body: {
		marginLeft: 25,
		marginRight: 25,
		marginTop: 15,
	}
});
