import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SmsRetriever from "react-native-sms-retriever"; // ✅ Import SmsRetriever

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const PhoneNumberScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("9940615334"); // ✅ State for phone number
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // fetchPhoneNumber(); // ✅ Auto-fetch phone number when the screen loads

    Animated.timing(progress, {
      toValue: 0.25,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // ✅ Auto-retrieve phone number
  // const fetchPhoneNumber = async () => {
  //   try {
  //     const number = await SmsRetriever.requestPhoneNumber();
  //     if (number) {
  //       setPhoneNumber(number.replace("+91", "").trim()); // ✅ Remove country code if needed
  //     }
  //   } catch (error) {
  //     console.log("Error fetching phone number:", error);
  //   }
  // };

  // ✅ SMS Listener (useful for OTP auto-read)
  // const startSmsListener = async () => {
  //   try {
  //     const registered = await SmsRetriever.startSmsRetriever();
  //     if (registered) {
  //       SmsRetriever.addSmsListener((event) => {
  //         console.log("Received SMS:", event.message);
  //         SmsRetriever.removeSmsListener();
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Error starting SMS listener:", error);
  //   }
  // };

  const validatePhoneNumber = () => {
    if (phoneNumber.length < 10) {
      alert("Phone number must be at least 10 digits.");
      return false;
    }
    navigation.navigate("PANInputScreen");
    return true;
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Wealthplus</Text>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter phone number</Text>
        <Text style={styles.subtitle}>linked to your PAN</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}  // ✅ Auto-filled from SmsRetriever
            onChangeText={setPhoneNumber}  // ✅ Allows manual input
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={validatePhoneNumber}>
          <Text style={styles.buttonText}>Proceed →</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.smsButton} onPress={startSmsListener}>
        <Text style={styles.smsButtonText}>Start SMS Listener</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7D4CED",
    textAlign: "center",
    marginBottom: 40,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#7D4CED",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: "#555555",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#333333",
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  smsButton: {
    marginTop: 10,
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  smsButtonText: {
    fontSize: 14,
    color: "#333333",
  },
});

export default PhoneNumberScreen;
