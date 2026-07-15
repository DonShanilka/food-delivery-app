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

      <SafeAreaView className="flex-1 bg-white">
        {/* Top */}
        <View className="items-center mt-10">
          <Text className="text-5xl font-extrabold text-neutral-900">
            SOLENA
          </Text>

          <Text className="text-gray-500 text-base mt-3">
            Healthy Food Delivery
          </Text>
        </View>

        {/* Bottom Floating Card */}
          <View className="absolute left-2 bottom-16 bg-white rounded-3xl shadow-lg p-4 w-44">
            <Text className="text-gray-400">Delivery Amount</Text>
            <Text className="text-2xl font-bold mt-2">$24.50</Text>
            <View className="flex-row mt-3">
              <Image
                source={require("../assets/food.png")}
                className="w-10 h-10 rounded-full"
              />
              <Image
                source={require("../assets/food.png")}
                className="w-10 h-10 rounded-full -ml-3"
              />
            </View>
          </View>

        {/* Phone Mockup */}
        <View className="flex-1 justify-center items-center">
          {/* Floating Card */}
          <View className="absolute right-5 top-10 bg-white rounded-3xl shadow-lg p-4 w-44">
            <Text className="text-gray-400 text-xs">In place at</Text>

            <Text className="font-bold text-lg">16:25</Text>

            <View className="flex-row justify-between mt-5">
              <View className="items-center">
                <View className="bg-green-600 rounded-full w-10 h-10 justify-center items-center">
                  <Ionicons name="restaurant" size={18} color="white" />
                </View>

                <Text className="text-[10px] mt-1">Cooking</Text>
              </View>

              <View className="items-center">
                <View className="bg-green-600 rounded-full w-10 h-10 justify-center items-center">
                  <Ionicons name="receipt" size={18} color="white" />
                </View>

                <Text className="text-[10px] mt-1">Receipt</Text>
              </View>

              <View className="items-center">
                <View className="bg-green-600 rounded-full w-10 h-10 justify-center items-center">
                  <Ionicons name="bicycle" size={18} color="white" />
                </View>

                <Text className="text-[10px] mt-1">Delivery</Text>
              </View>
            </View>
          </View>

          {/* Phone */}
          <View className="w-72 h-[560px] rounded-[45px] border-[10px] border-black bg-white overflow-hidden">
            {/* Dynamic Island */}
            <View className="w-28 h-8 bg-black rounded-full self-center mt-3" />
            <View className="flex-1 justify-between">
              <View className="items-center mt-10">
                <Text className="text-5xl font-bold tracking-widest">
                  SOLENA
                </Text>
              </View>

              {/* Food */}
              <Image
                source={require("../assets/food.png")}
                resizeMode="contain"
                className="w-full h-72"
              />

              {/* Button */}
              <TouchableOpacity className="mx-6 mb-8" activeOpacity={0.8}>
                <LinearGradient
                  colors={["#84C441", "#5E9F2D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="rounded-full py-4 flex-row items-center justify-center"
                >
                  <View className="bg-white rounded-full w-10 h-10 justify-center items-center mr-4">
                    <Ionicons name="arrow-forward" size={20} color="#6BA539" />
                  </View>

                  <Text className="text-white text-lg font-bold">
                    Get Started
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        
        </View>
      </SafeAreaView>
    </>
  );
}
