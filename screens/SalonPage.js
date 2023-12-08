import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const SalonPage = ({ route }) => {
  const { salonName, workingHours, address } = route.params;
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

  console.log(workingHours);

  const [selectedHour, setSelectedHour] = useState(null);

  const parseWorkingHours = (workingHours) => {
    if (typeof workingHours !== "string" || !workingHours.trim()) {
      return [];
    }
    const daysAndHours = workingHours.split(/,\s*/); // Split by comma and optional space

    const formattedHours = daysAndHours.flatMap((dayAndHour) => {
      const [day, hours] = dayAndHour.split(": ");
      const [start, end] = hours.split("-");

      return Array.from(
        { length: end - start + 1 },
        (_, index) => `${day} ${parseInt(start, 10) + index}-${end}`
      );
    });

    return formattedHours;
  };

  const parsedWorkingHours = workingHours
    ? parseWorkingHours(workingHours)
    : [];
  const formattedWorkingHours = parseWorkingHours(workingHours);

  // const allWorkingHours = Array.from(
  //   { length: end - start + 1 },
  //   (_, index) => {
  //     const hour = start + index;
  //     return `${hour < start ? "0" : ""}${hour}:00`;
  //   }
  // );

  const showScheduleAlert = (hour) => {
    if (selectedHour === hour) {
      // If the selected hour is pressed again, show cancellation confirmation
      Alert.alert(
        "Confirm Cancellation",
        "Are you sure you want to cancel the scheduled service?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              // Handle cancellation logic here
              console.log(`Service at ${hour} cancelled`);
              setSelectedHour(null);
            },
          },
        ]
      );
    } else {
      // If a new hour is pressed, show scheduling confirmation
      Alert.alert(
        "Schedule Service",
        `Are you sure you want to schedule the service on ${hour}?\nPrice: 300-400 mdl`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              // Handle scheduling logic here
              console.log(`Service scheduled at ${hour}`);
              setSelectedHour(hour);
            },
          },
        ]
      );
    }
  };

  console.log(formattedWorkingHours);

  return (
    <View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <View style={styles.hoursContainer}>
        {formattedWorkingHours.map((hour, index) => (
          <Pressable
            key={index}
            style={[
              styles.hourRectangle,
              selectedHour === hour && styles.selectedHour,
            ]}
            onPress={() => showScheduleAlert(hour)}
          >
            <Text style={styles.hourText}>{hour}</Text>
          </Pressable>
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
    borderRadius: 10,
  },
  selectedHour: {
    backgroundColor: "#ADD8E6",
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
