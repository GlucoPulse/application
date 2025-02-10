import { StyleSheet} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsPage from "./SettingsPage";
import ChartsPage from "./ChartsPage";
import FrontPage from "./FrontPage";
import ScanPage from "./ScanPage";
import GlycemicLoadPage from "./GlycemicLoadPage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#32a1d3",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          elevation: 0,
          height: 60,
          backgroundColor: "#2144af",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}
    >
      <Tab.Screen
        name="HOME"
        component={FrontPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={28}
              style={styles.iconsTab}
              color={focused ? "#32a1d3" : "#ffffff"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GLYCEMIC LOAD"
        component={GlycemicLoadPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="food"
              size={28}
              style={styles.iconsTab}
              color={focused ? "#32a1d3" : "#ffffff"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SCAN"
        component={ScanPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="fingerprint"
              size={28}
              style={styles.iconCenter}
              color={focused ? "#2244af" : "#ffffff"}
            />
          ), //@RUEL PA HELP SA COLORS HUEHUEHUHEU
        }}
      />
      <Tab.Screen
        name="HISTORY"
        component={ChartsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bar-chart"
              size={28}
              style={styles.iconsTab}
              color={focused ? "#32a1d3" : "#ffffff"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SETTINGS"
        component={SettingsPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings"
              size={28}
              style={styles.iconsTab}
              color={focused ? "#32a1d3" : "#ffffff"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconsTab: {
    alignContent: "center",
    justifyContent: "center",
  },
  iconCenter: {
    top: -15,
    height: 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32a1d3",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
});

export default HomeScreen;
