import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView className="flex-1 bg-white ">
        {/* Top */}
        <View className="items-center top-40 absolute left-0 right-0">
          <Text className="text-7xl font-extrabold text-neutral-900">
            SOLENA
          </Text>

          <Text className="text-gray-500 text-x mt-3">
            Healthy Food Delivery
          </Text>
        </View>

        {/* Image */}
        <View className="flex-1 items-center justify-center absolute top-60 left-0 right-0 bottom-0">
          <Image
            source={require("@/assets/images/main-splashimage.png")}
            className="w-100 h-100"
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          className="w-full px-8 absolute bottom-12"
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#84C441", "#5E9F2D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-full py-4 flex-row items-center justify-center"
          >
            <View className="bg-white rounded-full w-10 h-10 justify-center items-center absolute left-3">
              <Ionicons name="arrow-forward" size={20} color="#6BA539" />
            </View>

            <Text className="text-white text-lg font-bold">Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
