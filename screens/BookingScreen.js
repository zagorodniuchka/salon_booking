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
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../FireBase";

const BookingScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
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

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    setLoading(true);

    const colRef = collection(db, "bookings");

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const bookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(bookings);
      setLoading(false);
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to only run the effect once

  const savedBookings = items.filter(
    (item) => item.userId === currentUser?.uid
  );

  return (
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
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  approvedBooking: {
    backgroundColor: "#ADD8E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
