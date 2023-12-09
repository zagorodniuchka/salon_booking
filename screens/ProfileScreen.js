import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../FireBase";
import { onAuthStateChanged } from "firebase/auth";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const username = user?.email.split("@")[0];
  console.log(username);

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 400 }}
    >
      <Text style={{ color: "#333333", fontSize: 20, fontWeight: 200 }}>
        Welcome, {username}!
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
