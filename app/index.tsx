import React from "react";
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Tabs from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from "@react-navigation/native";
import LandingPage from "./LandingPage";
import PANInputScreen from "./PANInputScreen";
import OTPScreen from "./OTPScreen";
import PhoneNumberScreen from "./PhoneNumberScreen";
import VerifiedScreen from "./VerifiedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard";
import MutualFundsPage from "./MutualFundsPage";
import StockPortfolio from "./StockPortfolio";
import { Header } from "react-native/Libraries/NewAppScreen";

export type RootStackParamList = {
  LandingPage: undefined;
  PhoneNumberScreen: undefined;
  PANInputScreen: undefined;
  OTPScreen: undefined;
  VerifiedScreen: undefined;
  Dashboard: undefined;
  MutualFundsPage: undefined;
  StockPortfolio: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown:false}} />
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} options={{headerShown:false}} />
      <Stack.Screen name="PANInputScreen" component={PANInputScreen} options={{headerShown:false}}/>
      <Stack.Screen name="OTPScreen" component={OTPScreen} options={{headerShown:false}} />
      <Stack.Screen name="VerifiedScreen" component={VerifiedScreen} options={{headerShown:false}} />
      <Stack.Screen name="Dashboard" component={Dashboard}  options={{headerShown:false}}/>
      <Stack.Screen name="MutualFundsPage" component={MutualFundsPage} options={{headerShown:false}}/>
      <Stack.Screen name="StockPortfolio" component={StockPortfolio} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}