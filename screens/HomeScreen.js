import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import img1 from "../assets/salon_home.png";
import DropDownService from "../components/DropDownService";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import { Entypo } from "@expo/vector-icons";
import DropDownDistrict from "../components/DropDownDistrict";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState();
  const [service, setService] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  console.log(selectedDates);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "SALON BOOKING",
      Image,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
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
              onSelect={(value) => setService(value)}
            />
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                gap: 15,
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
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Apr 27, 2018 - Jul 18, 2018"}
                mode={"range"}
              />
            </Pressable>
            <DropDownService
              icon={<Entypo name="scissors" size={24} color="black" />}
              placeholder="Choose service"
              onSelect={(value) => setService(value)}
            />
            <Pressable
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
