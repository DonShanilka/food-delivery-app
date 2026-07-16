import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

export default function AuthChoiceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient
      colors={["#84C441", "#5E9F2D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 px-6 pt-12 justify-between pb-12">
        <View className="mt-10">
          <Text className="text-5xl font-extrabold text-white">Welcome to SOLENA</Text>
          <Text className="text-white text-base mt-3">
            Choose a login method to continue with healthy food delivery.
          </Text>
        </View>

        <View className="bg-white rounded-[30px] p-6 shadow-lg">
          <TouchableOpacity
            className="bg-[#84C441] rounded-full py-4 items-center mb-4"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-[#5E9F2D] rounded-full py-4 items-center"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Register")}
          >
            <Text className="text-[#5E9F2D] text-lg font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
