import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../FireBase";

const SalonPage = ({ route }) => {
  console.log("Route Params:", route.params);
  const { salonName, workingHours, address } = route.params;
  const [selectedHour, setSelectedHour] = useState(null);
  const [approvedBookings, setApprovedBookings] = useState([]);

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

  const hoursArray = workingHours ? workingHours.split(" ") : [];
  const [startHour, endHour] =
    hoursArray.length > 1 ? hoursArray[1].split("-") : [0, 0];
  const start = parseInt(startHour, 10);
  const end = parseInt(endHour, 10);

  const allWorkingHours = Array.from(
    { length: end - start + 1 },
    (_, index) => {
      const hour = start + index;
      return `${hour < start ? "0" : ""}${hour}:00`;
    }
  );

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const currentUser = auth.currentUser;
  useEffect(() => {
    if (items.length > 0) return;

    setLoading(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "bookings");
      const docsSnap = await getDocs(colRef);
      const bookings = docsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(bookings);
      setLoading(false);
    };

    fetchProducts();
  }, [items]);
  const savedBookings = items.filter(
    (item) =>
      item.userId === currentUser?.uid &&
      item.salonName === route.params.salonName
  );
  console.log(savedBookings);

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

  const approveBooking = async () => {
    if (selectedHour) {
      if (currentUser) {
        const newBooking = {
          userId: currentUser.uid,
          salonName,
          salonAddress: address,
          hour: selectedHour,
          createdAt: serverTimestamp(),
        };

        try {
          const docRef = await addDoc(collection(db, "bookings"), newBooking);

          console.log("Booking added with ID: ", docRef.id);

          setItems((prevItems) => [...prevItems, newBooking]); // Update items state
          setApprovedBookings((prevBookings) => [...prevBookings, newBooking]);
          setSelectedHour(null);
        } catch (error) {
          console.error("Error adding booking: ", error.message);
        }
      } else {
        console.error("User not authenticated");
      }
    } else {
      Alert.alert("Select an Hour", "Please select an hour to approve.");
    }
  };

  return (
    <View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <View style={styles.hoursContainer}>
        {allWorkingHours.map((hour, index) => (
          <View key={index} style={styles.hourRectangle}>
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
          </View>
        ))}
      </View>
      <Pressable onPress={approveBooking} style={styles.approveButton}>
        <Text style={styles.approveButtonText}>Approve Booking</Text>
      </Pressable>
      <View style={{ height: "100%" }}>
        <FlatList
          data={savedBookings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.approvedBooking}>
              <Text>{item.salonName}</Text>
              <Text>{item.salonAddress}</Text>
              <Text>{item.hour}</Text>
            </View>
          )}
        />
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
    borderRadius: 10,
  },
  selectedHour: {
    backgroundColor: "#ADD8E6",
  },
  addressText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  approveButton: {
    backgroundColor: "#2a52be",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  approveButtonText: {
    color: "white",
    fontSize: 18,
  },

  approvedBooking: {
    backgroundColor: "#ADD8E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default SalonPage;
