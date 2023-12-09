import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import img1 from "../assets/salon_home.png";
import DropDownService from "../components/DropDownService";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { Entypo } from "@expo/vector-icons";
import DropDownDistrict from "../components/DropDownDistrict";
import { format } from "date-fns";
import { moment } from "moment";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    selectedDates: null,
    district: null,
    service: null,
  });
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const districtRoute = useRoute();
  const { selectedDates, district, service } = formData;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "SALON BOOKING",
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
  }, []);
  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };

  const searchSalons = () => {
    if (!dates?.startDate || !district || !service) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      const formDataJSON = JSON.stringify(formData);

      fetch(
        "https://firebasestorage.googleapis.com/v0/b/salon-booking-dc6f2.appspot.com/o/data.json?alt=media&token=e085fb63-dbdb-4548-b444-ea7f7d356218"
      )
        .then((response) => response.json())
        .then((data) => {
          const dayOfWeek = formData.selectedDates.dayOfWeek;

          const filteredData = data.filter((salon) => {
            return (
              salon.district === district && salon.service.includes(service)
            );
          });

          if (filteredData.length > 0) {
            const formattedData = filteredData.map((salon) => {
              const matchingWorkingHours = salon.workingHours
                ? salon.workingHours
                    .filter((hours) => hours.startsWith(dayOfWeek))
                    .join(", ")
                : "";

              return {
                ...salon,
                workingHours: matchingWorkingHours,
              };
            });

            console.log(formattedData);
            navigation.navigate("Salons", { salonsData: formattedData });
          } else {
            Alert.alert(
              "Sorry!",
              "No matching salons found",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ],
              { cancelable: false }
            );
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  return (
    <>
      <View>
        <Image source={img1} style={{ width: "100%", height: 250 }} />
        <ScrollView
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          <View>
            <DropDownDistrict
              icon={<Feather name="search" size={24} color="black" />}
              placeholder="Choose district"
              onSelect={(value) =>
                setFormData({ ...formData, district: value })
              }
            />
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                gap: selectedDates ? 25 : 80,
              }}
            >
              <Fontisto name="date" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(dateRange) => {
                  var startDate = new Date(
                    dateRange.startDate.replace(/\//g, "-")
                  );
                  var endDate = new Date(dateRange.endDate.replace(/\//g, "-"));
                  const dayOfWeekIndex = startDate.getDay();
                  const daysOfWeek = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ];

                  const dayOfWeek = daysOfWeek[dayOfWeekIndex];
                  setDates({
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                  });
                  setFormData({
                    ...formData,
                    selectedDates: {
                      startDate: dateRange.startDate,
                      endDate: dateRange.endDate,
                      dayOfWeek: dayOfWeek,
                    },
                  });
                }}
                allowFontScaling={false}
                placeholder={"Choose the timeline"}
                mode={"range"}
              />
            </Pressable>
            <DropDownService
              icon={<Entypo name="scissors" size={24} color="black" />}
              placeholder="Choose service"
              onSelect={(value) => setFormData({ ...formData, service: value })}
            />
            <Pressable
              onPress={searchSalons}
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
                gap: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
