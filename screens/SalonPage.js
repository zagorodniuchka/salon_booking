import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SalonPage = ({ route }) => {
  console.log("Route Params:", route.params);
  const { salonName, workingHours, address } = route.params;
  console.log("Salon Name:", salonName);
  console.log("Working Hours:", workingHours);
  console.log("Address:", address);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: salonName,
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

  const [startHour, endHour] = workingHours;
  const start = parseInt(startHour, 10);
  const end = parseInt(endHour, 10);

  const allWorkingHours = Array.from(
    { length: end - start + 1 },
    (_, index) => {
      const hour = start + index;
      return `${hour < start ? "0" : ""}${hour}:00`;
    }
  );
  return (
    <View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={styles.hoursContainer}>
        {allWorkingHours.map((hour, index) => (
          <View key={index} style={styles.hourRectangle}>
            <Text style={styles.hourText}>{hour}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: 20,
  },
  hourRectangle: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#003580",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  hourText: {
    fontSize: 16,
  },

  addressContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  addressText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default SalonPage;
