import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "@/navigation/MainTabs";
import RestaurantScreen from "@/screens/RestaurantScreen";
import CheckoutScreen from "@/screens/CheckoutScreen";
import SplashScreen from "@/screens/SplashScreen";
import AuthChoiceScreen from "@/screens/AuthChoiceScreen";
import LoginScreen from "@/screens/LoginScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import { RootStackParamList } from "@/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthChoiceScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: true, title: "Checkout" }}
      />
    </Stack.Navigator>
  );
}
