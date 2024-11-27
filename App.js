import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import AdminPage from "./screens/AdminPage";
import AddGLValPage from "./screens/AddGLValPage";
import EditGLValPage from "./screens/EditGLValPage";
import AddAdminPage from "./screens/AddAdminPage";
import DocumentationPage from "./screens/DocumentationPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddGL"
          component={AddGLValPage}
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EditGL"
          component={EditGLValPage}
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="AddAdmin"
          component={AddAdminPage}
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Documentation"
          component={DocumentationPage}
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
