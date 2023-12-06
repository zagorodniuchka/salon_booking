// SalonsScreen.js

import React, { useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const SalonsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const formData = route.params.formData;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "SALONS",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
      },
    });
  }, [navigation]);

  // Dummy salon data (replace with actual data)
  const salonsData = [
    { name: "Salon A", address: "123 Main St", hours: "9:00 AM - 6:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },
    { name: "Salon B", address: "456 Elm St", hours: "10:00 AM - 7:00 PM" },

    // Add more salon data as needed
  ];

  return (
    <>
      <ScrollView
        style={{
          margin: 20,
          borderColor: "#1e3a86",
          borderWidth: 3,
          borderRadius: 6,
        }}
      >
        {salonsData.map((salon, index) => (
          <Pressable
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              borderColor: "#1e3a86",
              borderWidth: 2,
              paddingVertical: 15,
              gap: 15,
            }}
            onPress={() => {
              // Handle the press event for a specific salon
              // You can navigate to a detailed view or perform any other action
              console.log("Pressed on salon:", salon);
            }}
          >
            <Entypo name="scissors" size={24} color="black" />
            <View>
              <Text>{salon.name}</Text>
              <Text>{salon.address}</Text>
              <Text>{salon.hours}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default SalonsScreen;
