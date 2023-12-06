import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const DropDownService = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Coloration",
    "Haircut",
    "Laying",
    "Manicure",
    "Pedicure",
    "Eyebrows",
    "Eylashes",
    "Makeup",
    "Hair Removal",
  ];

  const renderOption = ({ item }) => (
    <Pressable
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
      }}
      onPress={() => {
        setSelectedOption(item);
        setModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          borderColor: "#FFC72C",
          borderWidth: 2,
          paddingVertical: 15,
          gap: 15,
          justifyContent: "space-between",
        }}
      >
        <Entypo name="scissors" size={24} color="black" />
        <TextInput
          placeholderTextColor="black"
          placeholder="Choose service"
          value={selectedOption}
          editable={false}
        />
        <Entypo name="chevron-small-up" size={24} color="black" />
      </Pressable>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                alignItems: "center",
                backgroundColor: "#2a52be",
                height: 30,
              }}
            >
              <Text
                style={{
                  color: "white",
                  backgroundColor: "#2a52be",
                  marginTop: 5,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownService;
