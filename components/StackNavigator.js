import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SavedScreen from "../screens/SavedScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SalonsScreen from "../screens/SalonsScreen";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import SalonPage from "../screens/SalonPage";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    //creating the tab navigator
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: "Bookings",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color="#003580"
                />
              ) : (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Salons"
          component={SalonsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SalonPage"
          component={SalonPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
