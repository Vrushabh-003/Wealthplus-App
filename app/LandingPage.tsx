import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "./index"; // Adjust this import if needed
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "LandingPage">;

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the NavigationProp type here

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.brand}>WealthPlus</Text>

      {/* Heading */}
      <Text style={styles.title}>Focus on What Truly Matters</Text>

      {/* Subheading */}
      <Text style={styles.subtitle}>
        Let WealthPlus manage your wealth while you cherish life's precious
        moments with your family.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PhoneNumberScreen")} // Now navigation is typed correctly
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Feature Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Smart Portfolio</Text>
          <Text style={styles.cardSubtitle}>
            Automated investment strategies tailored to your goals.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expert Guidance</Text>
          <Text style={styles.cardSubtitle}>
            Professional wealth management at your fingertips.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    padding: 20,
    alignItems: "center",
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 30,
    height: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    margin: 10,
    padding: 1,
  },
  card: {
    margin: 5,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default LandingPage;
