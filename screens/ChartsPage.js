import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Picker from "react-native-picker-select";
import Entypo from "@expo/vector-icons/Entypo";

const ChartsPage = () => {
  const [lineData, setLineData] = useState([]);
  const [timeRange, setTimeRange] = useState("hour");

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const q = collection(db, "valGLUser");
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs
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

        const now = new Date();
        let filteredData;

        switch (timeRange) {
          case "hour":
            filteredData = data.filter(
              (item) => now - item.timestamp < 3600000
            ); // <1 hour
            break;
          case "day":
            filteredData = data.filter(
              (item) => now - item.timestamp < 86400000
            ); // <24 hours
            break;
          case "week":
            filteredData = data.filter(
              (item) => now - item.timestamp < 604800000
            ); // <168 hours
            break;
          case "month":
            filteredData = data.filter(
              (item) => now - item.timestamp < 2592000000
            ); // <30 days
            break;
          default:
            filteredData = data;
        }

        // Sort the filtered data by timestamp
        filteredData.sort((a, b) => a.timestamp - b.timestamp);

        const formattedData = filteredData.map((item) => {
          let label;
          if (timeRange === "week" || timeRange === "month") {
            label = item.timestamp.toLocaleDateString([], {
              month: "2-digit",
              day: "2-digit",
            });
          } else {
            label = item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          return {
            value: item.glycemicLoad,
            dataPointText: item.glycemicLoad.toString(),
            label: label,
          };
        });

        setLineData(formattedData);
      } else {
        console.log("No user is currently authenticated.");
      }
    };

    fetchData();
  }, [timeRange]);

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

      <View style={styles.body}>
        <Picker
          onValueChange={(value) => setTimeRange(value)}
          items={[
            { label: "Last Hour", value: "hour" },
            { label: "Last Day", value: "day" },
            { label: "Last Week", value: "week" },
            { label: "Last Month", value: "month" },
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
                marginTop={17}
                styl={styles.iconDD}
                marginRight={10}
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
          <Text style={styles.label}> Glycemic Load History Chart</Text>
          <LineChart
            data={lineData}
            initialSpacing={30}
            spacing={65}
            textColor1="black"
            textShiftY={-8}
            textShiftX={-10}
            textFontSize={13}
            width={300}
            //hideYAxisText
            showTextOnFocus
            showStripOnFocus
            focusedDataPointColor={"#32a1d3"}
            dataPointsColor="#d71c22"
            focusEnabled
            showVerticalLines
            verticalLinesColor="#ccc"
            color="#2244af"
            focusedCustomDataPoint={(dataPoint) => (
              <View style={styles.focusedDataPoint}>
                <Text style={styles.focusedDataPointText}>
                  {dataPoint.value} - {dataPoint.label}
                </Text>
              </View>
            )}
          />

          <Text style={styles.label}>Glucose Level History Chart</Text>

          <Text style={styles.label}>
            Oxygen Saturation Level History Chart
          </Text>
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
});

export default ChartsPage;
