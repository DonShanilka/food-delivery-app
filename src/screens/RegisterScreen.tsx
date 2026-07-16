import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={["#84C441", "#5E9F2D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6 pt-12">
        <View className="mb-10">
          <Text className="text-4xl font-extrabold text-white">Create Account</Text>
          <Text className="text-white text-base mt-2">
            Join Solena and order healthy meals in minutes.
          </Text>
        </View>

        <View className="bg-white rounded-[30px] p-6 shadow-lg">
          <Text className="text-gray-700 text-sm font-semibold mb-2">Full name</Text>
          <TextInput
            className="border border-gray-200 rounded-2xl px-4 py-3 mb-4 text-base text-gray-900"
            placeholder="Enter your full name"
            placeholderTextColor="#9ca3af"
          />

          <Text className="text-gray-700 text-sm font-semibold mb-2">Email</Text>
          <TextInput
            className="border border-gray-200 rounded-2xl px-4 py-3 mb-4 text-base text-gray-900"
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="text-gray-700 text-sm font-semibold mb-2">Password</Text>
          <TextInput
            className="border border-gray-200 rounded-2xl px-4 py-3 mb-6 text-base text-gray-900"
            placeholder="Create a password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />

          <TouchableOpacity
            className="bg-[#84C441] rounded-full py-4 items-center mb-4"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text className="text-white text-lg font-bold">Register</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Login" } as any)}>
              <Text className="text-[#5E9F2D] font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
